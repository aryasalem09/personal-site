import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import { parseBlogSource, type BlogPost as ContentBlogPost } from "../src/content/blog-schema.ts";

const SITE_URL = "https://aryasalem.dev";
const ROOT = path.resolve(import.meta.dirname, "..");
const POSTS_DIRECTORY = path.join(ROOT, "src", "content", "blog");
const PUBLIC_DIRECTORY = path.join(ROOT, "public");
const WRAPPERS_DIRECTORY = path.join(ROOT, "blog");
const WRAPPER_MARKER = ".generated-blog-wrappers";
const GENERATED_CONTENT_PATH = path.join(ROOT, "src", "content", "blog.generated.ts");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type BlogPost = ContentBlogPost & { draft: boolean };

function isWithin(parent: string, candidate: string) {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== "..");
}

function requireWithin(parent: string, candidate: string) {
  if (!isWithin(parent, candidate)) {
    throw new Error(`Refusing to access a path outside ${parent}: ${candidate}`);
  }
  return candidate;
}

function relativeAssetPath(slug: string, reference: string) {
  const prefix = `/blog/${slug}/`;
  const relative = reference.startsWith(prefix) ? reference.slice(prefix.length) : reference.replace(/^\.\//, "");
  if (!relative || relative.includes("?") || relative.includes("#")) {
    throw new Error(`${slug}: asset reference is invalid: ${reference}`);
  }
  return relative;
}

function publicAssetPath(slug: string, reference: string) {
  const relative = relativeAssetPath(slug, reference);

  const assetDirectory = path.join(PUBLIC_DIRECTORY, "blog", slug);
  return requireWithin(assetDirectory, path.resolve(assetDirectory, relative));
}

function publicAssetUrl(slug: string, reference: string) {
  return `/blog/${slug}/${relativeAssetPath(slug, reference).split(path.sep).join("/")}`;
}

type MarkdownImage = { alt?: string | null; url: string };
type MarkdownImageReference = { alt?: string | null; identifier: string };
type MarkdownDefinition = { identifier: string; url: string };

function markdownImages(source: string) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(source);
  const definitions = new Map<string, string>();
  const images: Array<{ alt: string; reference: string }> = [];

  visit(tree, "definition", (node: MarkdownDefinition) => {
    definitions.set(node.identifier.toLowerCase(), node.url);
  });
  visit(tree, "image", (node: MarkdownImage) => {
    images.push({ alt: node.alt ?? "", reference: node.url });
  });
  visit(tree, "imageReference", (node: MarkdownImageReference) => {
    const reference = definitions.get(node.identifier.toLowerCase());
    if (!reference) throw new Error(`Markdown image reference is missing its definition: ${node.identifier}`);
    images.push({ alt: node.alt ?? "", reference });
  });

  return images;
}

