import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight, CornerDownRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type BookPage = {
  id: string;
  tab: string;
  render: ReactNode;
};

type ScrapbookNav = { goTo: (id: string) => void };
const ScrapbookNavContext = createContext<ScrapbookNav>({ goTo: () => {} });

/** Let page content flip the book to another page by id (e.g. a cover CTA). */
export function useScrapbookNav() {
  return useContext(ScrapbookNavContext);
}

type ScrapbookProps = {
  pages: BookPage[];
  title: string;
  subtitle?: string;
};

export default function Scrapbook({ pages, title, subtitle }: ScrapbookProps) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [flat, setFlat] = useState(false);
  const [turn, setTurn] = useState(0); // bump to replay the flip animation
  const liveRef = useRef<HTMLParagraphElement>(null);

  const count = pages.length;

  const go = useCallback(
    (target: number) => {
      const next = Math.max(0, Math.min(count - 1, target));
      if (next === current) return;
      setDir(next > current ? 1 : -1);
      setCurrent(next);
      setTurn((t) => t + 1);
    },
    [count, current],
  );

  // announce page changes for screen readers
  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Page ${current + 1} of ${count} — ${pages[current].tab}`;
    }
  }, [current, count, pages]);

  // arrow-key navigation (ignore when typing in a field)
  useEffect(() => {
    if (flat) return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, flat, go]);

  const page = pages[current];

  const nav = useMemo<ScrapbookNav>(
    () => ({
      goTo: (id: string) => {
        const i = pages.findIndex((p) => p.id === id);
        if (i < 0) return;
        if (flat) scrollToPage(id);
        else go(i);
      },
    }),
    [pages, flat, go],
  );

  return (
    <ScrapbookNavContext.Provider value={nav}>
    <div className="site-container py-6 md:py-10">
      {/* the book object */}
      <div className="relative mx-auto max-w-book">
        {/* flanking page-turn buttons, in the desk margins (desktop) */}
        {!flat ? (
          <>
            <button
              type="button"
              onClick={() => go(current - 1)}
              disabled={current === 0}
              aria-label="Turn back a page"
              className="cursor-target absolute -left-6 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-edge bg-paper text-ink shadow-hard transition enabled:hover:-translate-y-[calc(50%+2px)] enabled:hover:text-terracotta disabled:opacity-25 lg:inline-flex xl:-left-16"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => go(current + 1)}
              disabled={current === count - 1}
              aria-label="Turn to the next page"
              className="cursor-target absolute -right-6 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-edge bg-paper text-ink shadow-hard transition enabled:hover:-translate-y-[calc(50%+2px)] enabled:hover:text-terracotta disabled:opacity-25 lg:inline-flex xl:-right-16"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        ) : null}
        <div className="grid grid-cols-1 overflow-hidden rounded-lg shadow-[0_30px_80px_-30px_hsl(var(--edge)/0.8)] lg:grid-cols-[13.5rem_1fr]">
          {/* book cover / spine — also the nav */}
          <aside className="book-cloth relative flex flex-col justify-between gap-6 border-b-2 border-edge px-5 py-6 text-[hsl(44_46%_88%)] lg:border-b-0 lg:border-r-2">
            {/* binding shadow where the cover meets the page */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-3 bg-gradient-to-l from-black/40 to-transparent lg:block"
            />
            {/* bookmark ribbon hanging over the top */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-1 right-7 z-10 hidden h-16 w-3 bg-rose shadow-[1px_2px_3px_rgba(0,0,0,.45)] lg:block"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)" }}
            />
            {/* stitched inner border */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-md border border-dashed border-[hsl(44_46%_88%/0.3)]"
            />
            <div className="relative">
              <p className="font-marker emboss text-2xl leading-tight text-[hsl(32_62%_68%)]">{title}</p>
              {subtitle ? (
                <p className="mt-1 font-hand text-lg leading-tight text-[hsl(44_46%_88%/0.75)]">{subtitle}</p>
              ) : null}

              <nav aria-label="Scrapbook pages" className="mt-6 flex flex-row flex-wrap gap-1.5 lg:flex-col">
                {pages.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => (flat ? scrollToPage(p.id) : go(i))}
                    aria-current={i === current ? "page" : undefined}
                    className={cn(
                      "cursor-target group inline-flex items-center gap-2 rounded-[0.3rem] px-2.5 py-1.5 text-left font-note text-lg transition",
                      i === current && !flat
                        ? "bg-[hsl(44_46%_88%)] text-forest shadow-hard-sm"
                        : "text-[hsl(44_46%_88%/0.82)] hover:bg-[hsl(44_46%_88%/0.12)] hover:text-[hsl(44_46%_88%)]",
                    )}
                  >
                    <span className="font-mono text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
                    {p.tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="relative flex items-center justify-between gap-2">
              <span className="hidden font-mono text-[0.7rem] uppercase tracking-wide text-[hsl(44_46%_88%/0.55)] lg:inline">
                use ← → or the tabs
              </span>
              <button
                type="button"
                onClick={() => setFlat((f) => !f)}
                className="cursor-target font-mono text-[0.7rem] uppercase tracking-wide text-[hsl(44_46%_88%/0.75)] underline decoration-dotted underline-offset-4 transition hover:text-[hsl(44_46%_88%)]"
              >
                {flat ? "flip view" : "read straight through"}
              </button>
            </div>
          </aside>

          {/* page area */}
          {flat ? (
            <div className="bg-paper">
              {pages.map((p) => (
                <section
                  key={p.id}
                  id={`flat-${p.id}`}
                  className="paper scroll-mt-24 border-b-2 border-dashed border-edge/40 px-5 py-10 last:border-b-0 sm:px-8 md:px-12"
                >
                  <p className="mb-6 font-mono text-xs uppercase tracking-widest text-ink-soft">{p.tab}</p>
                  {p.render}
                </section>
              ))}
            </div>
          ) : (
            <div className="book-stage relative bg-paper">
              <article
                key={turn}
                className={cn(
                  "leaf paper min-h-[30rem] px-5 py-8 sm:px-8 md:px-12 md:py-12",
                  dir === 1 ? "animate-flip-in" : "animate-flip-in-back",
                )}
              >
                {page.render}
              </article>

              {/* dog-ear: flip to the next page */}
              {current < count - 1 ? (
                <button
                  type="button"
                  onClick={() => go(current + 1)}
                  aria-label="Turn to the next page"
                  className="cursor-target group absolute bottom-0 right-0 hidden size-16 md:block"
                >
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 size-0 border-b-[3.5rem] border-l-[3.5rem] border-b-[hsl(var(--paper-aged))] border-l-transparent shadow-[-2px_-2px_3px_hsl(var(--edge)/0.25)] transition-all duration-200 group-hover:border-b-[4rem] group-hover:border-l-[4rem]"
                  />
                  <CornerDownRight className="absolute bottom-1.5 right-1.5 size-4 text-ink-soft/70" />
                </button>
              ) : null}

              {/* page number, hand-scrawled */}
              <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-xs text-ink-soft/70">
                p. {current + 1} / {count}
              </span>
            </div>
          )}
        </div>

        {/* mobile prev/next under the book */}
        {!flat ? (
          <div className="mt-4 flex items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={() => go(current - 1)}
              disabled={current === 0}
              className="cursor-target inline-flex items-center gap-1 rounded-full border-2 border-edge bg-paper px-4 py-2 font-note text-lg text-ink shadow-hard-sm transition disabled:opacity-30"
            >
              <ChevronLeft className="size-4" /> back
            </button>
            <span className="font-mono text-xs text-ink-soft">p. {current + 1} / {count}</span>
            <button
              type="button"
              onClick={() => go(current + 1)}
              disabled={current === count - 1}
              className="cursor-target inline-flex items-center gap-1 rounded-full border-2 border-edge bg-paper px-4 py-2 font-note text-lg text-ink shadow-hard-sm transition disabled:opacity-30"
            >
              next <ChevronRight className="size-4" />
            </button>
          </div>
        ) : null}
      </div>

      <p ref={liveRef} aria-live="polite" className="sr-only" />
    </div>
    </ScrapbookNavContext.Provider>
  );
}

function scrollToPage(id: string) {
  const el = document.getElementById(`flat-${id}`);
  if (el) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }
}
