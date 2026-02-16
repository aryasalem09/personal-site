import { useCallback, useMemo } from "react";
import CircularGallery, { type CircularGalleryItem } from "@/components/CircularGallery";
import { pinnedRepos } from "@/content/github";

const accents = [
  {
    edge: "#22d3ee",
    grid: "rgba(34, 211, 238, 0.11)",
    glow: "rgba(34, 211, 238, 0.2)",
    tint: "rgba(34, 211, 238, 0.08)",
  },
  {
    edge: "#a3e635",
    grid: "rgba(163, 230, 53, 0.1)",
    glow: "rgba(163, 230, 53, 0.16)",
    tint: "rgba(163, 230, 53, 0.07)",
  },
  {
    edge: "#67e8f9",
    grid: "rgba(103, 232, 249, 0.11)",
    glow: "rgba(103, 232, 249, 0.18)",
    tint: "rgba(103, 232, 249, 0.08)",
  },
  {
    edge: "#5eead4",
    grid: "rgba(94, 234, 212, 0.1)",
    glow: "rgba(94, 234, 212, 0.16)",
    tint: "rgba(94, 234, 212, 0.07)",
  },
];

function escapeXml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapText(value: string, maxChars: number, maxLines: number) {
  const source = value.trim();
  if (!source) {
    return [""];
  }

  const chars = Array.from(source);
  const lines: string[] = [];
  let cursor = 0;

  while (cursor < chars.length && lines.length < maxLines) {
    let end = Math.min(cursor + maxChars, chars.length);

    if (end < chars.length) {
      const slice = chars.slice(cursor, end).join("");
      const breakpoints = [" ", "-", "_", "/", "."];
      let preferredBreak = -1;

      for (const separator of breakpoints) {
        const breakpointIndex = slice.lastIndexOf(separator);
        if (breakpointIndex > preferredBreak) {
          preferredBreak = breakpointIndex;
        }
      }

      if (preferredBreak >= Math.floor(maxChars * 0.45)) {
        end = cursor + preferredBreak + 1;
      }
    }

    lines.push(chars.slice(cursor, end).join("").trim());
    cursor = end;
  }

  if (cursor < chars.length && lines.length > 0) {
    const lastIndex = lines.length - 1;
    lines[lastIndex] = `${lines[lastIndex].slice(0, Math.max(0, maxChars - 3)).trimEnd()}...`;
  }

  return lines;
}

function asTspans(lines: string[], x: number, lineHeight: number) {
  return lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");
}

function buildRepoCardImage(
  owner: string,
  name: string,
  description: string,
  language: string | undefined,
  index: number,
) {
  const { edge, glow, grid, tint } = accents[index % accents.length];
  const patternOffset = (index * 27) % 42;
  const repoTitle = `${owner}/${name}`;
  const repoDescription = description.trim() || "Pinned repository";
  const languageLabel = language?.trim() || "Source";
  const titleLines = wrapText(repoTitle, 20, 2);
  const descriptionLines = wrapText(repoDescription, 34, 2);
  const languagePillWidth = Math.max(150, Math.min(292, 70 + languageLabel.length * 13));

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="1080" viewBox="0 0 840 1080">
  <defs>
    <linearGradient id="bg-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617" />
      <stop offset="60%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#111827" />
    </linearGradient>
    <linearGradient id="card-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(15, 23, 42, 0.92)" />
      <stop offset="56%" stop-color="rgba(2, 6, 23, 0.76)" />
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0.84)" />
    </linearGradient>
    <radialGradient id="vignette-${index}" cx="78%" cy="16%" r="82%">
      <stop offset="0%" stop-color="${tint}" />
      <stop offset="100%" stop-color="rgba(2,6,23,0)" />
    </radialGradient>
    <pattern id="grid-${index}" width="42" height="42" patternUnits="userSpaceOnUse" patternTransform="translate(${patternOffset} ${patternOffset})">
      <path d="M 42 0 L 0 0 0 42" fill="none" stroke="${grid}" stroke-width="1" />
    </pattern>
    <filter id="soft-glow-${index}" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="30" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="card-shadow-${index}" x="-30%" y="-30%" width="160%" height="160%">
      <feOffset dy="10" />
      <feGaussianBlur stdDeviation="20" result="dropBlur" />
      <feColorMatrix
        in="dropBlur"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0.03  0 0 0 0 0.09  0 0 0 0.8 0"
      />
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <rect width="840" height="1080" fill="url(#bg-${index})" />
  <rect width="840" height="1080" fill="url(#grid-${index})" />
  <rect width="840" height="1080" fill="url(#vignette-${index})" />
  <circle cx="702" cy="170" r="122" fill="${glow}" filter="url(#soft-glow-${index})" />

  <rect x="54" y="64" width="732" height="952" rx="42" fill="url(#card-${index})" filter="url(#card-shadow-${index})" />
  <rect x="54" y="64" width="732" height="952" rx="42" fill="none" stroke="rgba(255,255,255,0.13)" />
  <rect x="54" y="64" width="732" height="952" rx="42" fill="none" stroke="${edge}" stroke-opacity="0.32" />

  <text x="114" y="166" fill="rgba(186,230,253,0.74)" font-family="JetBrains Mono, monospace" font-size="21" letter-spacing="5.8">PINNED</text>
  <text x="114" y="242" fill="#f1f5f9" font-family="Space Grotesk, sans-serif" font-size="64" font-weight="700">${asTspans(titleLines, 114, 76)}</text>
  <text x="114" y="430" fill="rgba(226,232,240,0.78)" font-family="Space Grotesk, sans-serif" font-size="31" font-weight="500">${asTspans(descriptionLines, 114, 44)}</text>

  <rect x="114" y="868" width="612" height="1" fill="rgba(148,163,184,0.22)" />
  <rect x="114" y="906" width="134" height="52" rx="26" fill="rgba(255,255,255,0.08)" stroke="${edge}" stroke-opacity="0.42" />
  <text x="181" y="939" text-anchor="middle" fill="rgba(241,245,249,0.9)" font-family="JetBrains Mono, monospace" font-size="19" letter-spacing="1.8">OPEN</text>
  <rect x="260" y="906" width="${languagePillWidth}" height="52" rx="26" fill="rgba(255,255,255,0.08)" stroke="${edge}" stroke-opacity="0.3" />
  <text x="${260 + languagePillWidth / 2}" y="939" text-anchor="middle" fill="rgba(226,232,240,0.88)" font-family="JetBrains Mono, monospace" font-size="18" letter-spacing="0.9">${escapeXml(languageLabel)}</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default function GitHubCircularGallery() {
  const items = useMemo<CircularGalleryItem[]>(
    () =>
      pinnedRepos.map((repo, index) => ({
        image: buildRepoCardImage(repo.owner, repo.name, repo.description, repo.language, index),
        text: "",
        url: repo.url,
      })),
    [],
  );

  const handleItemClick = useCallback((item: CircularGalleryItem) => {
    if (!item.url) {
      return;
    }
    window.open(item.url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="h-full w-full">
      <CircularGallery
        items={items}
        textColor="#e2e8f0"
        bend={1.6}
        borderRadius={0.18}
        scrollSpeed={1.4}
        scrollEase={0.06}
        font="600 34px Space Grotesk"
        mediaScale={1.08}
        onItemClick={handleItemClick}
      />
    </div>
  );
}
