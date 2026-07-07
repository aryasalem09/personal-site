import { Outlet } from "react-router-dom";

import SiteTargetCursor from "@/components/effects/SiteTargetCursor";
import TerminalBackdrop from "@/components/effects/TerminalBackdrop";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteShell() {
  return (
    <div className="relative flex min-h-svh flex-col">
      <SiteTargetCursor />
      <TerminalBackdrop />

      <a
        href="#main"
        className="sr-only rounded-md bg-paper px-3 py-2 text-sm text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to the book
      </a>

      {/* the theme toggle floats like a lamp switch — always reachable, never a whole header */}
      <div className="fixed right-3 top-3 z-40 flex items-center gap-2 rounded-full border-2 border-edge bg-paper/90 px-2 py-1 shadow-hard-sm backdrop-blur">
        <span className="hidden pl-1.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink-soft sm:inline">
          desk lamp
        </span>
        <ThemeToggle />
      </div>

      <main id="main" className="flex flex-1 items-center justify-center">
        <Outlet />
      </main>

      <footer className="relative z-10">
        <div className="site-container flex flex-col items-center gap-1 py-6 text-center">
          <p className="font-hand text-xl text-[hsl(44_46%_88%)] mix-blend-difference">
            made after school and rehearsal.
          </p>
          <p className="font-mono text-[0.7rem] text-[hsl(44_46%_88%/0.7)] mix-blend-difference">
            &copy; {new Date().getFullYear()} Arya Salem · built by hand
          </p>
        </div>
      </footer>
    </div>
  );
}
