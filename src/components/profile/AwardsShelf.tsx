import { useState } from "react";
import { Award, Circle, CircleDot, Sparkles } from "lucide-react";

import BrandMark from "@/components/profile/BrandMark";
import { awards } from "@/content/profile";

export default function AwardsShelf() {
  const [activeId, setActiveId] = useState(awards[0].id);
  const active = awards.find((award) => award.id === activeId) ?? awards[0];

  return (
    <section aria-labelledby="awards-heading" className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="kicker">Awards &amp; honors</p>
          <h3 id="awards-heading" className="sr-only">Awards and honors</h3>
        </div>
        <Sparkles className="hidden size-6 text-signal sm:block" aria-hidden="true" />
      </div>

      <div className="mt-6 grid border-y border-border md:grid-cols-12">
        <div
          id="active-award-detail"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="relative overflow-hidden border-b border-border bg-card/55 p-6 md:col-span-5 md:min-h-[22rem] md:border-b-0 md:border-r md:p-9"
        >
          <Award className="absolute -bottom-9 -right-7 size-44 rotate-12 text-signal/[0.07]" aria-hidden="true" />
          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between gap-5">
              {active.brand ? <BrandMark brand={active.brand} decorative className="min-h-12 min-w-12" /> : <span className="inline-flex size-12 items-center justify-center border border-signal text-signal"><Award className="size-5" aria-hidden="true" /></span>}
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{active.year}</span>
            </div>

            <p className="mt-10 text-4xl font-semibold leading-none tracking-[-0.055em] text-signal sm:text-5xl">
              {active.mark}
            </p>
            <h4 className="mt-5 max-w-md text-2xl font-semibold leading-tight tracking-[-0.035em]">{active.title}</h4>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{active.organization}</p>
          </div>
        </div>

        <div className="md:col-span-7" role="group" aria-label="Choose an award to highlight">
          {awards.map((award, index) => {
            const selected = award.id === active.id;

            return (
              <button
                key={award.id}
                type="button"
                aria-pressed={selected}
                aria-controls="active-award-detail"
                onMouseEnter={() => setActiveId(award.id)}
                onFocus={() => setActiveId(award.id)}
                onClick={() => setActiveId(award.id)}
                className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-border px-5 py-4 text-left outline-none transition-colors last:border-b-0 hover:bg-accent/45 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[3rem_1fr_auto] sm:px-7 sm:py-5"
              >
                <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                <span className="min-w-0">
                  <span className="block text-base font-medium leading-5 sm:text-lg">{award.title}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">{award.organization} · {award.year}</span>
                  <span className="sr-only">Result: {award.mark}</span>
                </span>
                <span className={selected ? "text-signal" : "text-muted-foreground transition-transform group-hover:translate-x-0.5"} aria-hidden="true">
                  {selected ? <CircleDot className="size-3.5" /> : <Circle className="size-3.5" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
