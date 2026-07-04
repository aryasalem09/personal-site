import { lazy, Suspense } from "react";

import { useEnhancedEffects } from "@/hooks/useEnhancedEffects";

const FaultyTerminal = lazy(() => import("@/components/react-bits/FaultyTerminal"));

function StaticTerminalFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden rounded-[2rem] border border-border/50 bg-background/40"
    >
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute left-6 top-6 space-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
        <p>build: personal-site</p>
        <p>mode: quiet</p>
        <p>repos: school / science / sound</p>
      </div>
    </div>
  );
}

export default function HeroFaultyTerminal() {
  const enabled = useEnhancedEffects();

  if (!enabled) {
    return <StaticTerminalFallback />;
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden rounded-[2rem] border border-border/50 bg-black"
    >
      <Suspense fallback={<StaticTerminalFallback />}>
        <FaultyTerminal
          className="opacity-70"
          scale={1.15}
          gridMul={[2, 1]}
          digitSize={1.15}
          timeScale={0.14}
          scanlineIntensity={0.16}
          glitchAmount={0.55}
          flickerAmount={0.18}
          noiseAmp={0.35}
          chromaticAberration={0.25}
          dither={0.35}
          curvature={0.08}
          tint="#7dd3fc"
          mouseReact={false}
          mouseStrength={0.08}
          dpr={1}
          pageLoadAnimation
          brightness={0.42}
        />
      </Suspense>

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/82 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
    </div>
  );
}
