import { Link, Outlet } from "react-router-dom";

import CommandPalette from "@/components/CommandPalette";
import ThemeToggle from "@/components/ThemeToggle";
import { GithubIcon } from "@/components/icons";
import { githubProfile } from "@/content/github";

const navItems = [
  { label: "Work", to: "/#work" },
  { label: "Music", to: "/#music" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/#contact", desktopOnly: true },
];

function PaperBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-background">
      <div className="notebook-grid absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(42rem_26rem_at_16%_-6%,hsl(var(--signal)/0.08),transparent_70%),radial-gradient(34rem_22rem_at_88%_-2%,hsl(var(--ember)/0.07),transparent_70%)]" />
      <div className="absolute inset-y-0 left-4 w-px bg-ember/25 md:left-8" />
    </div>
  );
}

export default function SiteShell() {
  return (
    <div className="relative flex min-h-svh flex-col">
      <PaperBackground />

      <a
        href="#main"
        className="sr-only rounded-md bg-card px-3 py-2 font-mono text-xs focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="site-container flex h-14 items-center justify-between gap-3">
          <Link
            to="/"
            className="rounded-sm font-mono text-sm font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            arya<span className="text-signal">.</span>salem
          </Link>

          <nav aria-label="Main" className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-2.5 py-1.5 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-3 ${item.desktopOnly ? "hidden sm:inline-flex" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <CommandPalette />
            <a
              href={githubProfile.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Arya on GitHub"
              className="icon-button"
            >
              <GithubIcon className="size-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/70">
        <div className="site-container flex flex-col gap-2 py-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Arya Salem</p>
          <p>graph paper, thin borders, zero WebGL</p>
        </div>
      </footer>
    </div>
  );
}
