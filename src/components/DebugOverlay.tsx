import { useMemo } from "react";
import { useLocation } from "react-router-dom";

interface DebugOverlayProps {
  faultyTerminalMounted: boolean;
}

export default function DebugOverlay({ faultyTerminalMounted }: DebugOverlayProps) {
  const location = useLocation();

  const enabled = useMemo(() => {
    if (!import.meta.env.DEV) {
      return false;
    }

    const params = new URLSearchParams(location.search);
    return params.get("debug") === "1";
  }, [location.search]);

  if (!enabled) {
    return null;
  }

  return (
    <aside className="fixed bottom-4 right-4 z-[80] w-[min(92vw,360px)] rounded-2xl border border-cyan-300/45 bg-slate-950/80 p-4 font-['JetBrains_Mono'] text-xs tracking-wide text-cyan-100 shadow-[0_0_30px_rgba(6,182,212,0.22)] backdrop-blur-md">
      <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-lime-300/90">Debug Overlay</p>
      <p>
        FaultyTerminal mounted:{" "}
        <span className={faultyTerminalMounted ? "text-lime-300" : "text-rose-300"}>
          {faultyTerminalMounted ? "yes" : "no"}
        </span>
      </p>
      <p className="mt-2 text-cyan-100/90">z-index layers: background z-0, content z-10, header z-50</p>
    </aside>
  );
}
