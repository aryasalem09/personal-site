import { useEffect, useRef, useState } from "react";
import FaultyTerminal from "@/components/FaultyTerminal";

interface FaultyTerminalBackgroundProps {
  onMountChange?: (mounted: boolean) => void;
}

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  return reducedMotion;
}

export default function FaultyTerminalBackground({ onMountChange }: FaultyTerminalBackgroundProps) {
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    onMountChange?.(true);

    return () => {
      onMountChange?.(false);
    };
  }, [onMountChange]);

  useEffect(() => {
    const relayMouseMove = (event: MouseEvent) => {
      const target = terminalContainerRef.current?.firstElementChild;
      if (!target) {
        return;
      }

      target.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          cancelable: false,
          clientX: event.clientX,
          clientY: event.clientY,
        }),
      );
    };

    window.addEventListener("mousemove", relayMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", relayMouseMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div ref={terminalContainerRef} className="absolute inset-0 h-full w-full opacity-[0.66]">
        <FaultyTerminal
          scale={1}
          digitSize={1.5}
          scanlineIntensity={reducedMotion ? 0.12 : 0.3}
          glitchAmount={reducedMotion ? 0 : 1}
          flickerAmount={reducedMotion ? 0 : 1}
          noiseAmp={0}
          chromaticAberration={0}
          dither={0}
          curvature={0.2}
          tint="#32748f"
          mouseReact
          mouseStrength={0.2}
          brightness={1}
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-slate-950/28 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_100%)]" />
    </div>
  );
}
