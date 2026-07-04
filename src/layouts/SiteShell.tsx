import { Link, Outlet } from "react-router-dom";

import SiteTargetCursor from "@/components/effects/SiteTargetCursor";
import ThemeToggle from "@/components/ThemeToggle";
import { githubProfile } from "@/content/github";

function PaperBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-background"
    />
  );
}

export default function SiteShell() {
  return (
    <div className="relative flex min-h-svh flex-col">
      <SiteTargetCursor />
      <PaperBackground />

      <a
        href="#main"
        className="sr-only rounded-md bg-card px-3 py-2 text-xs focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="site-container flex h-14 items-center justify-between gap-6">
          <Link
            to="/"
            className="rounded-sm font-medium tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            arya.salem
          </Link>

          <nav aria-label="Main" className="flex items-center gap-1 text-sm text-muted-foreground sm:gap-2">
            <Link to="/#work" className="cursor-target inline-flex rounded-md px-1.5 py-1 transition hover:text-foreground">Work</Link>
            <Link to="/#music" className="cursor-target inline-flex rounded-md px-1.5 py-1 transition hover:text-foreground">Music</Link>
            <Link to="/#contact" className="cursor-target inline-flex rounded-md px-1.5 py-1 transition hover:text-foreground">Contact</Link>
            <a
              href={githubProfile.url}
              target="_blank"
              rel="noreferrer"
              className="cursor-target hidden rounded-md px-1.5 py-1 transition hover:text-foreground min-[380px]:inline-flex"
            >
              GitHub
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60">
        <div className="site-container flex flex-col gap-1 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Arya Salem</p>
          <p>made after school and rehearsal.</p>
        </div>
      </footer>
    </div>
  );
}
