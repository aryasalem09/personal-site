import FaultyTerminalLite from "@/components/FaultyTerminalLite";

export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(20,184,166,0.1),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(132,204,22,0.08),transparent_38%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,0.98))]" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.62)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.62)_1px,transparent_1px)] [background-size:44px_44px]" />
      <FaultyTerminalLite />
      <div className="absolute left-1/2 top-0 h-56 w-[min(42rem,80vw)] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
    </div>
  );
}
