import { useSyncExternalStore } from "react";

type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
};

const queries = ["(prefers-reduced-motion: reduce)", "(min-width: 768px)", "(pointer: coarse)"];

function subscribe(onChange: () => void) {
  const lists = queries.map((query) => window.matchMedia(query));
  lists.forEach((list) => list.addEventListener("change", onChange));
  return () => lists.forEach((list) => list.removeEventListener("change", onChange));
}

function getSnapshot() {
  const [reducedMotion, desktop, coarsePointer] = queries.map((query) => window.matchMedia(query).matches);
  const memory = (navigator as NavigatorWithMemory).deviceMemory ?? 8;

  return desktop && !coarsePointer && !reducedMotion && memory >= 4;
}

export function useEnhancedEffects() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
