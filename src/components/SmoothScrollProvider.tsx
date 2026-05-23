import "lenis/dist/lenis.css";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Snap from "lenis/snap";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

function SnapController({ reducedMotion }: { reducedMotion: boolean }) {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (reducedMotion || !lenis || location.pathname !== "/") {
      return undefined;
    }

    const snap = new Snap(lenis, {
      type: "proximity",
      distanceThreshold: "35%",
      debounce: 120,
      duration: 0.7,
    });

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-snap-section]"));
    sections.forEach((section) => {
      snap.addElement(section, { align: "start" });
    });

    return () => {
      snap.destroy();
    };
  }, [lenis, location.pathname, reducedMotion]);

  return null;
}

function HashScroller({ reducedMotion }: { reducedMotion: boolean }) {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!location.hash) {
      return undefined;
    }

    const targetId = location.hash.slice(1);
    const timeoutId = window.setTimeout(() => {
      const section = document.getElementById(targetId);
      if (!section) {
        return;
      }

      if (!reducedMotion && lenis) {
        lenis.scrollTo(section, { offset: -76, duration: 0.75 });
        return;
      }

      section.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }, 40);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [lenis, location.hash, location.pathname, reducedMotion]);

  return null;
}

function LenisRuntime({ children, reducedMotion }: SmoothScrollProviderProps & { reducedMotion: boolean }) {
  return (
    <>
      <SnapController reducedMotion={reducedMotion} />
      <HashScroller reducedMotion={reducedMotion} />
      {children}
    </>
  );
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  if (reducedMotion) {
    return <LenisRuntime reducedMotion={reducedMotion}>{children}</LenisRuntime>;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: true,
        duration: 1.05,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        smoothWheel: true,
        wheelMultiplier: 0.82,
        touchMultiplier: 1,
        anchors: {
          offset: -76,
          duration: 0.75,
        },
      }}
    >
      <LenisRuntime reducedMotion={reducedMotion}>{children}</LenisRuntime>
    </ReactLenis>
  );
}
