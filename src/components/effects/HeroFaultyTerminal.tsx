import { lazy, Suspense } from "react";

import { useEnhancedEffects } from "@/hooks/useEnhancedEffects";

const FaultyTerminal = lazy(() => import("@/components/react-bits/FaultyTerminal"));

export default function HeroFaultyTerminal() {
  const enabled = useEnhancedEffects();

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="h-full overflow-hidden rounded-3xl border border-border/50 bg-black/90"
    >
      <Suspense fallback={null}>
        <FaultyTerminal
          scale={1.08}
          gridMul={[1.7, 1]}
          digitSize={1.05}
          timeScale={0.12}
          scanlineIntensity={0.14}
          glitchAmount={0.35}
          flickerAmount={0.12}
          noiseAmp={0.28}
          chromaticAberration={0.12}
          dither={0.25}
          curvature={0.04}
          tint="#6aa8c7"
          mouseReact={false}
          mouseStrength={0.05}
          dpr={1}
          pageLoadAnimation
          brightness={0.42}
        />
      </Suspense>
    </div>
  );
}
