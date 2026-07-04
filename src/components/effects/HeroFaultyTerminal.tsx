import { lazy, Suspense } from "react";

import { useEnhancedEffects } from "@/hooks/useEnhancedEffects";

const FaultyTerminal = lazy(() => import("@/components/react-bits/FaultyTerminal"));

const GRID_MUL: [number, number] = [1.85, 1];

export default function HeroFaultyTerminal() {
  const enabled = useEnhancedEffects();

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-black shadow-[0_18px_60px_rgb(0_0_0_/_0.16)]"
    >
      <Suspense fallback={null}>
        <FaultyTerminal
          scale={1.12}
          gridMul={GRID_MUL}
          digitSize={1.12}
          timeScale={0.16}
          scanlineIntensity={0.18}
          glitchAmount={0.48}
          flickerAmount={0.16}
          noiseAmp={0.34}
          chromaticAberration={0.16}
          dither={0.28}
          curvature={0.05}
          tint="#78c6e7"
          mouseReact={false}
          mouseStrength={0.05}
          dpr={1}
          pageLoadAnimation
          brightness={0.48}
        />
      </Suspense>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
}
