import type { CSSProperties } from "react";

// Deterministic scatter helpers — seeded so SSR/hydration and re-renders never jump.
// Never use Math.random() at render time for tilt/position.

function hashString(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // 0..1
  return ((h >>> 0) % 100000) / 100000;
}

/** Seeded rotation in degrees within [-max, max]. */
export function tiltFor(seed: string, max = 3): number {
  const r = hashString(seed);
  return Number((r * 2 * max - max).toFixed(2));
}

/** Inline style carrying the seeded --r custom prop used by the .tilt utility. */
export function tiltStyle(seed: string, max = 3): CSSProperties {
  return { "--r": `${tiltFor(seed, max)}deg` } as CSSProperties;
}

/** Pick a deterministic item from a list based on a seed. */
export function pick<T>(seed: string, items: readonly T[]): T {
  const r = hashString(seed);
  return items[Math.floor(r * items.length) % items.length];
}
