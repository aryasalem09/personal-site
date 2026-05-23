import { useEffect, useState } from "react";

import FaultyTerminal from "@/components/FaultyTerminal";
import FaultyTerminalLite from "@/components/FaultyTerminalLite";

type FxMode = "full" | "lite";

interface NetworkInformationLike {
  saveData?: boolean;
}

function getStoredOverride(): FxMode | null {
  try {
    const value = window.localStorage.getItem("arya-fx");
    return value === "full" || value === "lite" ? value : null;
  } catch {
    return null;
  }
}

function getQueryOverride(): FxMode | null {
  const value = new URLSearchParams(window.location.search).get("fx");
  return value === "full" || value === "lite" ? value : null;
}

function shouldUseFullFx(): boolean {
  const queryOverride = getQueryOverride();
  if (queryOverride) return queryOverride === "full";

  const storedOverride = getStoredOverride();
  if (storedOverride) return storedOverride === "full";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrowViewport = window.innerWidth < 768;
  const connection = "connection" in navigator ? (navigator.connection as NetworkInformationLike) : undefined;
  const saveData = Boolean(connection?.saveData);
  const lowConcurrency = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4;

  return !reducedMotion && !coarsePointer && !narrowViewport && !saveData && !lowConcurrency;
}

export default function AdaptiveFaultyTerminalBackground() {
  const [fullFxAllowed, setFullFxAllowed] = useState(false);
  const [afterFirstPaint, setAfterFirstPaint] = useState(false);

  useEffect(() => {
    const updateMode = () => {
      setFullFxAllowed(shouldUseFullFx());
    };

    const timeoutId = window.setTimeout(() => {
      setAfterFirstPaint(true);
      updateMode();
    }, 0);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    reducedMotion.addEventListener("change", updateMode);
    coarsePointer.addEventListener("change", updateMode);
    window.addEventListener("resize", updateMode, { passive: true });
    window.addEventListener("storage", updateMode);

    return () => {
      window.clearTimeout(timeoutId);
      reducedMotion.removeEventListener("change", updateMode);
      coarsePointer.removeEventListener("change", updateMode);
      window.removeEventListener("resize", updateMode);
      window.removeEventListener("storage", updateMode);
    };
  }, []);

  const mountFullFx = afterFirstPaint && fullFxAllowed;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(34,211,238,0.17),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(20,184,166,0.11),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(132,204,22,0.1),transparent_38%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,0.98))]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.62)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.62)_1px,transparent_1px)] [background-size:44px_44px]" />
      <FaultyTerminalLite />
      {mountFullFx ? (
        <div className="absolute inset-0 opacity-[0.62] mix-blend-screen">
          <FaultyTerminal
            active
            pauseWhenHidden
            scale={1}
            digitSize={1.5}
            timeScale={0.12}
            scanlineIntensity={0.18}
            glitchAmount={0.45}
            flickerAmount={0.35}
            noiseAmp={0.08}
            chromaticAberration={0}
            dither={0}
            curvature={0.12}
            tint="#32748f"
            mouseReact={false}
            brightness={0.9}
            dpr={0.65}
            fps={20}
            maxCanvasWidth={960}
            maxCanvasHeight={640}
            className="h-full w-full"
          />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-slate-950/28 [mask-image:radial-gradient(ellipse_at_center,transparent_12%,black_100%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(103,232,249,0.04)_0,rgba(103,232,249,0.04)_1px,transparent_1px,transparent_5px)] opacity-55 mix-blend-screen" />
      <div className="absolute left-1/2 top-0 h-56 w-[min(42rem,80vw)] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
    </div>
  );
}
