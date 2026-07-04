import { useSyncExternalStore } from "react";

type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
};

function getSnapshot() {
  if (typeof window === "undefined") return false;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = window.matchMedia("(min-width: 768px)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const memory = (navigator as NavigatorWithMemory).deviceMemory ?? 8;

  return desktop && finePointer && !reducedMotion && memory >= 4;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const queries = [
    window.matchMedia("(prefers-reduced-motion: reduce)"),
    window.matchMedia("(min-width: 768px)"),
    window.matchMedia("(pointer: fine)"),
  ];

  queries.forEach((query) => query.addEventListener("change", callback));

  return () => {
    queries.forEach((query) => query.removeEventListener("change", callback));
  };
}

export function useEnhancedEffects() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
