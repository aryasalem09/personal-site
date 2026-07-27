import { useState } from "react";
import {
  ArrowUpRight,
  BookOpenCheck,
  ChartNoAxesCombined,
  Circle,
  CircleDot,
  CircuitBoard,
  FileText,
  Microscope,
  Shuffle,
  Trophy,
  Waves,
  type LucideIcon,
} from "lucide-react";

import {
  communityExperience,
  researchExperience,
  resumeHref,
  type ResumeIcon,
} from "@/content/profile";
import AwardsShelf from "@/components/profile/AwardsShelf";
import BrandMark from "@/components/profile/BrandMark";

const icons: Record<ResumeIcon, LucideIcon> = {
  microscope: Microscope,
  waves: Waves,
  chart: ChartNoAxesCombined,
  circuit: CircuitBoard,
  trophy: Trophy,
  book: BookOpenCheck,
};

export default function ResumeHighlights() {
  const [activeId, setActiveId] = useState(researchExperience[0].id);
  const activeIndex = Math.max(
    0,
    researchExperience.findIndex((entry) => entry.id === activeId),
  );
  const active = researchExperience[activeIndex];
  const selectNext = () => {
    const nextIndex = (activeIndex + 1) % researchExperience.length;
    setActiveId(researchExperience[nextIndex].id);
  };

  return (
    <div className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <p className="kicker">Selected from my resume</p>
          <h3 className="mt-4 text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.045em] md:text-4xl">
            Here are a few things I've loved working on.
          </h3>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
            Pick a thread. I&apos;ll show you the question, the work, and the bit that made it worth doing.
          </p>

          <button
            type="button"
            onClick={selectNext}
            className="group mt-7 inline-flex min-h-11 items-center gap-2 border-b border-foreground pb-1 text-sm font-medium outline-none transition-colors hover:border-signal hover:text-signal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <Shuffle className="size-4 transition-transform duration-300 group-hover:rotate-12 motion-reduce:transform-none" aria-hidden="true" />
            Show me another
          </button>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="border-t border-border" role="group" aria-label="Choose a research story">
            {researchExperience.map((entry, index) => {
              const selected = entry.id === active.id;

              return (
                <button
                  key={entry.id}
                  type="button"
                  aria-pressed={selected}
                  aria-controls="research-story"
                  onClick={() => setActiveId(entry.id)}
                  className={`group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-border py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[2.75rem_1fr_auto] sm:gap-4 sm:py-5 ${
                    selected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <BrandMark
                    brand={entry.brand}
                    decorative
                    className={`size-9 min-w-0 p-1 transition-all duration-300 motion-reduce:transform-none sm:size-10 ${
                      selected ? "border-signal" : "group-hover:-translate-y-0.5 group-hover:border-foreground"
                    }`}
                    imageClassName={entry.brand === "ut-austin" ? "h-auto max-w-[2rem]" : "h-7 w-7"}
                  />
                  <span className="min-w-0">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      0{index + 1} / {entry.verb}
                    </span>
                    <span className="mt-1 block text-sm font-medium leading-5 sm:text-base">{entry.title}</span>
                  </span>
                  <span
                    className={`transition-transform duration-300 motion-reduce:transform-none ${selected ? "translate-x-0 text-signal" : "-translate-x-1"}`}
                    aria-hidden="true"
                  >
                    {selected ? <CircleDot className="size-3.5" /> : <Circle className="size-3.5" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <article
        id="research-story"
        aria-live="polite"
        className="mt-10 border-y border-border bg-card/45 md:mt-14"
      >
        <div className="grid md:grid-cols-12">
          <div className="border-b border-border p-5 sm:p-7 md:col-span-4 md:border-b-0 md:border-r md:p-9">
            <div className="flex items-start justify-between gap-6">
              <BrandMark
                brand={active.brand}
                decorative
                className="h-14 w-28 min-w-0 border-signal px-3"
                imageClassName={active.brand === "ut-austin" ? "h-auto max-w-[5.5rem]" : "h-10 w-auto max-w-[4.5rem]"}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                0{activeIndex + 1} / 0{researchExperience.length}
              </span>
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">{active.verb}</p>
            <h4 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.035em]">{active.organization}</h4>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{active.role}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{active.period}</p>
          </div>

          <div className="p-5 sm:p-7 md:col-span-8 md:p-9">
            <p className="max-w-3xl text-lg leading-8 tracking-[-0.01em] sm:text-xl sm:leading-9">{active.summary}</p>

            <dl className="mt-8 grid border-y border-border sm:grid-cols-3">
              {active.evidence.map((item) => (
                <div key={item.label} className="border-b border-border py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
                  <dt className="text-lg font-semibold tracking-[-0.025em] text-signal">{item.value}</dt>
                  <dd className="mt-1 text-xs leading-5 text-muted-foreground">{item.label}</dd>
                </div>
              ))}
            </dl>

          </div>
        </div>
      </article>

      <div className="mt-16 md:mt-20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker">Outside the lab</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Building, leading, and teaching.</h3>
          </div>
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Arya Salem's complete resume PDF in a new tab"
            className="group inline-flex min-h-11 w-fit items-center gap-2 border-b border-foreground pb-1 text-sm font-medium outline-none transition-colors hover:border-signal hover:text-signal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <FileText className="size-4" aria-hidden="true" />
            The complete resume
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
          </a>
        </div>

        <ol className="mt-8 border-t border-border">
          {communityExperience.map((entry, index) => {
            const Icon = icons[entry.icon];

            return (
              <li key={entry.title} className="grid gap-5 border-b border-border py-6 sm:grid-cols-[2.5rem_1fr] md:grid-cols-[3rem_minmax(0,1.2fr)_minmax(0,1.6fr)_9rem] md:items-start md:gap-6 md:py-7">
                <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                <div className="flex items-start gap-3">
                  {entry.brand ? (
                    <BrandMark
                      brand={entry.brand}
                      decorative
                      className="size-11 min-w-0 shrink-0"
                      imageClassName={entry.brand === "tsa" ? "h-auto max-w-[2.25rem]" : "h-8 w-8"}
                    />
                  ) : (
                    <span className="inline-flex size-11 shrink-0 items-center justify-center border border-border text-muted-foreground">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                  )}
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-signal">{entry.label}</p>
                    <h4 className="mt-1 text-lg font-semibold tracking-[-0.025em]">{entry.title}</h4>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{entry.role}</p>
                  </div>
                </div>
                <div className="sm:col-start-2 md:col-start-auto">
                  <p className="text-sm leading-6 text-muted-foreground">{entry.summary}</p>
                  <p className="mt-2 text-sm font-medium leading-6">{entry.proof}</p>
                </div>
                <p className="sm:col-start-2 md:col-start-auto md:text-right font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                  {entry.period}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      <AwardsShelf />
    </div>
  );
}
