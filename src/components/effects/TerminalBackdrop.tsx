import { lazy, Suspense, useEffect, useState } from "react";

import { useEnhancedEffects } from "@/hooks/useEnhancedEffects";

const FaultyTerminal = lazy(() => import("@/components/react-bits/FaultyTerminal"));

const GRID_MUL: [number, number] = [2, 1];

function readVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/**
 * The FaultyTerminal shader as the site background — the CRT glow of the
 * machine the scrapbook is resting on. Tuned down to ambient light and washed
 * by a paper vignette so it never fights the pages. Warm in day, cool at night.
 * Desktop + fine-pointer + no-reduced-motion + enough memory only; otherwise a
 * static warm desk gradient (no WebGL) so phones stay calm.
 */
export default function TerminalBackdrop() {
  const enabled = useEnhancedEffects();
  const [theme, setTheme] = useState(() => ({
    tint: readVar("--terminal-tint", "#c08a45"),
    brightness: Number(readVar("--terminal-brightness", "0.2")),
  }));

  useEffect(() => {
    const update = () =>
      setTheme({
        tint: readVar("--terminal-tint", "#c08a45"),
        brightness: Number(readVar("--terminal-brightness", "0.2")),
      });
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-desk">
      {/* the terminal layer fades with the theme so the light desk shows through by day */}
      <div className="absolute inset-0" style={{ opacity: "var(--terminal-layer-opacity, 0.9)" }}>
        {enabled ? (
          <Suspense fallback={null}>
            <FaultyTerminal
              key={`${theme.tint}-${theme.brightness}`}
              scale={1.5}
              gridMul={GRID_MUL}
              digitSize={1.2}
              timeScale={0.1}
              scanlineIntensity={0.08}
              glitchAmount={0.14}
              flickerAmount={0.06}
              noiseAmp={0.2}
              chromaticAberration={0.06}
              dither={0.35}
              curvature={0.12}
              tint={theme.tint}
              mouseReact={false}
              dpr={1}
              pageLoadAnimation
              brightness={theme.brightness}
            />
          </Suspense>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 0%, hsl(var(--tan) / 0.28), transparent 55%), #14100a",
            }}
          />
        )}
      </div>

      {/* soft vignette: darkens only the far corners so the terminal reads clearly elsewhere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 110% at 50% 45%, hsl(var(--backdrop-veil) / 0) 55%, hsl(var(--backdrop-veil) / 0.7) 100%)",
        }}
      />
      {/* spine gutter glow: a soft vertical band of light up the centre where the book opens */}
      <div
        className="absolute inset-y-0 left-1/2 hidden w-40 -translate-x-1/2 lg:block"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--tan) / 0.10) 45%, hsl(var(--tan) / 0.10) 55%, transparent)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
