export default function StatusPill() {
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-40 motion-safe:animate-ping" />
        <span className="relative inline-flex size-2 rounded-full bg-signal" />
      </span>
      now: junior year &middot; building the Hack Club site
    </p>
  );
}
