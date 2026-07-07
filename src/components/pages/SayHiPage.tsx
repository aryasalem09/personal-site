import { ArrowUpRight } from "lucide-react";

import { Stamp, Tape } from "@/components/scrapbook/Scraps";
import { githubProfile } from "@/content/github";
import { tiltStyle } from "@/lib/scatter";

type Row = { label: string; text: string; href: string; external: boolean; hint?: string };

const rows: Row[] = [
  {
    label: "discord",
    text: "@arya",
    href: "https://discord.com/users/923779227856285757",
    external: true,
    hint: "fastest — I check it between classes",
  },
  {
    label: "github",
    text: `@${githubProfile.handle}`,
    href: githubProfile.url,
    external: true,
    hint: "everything I’ve been building",
  },
  {
    label: "email",
    text: "aryasalem@icloud.com",
    href: "mailto:aryasalem@icloud.com",
    external: false,
    hint: "for anything longer",
  },
];

export default function SayHiPage() {
  return (
    <div className="mx-auto max-w-xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">say hi</p>
      <h2 className="headline mt-3 text-4xl md:text-5xl">the back page</h2>
      <p className="mt-3 font-note text-xl leading-snug text-ink-soft">
        Discord&rsquo;s fastest. Email if it&rsquo;s longer. I don&rsquo;t bite.
      </p>

      {/* guestbook */}
      <div className="relative mt-7 tilt" style={tiltStyle("guestbook", 1.4)}>
        <Tape tone="rose" rotate={-5} className="left-6 -top-3" />
        <Tape tone="olive" rotate={5} className="right-6 -top-3" />
        <ul className="card-paper divide-y-2 divide-dashed divide-edge/30 px-5 py-1">
          {rows.map((row) => (
            <li key={row.label} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 py-4">
              <span className="font-marker text-lg text-olive">{row.label}</span>
              <a
                href={row.href}
                {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="cursor-target inline-flex items-center gap-1 font-note text-xl denim-link"
              >
                {row.text}
                {row.external ? <ArrowUpRight className="size-4" /> : null}
              </a>
              {row.hint ? (
                <span className="w-full font-hand text-lg leading-tight text-ink-soft">{row.hint}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="font-hand text-xl text-ink-soft">thanks for flipping through.</p>
        <Stamp tone="olive" rotate={-6}>
          made after school &amp; rehearsal
        </Stamp>
      </div>
    </div>
  );
}
