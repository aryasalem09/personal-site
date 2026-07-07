import { useState } from "react";
import { Play } from "lucide-react";

import { Pin, Stamp, Tape } from "@/components/scrapbook/Scraps";
import { performances, type Performance } from "@/content/performances";
import { cn } from "@/lib/utils";
import { tiltStyle } from "@/lib/scatter";

function RecordCard({ performance, large }: { performance: Performance; large?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${performance.youtubeId}/hqdefault.jpg`;
  const seed = performance.youtubeId;

  return (
    <figure
      className={cn("polaroid tilt tilt-hover", large && "sm:col-span-2")}
      style={tiltStyle(seed, 2.4)}
    >
      <Tape tone={large ? "rose" : "olive"} rotate={large ? -6 : 7} className="-left-2 -top-3" />
      {!large ? <Pin tone="amber" className="right-3 -top-1" /> : null}

      <div className={cn("relative overflow-hidden", large ? "aspect-[16/8.5]" : "aspect-[4/3]")}>
        {playing ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${performance.youtubeId}?rel=0&autoplay=1`}
            title={`${performance.title} — ${performance.artist}, string quartet`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${performance.title} by ${performance.artist}`}
            className="cursor-target group relative flex h-full w-full items-center justify-center"
          >
            <img
              src={thumb}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-[hsl(40_18%_12%/0.28)] transition group-hover:bg-[hsl(40_18%_12%/0.15)]" />
            <span className="absolute inline-flex items-center gap-2 rounded-full border-2 border-edge bg-paper px-4 py-2 font-note text-base text-ink shadow-hard-sm">
              <Play className="size-3.5" /> play
            </span>
            <Stamp className="absolute bottom-2 right-2" rotate={-10}>
              45 RPM
            </Stamp>
          </button>
        )}
      </div>

      <figcaption className="mt-2 px-1 text-center">
        <span className="font-display text-xl leading-tight text-ink">{performance.title}</span>
        <span className="font-note text-lg text-ink-soft"> · {performance.artist}</span>
        {performance.note ? (
          <span className="mt-0.5 block font-hand text-lg leading-tight text-terracotta">
            {performance.note}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export default function RecordingsPage() {
  return (
    <div>
      <header className="max-w-lg">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">the recordings</p>
        <h2 className="headline mt-3 text-4xl md:text-5xl">what the quartet sounds like</h2>
        <p className="mt-3 font-note text-xl leading-snug text-ink-soft">
          Three we put down at Ballard House. Tap a record to hear it — they load only when you
          ask.
        </p>
      </header>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {performances.map((performance, i) => (
          <RecordCard key={performance.youtubeId} performance={performance} large={i === 0} />
        ))}
      </div>
    </div>
  );
}
