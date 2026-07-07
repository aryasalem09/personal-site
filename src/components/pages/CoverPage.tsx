import { ArrowRight } from "lucide-react";

import { useScrapbookNav } from "@/components/book/Scrapbook";
import { Pin, Stamp, Tape } from "@/components/scrapbook/Scraps";
import { githubProfile } from "@/content/github";
import { tiltStyle } from "@/lib/scatter";

export default function CoverPage() {
  const { goTo } = useScrapbookNav();

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_15rem] md:items-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
          field book · vol. 1
        </p>

        <h1 className="headline mt-4 text-5xl md:text-6xl">
          I&rsquo;m Arya.
        </h1>

        <p className="mt-5 max-w-md font-note text-2xl leading-snug text-ink">
          I build the websites my clubs need and the little simulations I get curious about,
          and I play in a string quartet.
        </p>

        <p className="mt-4 max-w-md font-note text-xl leading-snug text-ink-soft">
          This is the messy version of the portfolio, the stuff taped to the inside of my
          notebook. Flip through it.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => goTo("work")}
            className="cursor-target inline-flex items-center gap-2 rounded-full border-2 border-edge bg-terracotta px-5 py-2.5 font-note text-lg text-[hsl(44_55%_96%)] shadow-hard-sm transition hover:-translate-y-0.5"
          >
            start with the projects
            <ArrowRight className="size-4" />
          </button>
          <a
            href={githubProfile.url}
            target="_blank"
            rel="noreferrer"
            className="cursor-target font-note text-lg denim-link"
          >
            or peek at my github
          </a>
        </div>
      </div>

      {/* taped-on cover label */}
      <div className="relative mx-auto w-52" style={tiltStyle("cover-card", 4)}>
        <Tape tone="rose" rotate={-8} className="-left-2 -top-3" />
        <Tape tone="olive" rotate={6} className="-right-2 -top-3" />
        <div className="card-paper flex flex-col items-center gap-3 p-5 text-center">
          <Pin tone="amber" className="left-1/2 top-1.5 -translate-x-1/2" />
          <span className="mt-2 font-marker text-6xl text-terracotta">a.</span>
          <p className="font-hand text-xl leading-tight text-ink-soft">
            handmade, still a little wet
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <Stamp tone="olive" rotate={-6}>
              KATY, TX
            </Stamp>
            <Stamp rotate={5}>2026</Stamp>
          </div>
        </div>
      </div>
    </div>
  );
}