async function validateAssets(post: BlogPost) {
  const assetDirectory = path.join(PUBLIC_DIRECTORY, "blog", post.slug);
  requireWithin(PUBLIC_DIRECTORY, assetDirectory);

  const references = new Set<string>();
  if (post.cover) references.add(post.cover);
  for (const { alt, reference } of markdownImages(post.body)) {
    if (!alt.trim()) throw new Error(`${post.slug}: Markdown images need descriptive alt text`);
    if (/^(?:https?:)?\/\//i.test(reference)) continue;
    if (reference.startsWith("/") && !reference.startsWith(`/blog/${post.slug}/`)) {
      throw new Error(`${post.slug}: local images must be relative or start with /blog/${post.slug}/`);
    }
    references.add(reference);
  }

  if (references.size && !existsSync(assetDirectory)) {
    throw new Error(`${post.slug}: missing asset directory public/blog/${post.slug}/`);
  }

  for (const reference of references) {
    const asset = publicAssetPath(post.slug, reference);
    if (!/\.(?:avif|gif|jpe?g|png|webp)$/i.test(asset)) {
      throw new Error(`${post.slug}: unsupported image type for ${reference}`);
    }
    if (!existsSync(asset)) {
      throw new Error(`${post.slug}: missing referenced asset ${reference}`);
    }
  }
}

export async function getBlogPosts() {
  if (!existsSync(POSTS_DIRECTORY)) return [];

  const entries = await fs.readdir(POSTS_DIRECTORY, { withFileTypes: true });
  const posts: BlogPost[] = [];
  for (const entry of entries.filter((item) => item.isFile() && item.name.endsWith(".md") && !item.name.startsWith("_")).sort((a, b) => a.name.localeCompare(b.name))) {
    const slug = entry.name.slice(0, -3);
    if (!SLUG_PATTERN.test(slug)) throw new Error(`${entry.name}: filename must be a lowercase kebab-case slug`);

    const file = requireWithin(POSTS_DIRECTORY, path.join(POSTS_DIRECTORY, entry.name));
    const source = await fs.readFile(file, "utf8");
    const parsed = parseBlogSource(source, slug, entry.name);
    const post: BlogPost = { ...parsed, draft: parsed.draft === true };
    await validateAssets(post);
    posts.push(post);
  }

  return posts.sort((a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug));
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

export function pageHtml(post?: BlogPost) {
  const isIndex = !post;
  const title = isIndex ? "Blog — Arya Salem" : `${post.title} — Arya Salem`;
  const description = isIndex
    ? "Field notes from Arya Salem on science, software, music, and whatever is worth thinking through."
    : post.description;
  const url = isIndex ? `${SITE_URL}/blog` : `${SITE_URL}/blog/${post.slug}`;
  const robots = post?.draft ? "noindex,nofollow" : "index,follow,max-image-preview:large";
  const image = post?.cover ? `${SITE_URL}${publicAssetUrl(post.slug, post.cover)}` : undefined;
  const jsonLd = isIndex
    ? { "@context": "https://schema.org", "@type": "Blog", name: "Blog — Arya Salem", description, url }
    : {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.published,
        dateModified: post.updated ?? post.published,
        mainEntityOfPage: url,
        author: { "@type": "Person", name: "Arya Salem", url: `${SITE_URL}/` },
        ...(post.tags?.length ? { keywords: post.tags } : {}),
        ...(image ? { image } : {}),
      };

  return `<!doctype html>
<html lang="en">
  <head>
    <!-- Generated by scripts/generate-blog-pages.ts. Do not edit. -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="author" content="Arya Salem" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="${isIndex ? "website" : "article"}" />
    <meta property="og:site_name" content="Arya Salem" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    ${image ? `<meta property="og:image" content="${escapeHtml(image)}" />` : ""}
    ${image && post?.coverAlt ? `<meta property="og:image:alt" content="${escapeHtml(post.coverAlt)}" />` : ""}
    ${post ? `<meta property="article:published_time" content="${post.published}" />` : ""}
    ${post?.updated ? `<meta property="article:modified_time" content="${post.updated}" />` : ""}
    <meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    ${image ? `<meta name="twitter:image" content="${escapeHtml(image)}" />` : ""}
    ${image && post?.coverAlt ? `<meta name="twitter:image:alt" content="${escapeHtml(post.coverAlt)}" />` : ""}
    <script type="application/ld+json" data-seo-jsonld>${safeJson(jsonLd)}</script>
    <script>
      (function () {
        try {
          var dark = localStorage.getItem("theme") === "dark";
          document.documentElement.classList.toggle("dark", dark);
          document.documentElement.style.colorScheme = dark ? "dark" : "light";
        } catch (error) { /* default to light */ }
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

export function sitemapXml(posts: BlogPost[]) {
  const urls = [
    { location: `${SITE_URL}/`, lastmod: undefined },
    { location: `${SITE_URL}/projects`, lastmod: undefined },
    { location: `${SITE_URL}/blog`, lastmod: undefined },
    ...posts.map((post) => ({ location: `${SITE_URL}/blog/${post.slug}`, lastmod: post.updated ?? post.published })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({ location, lastmod }) => `  <url><loc>${location}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`;
}

async function recreateWrappers(posts: BlogPost[]) {
  if (existsSync(WRAPPERS_DIRECTORY)) {
    const marker = path.join(WRAPPERS_DIRECTORY, WRAPPER_MARKER);
    if (!existsSync(marker)) {
      throw new Error(`Refusing to replace ${WRAPPERS_DIRECTORY}; it is not marked as generated.`);
    }
    await fs.rm(requireWithin(ROOT, WRAPPERS_DIRECTORY), { recursive: true, force: true });
  }

  await fs.mkdir(WRAPPERS_DIRECTORY, { recursive: true });
  await fs.writeFile(path.join(WRAPPERS_DIRECTORY, WRAPPER_MARKER), "Generated blog route wrappers.\n", "utf8");
  await fs.writeFile(path.join(WRAPPERS_DIRECTORY, "index.html"), pageHtml(), "utf8");
  for (const post of posts) {
    const directory = requireWithin(WRAPPERS_DIRECTORY, path.join(WRAPPERS_DIRECTORY, post.slug));
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, "index.html"), pageHtml(post), "utf8");
  }
}

async function writeGeneratedContent(posts: BlogPost[]) {
  const moduleSource = `// Generated by scripts/generate-blog-pages.ts. Do not edit.\nimport type { BlogPost } from "./blog-schema";\n\nexport const generatedBlogPosts = ${safeJson(posts)} satisfies BlogPost[];\n`;
  await fs.writeFile(GENERATED_CONTENT_PATH, moduleSource, "utf8");
}

export async function generateBlogPages(options: { includeDrafts?: boolean; check?: boolean } = {}) {
  const allPosts = await getBlogPosts();
  const generatedPosts = options.includeDrafts ? allPosts : allPosts.filter((post) => !post.draft);
  if (!options.check) {
    await recreateWrappers(generatedPosts);
    await writeGeneratedContent(generatedPosts);
  }
  return { allPosts, generatedPosts };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  const argumentsSet = new Set(process.argv.slice(2));
  for (const argument of argumentsSet) {
    if (argument !== "--include-drafts" && argument !== "--check") throw new Error(`Unknown argument: ${argument}`);
  }
  const result = await generateBlogPages({ includeDrafts: argumentsSet.has("--include-drafts"), check: argumentsSet.has("--check") });
  console.log(`Validated ${result.allPosts.length} blog post(s); generated ${result.generatedPosts.length}.`);
}
