import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { tiltStyle } from "@/lib/scatter";

/* ---------------------------------------------------------------------------
   Small handmade primitives: tape, pins, polaroids, stamps, taped-in cards.
   All decorative bits are aria-hidden — they're texture, not content.
--------------------------------------------------------------------------- */

type TapeProps = {
  className?: string;
  tone?: "ochre" | "rose" | "olive";
  rotate?: number;
  style?: CSSProperties;
};

export function Tape({ className, tone = "ochre", rotate = -4, style }: TapeProps) {
  const toneClass = tone === "rose" ? "tape-rose" : tone === "olive" ? "tape-olive" : "";
  return (
    <span
      aria-hidden="true"
      className={cn("tape", toneClass, className)}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    />
  );
}

type PinProps = {
  className?: string;
  tone?: "rose" | "olive" | "amber";
  style?: CSSProperties;
};

export function Pin({ className, tone = "rose", style }: PinProps) {
  const toneClass = tone === "olive" ? "pin-olive" : tone === "amber" ? "pin-amber" : "";
  return <span aria-hidden="true" className={cn("pin", toneClass, className)} style={style} />;
}

type StampProps = {
  children: ReactNode;
  className?: string;
  tone?: "rose" | "olive";
  rotate?: number;
};

export function Stamp({ children, className, tone = "rose", rotate = -8 }: StampProps) {
  return (
    <span
      className={cn("stamp font-mono text-[0.7rem]", tone === "olive" && "stamp-olive", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

type PolaroidProps = {
  children?: ReactNode;
  caption?: ReactNode;
  seed: string;
  tiltMax?: number;
  className?: string;
  interactive?: boolean;
};

/** A photo (or any node) matted like a polaroid with a handwritten caption. */
export function Polaroid({
  children,
  caption,
  seed,
  tiltMax = 3,
  className,
  interactive = true,
}: PolaroidProps) {
  return (
    <figure
      className={cn(
        "polaroid tilt",
        interactive && "tilt-hover cursor-target",
        className,
      )}
      style={tiltStyle(seed, tiltMax)}
    >
      <div className="overflow-hidden bg-[hsl(40_18%_20%)]">{children}</div>
      {caption ? (
        <figcaption className="mt-2 px-1 text-center font-hand text-lg leading-tight text-ink-soft">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

type TapedCardProps = {
  children: ReactNode;
  seed: string;
  tiltMax?: number;
  className?: string;
  tapeTone?: "ochre" | "rose" | "olive";
  corners?: boolean;
};

/** A paper card that looks taped onto the page at a slight tilt. */
export function TapedCard({
  children,
  seed,
  tiltMax = 2.2,
  className,
  tapeTone = "ochre",
  corners = true,
}: TapedCardProps) {
  return (
    <div className={cn("relative tilt", className)} style={tiltStyle(seed, tiltMax)}>
      {corners ? (
        <>
          <Tape tone={tapeTone} rotate={-6} className="-left-3 -top-2" />
          <Tape tone={tapeTone} rotate={7} className="-right-3 -top-2" />
        </>
      ) : null}
      <div className="card-paper p-5">{children}</div>
    </div>
  );
}
