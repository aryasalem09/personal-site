import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import CommandPalette from "@/components/CommandPalette";
import ThemeToggle from "@/components/ThemeToggle";
import { GithubIcon } from "@/components/icons";
import { githubProfile } from "@/content/github";
import { resumeHref } from "@/content/profile";

const homeLinks = [
  { label: "Work", hash: "#work" },
  { label: "About", hash: "#about" },
  { label: "Music", hash: "#music" },
  { label: "Contact", hash: "#contact" },
];

function PaperBackground() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-background" />;
}

function HomeNavigation() {
  const location = useLocation();
  const [observedHash, setObservedHash] = useState("");
  const activeHash = observedHash || location.hash;

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const sections = homeLinks
      .map(({ hash }) => document.getElementById(hash.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;
      const hero = document.getElementById("home");
      const heroRect = hero?.getBoundingClientRect();

      if (heroRect && heroRect.top <= viewportCenter && heroRect.bottom >= viewportCenter) {
        setObservedHash("");
        return;
      }

      const closest = sections.reduce((current, section) => {
        const currentDistance = Math.abs(current.getBoundingClientRect().top + current.getBoundingClientRect().height / 2 - viewportCenter);
        const sectionRect = section.getBoundingClientRect();
        const sectionDistance = Math.abs(sectionRect.top + sectionRect.height / 2 - viewportCenter);
        return sectionDistance < currentDistance ? section : current;
      });

      setObservedHash(`#${closest.id}`);
    };

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: "-35% 0px -35% 0px",
      threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <nav aria-label="Main navigation" className="flex min-w-0 items-center gap-3 overflow-x-auto text-[11px] font-medium uppercase tracking-[0.16em] sm:gap-5">
      {homeLinks.map((item) => {
        const active = location.pathname === "/" && activeHash === item.hash;

        return (
          <Link
            key={item.hash}
            to={`/${item.hash}`}
            aria-current={active ? "location" : undefined}
            className={`shrink-0 border-b border-transparent py-1.5 outline-none transition-colors hover:border-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              active ? "border-foreground text-foreground" : "text-muted-foreground"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function SiteShell() {
  const location = useLocation();
  const isProjects = location.pathname === "/projects";

  return (
    <div className="relative flex min-h-svh flex-col">
      <PaperBackground />

      <a
        href="#main"
        className="sr-only border border-foreground bg-background px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>

      <header className="site-header sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="site-container flex min-h-16 flex-wrap items-center justify-between gap-x-5 gap-y-1 py-3 sm:flex-nowrap">
          <Link
            to="/"
            aria-label="Arya Salem, home"
            className="shrink-0 text-sm font-semibold uppercase tracking-[0.2em] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Arya Salem
          </Link>

          <div className="hidden min-w-0 sm:block">
            <HomeNavigation />
          </div>

          <div className="flex shrink-0 items-center gap-3 text-[11px] uppercase tracking-[0.16em]">
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Arya Salem's resume PDF in a new tab"
              className="inline-flex border-b border-transparent py-1.5 text-muted-foreground outline-none transition-colors hover:border-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Resume
            </a>
            <Link
              to="/projects"
              aria-current={isProjects ? "page" : undefined}
              className={`inline-flex border-b border-transparent py-1.5 outline-none transition-colors hover:border-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isProjects ? "border-foreground text-foreground" : "text-muted-foreground"
              }`}
            >
              Index
            </Link>
            <CommandPalette />
            <a
              href={githubProfile.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Arya Salem on GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <GithubIcon className="size-4" />
            </a>
            <ThemeToggle />
          </div>

          <div className="order-3 w-full border-t border-border pt-1 sm:hidden">
            <HomeNavigation />
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>

      <footer className="border-t border-border">
        <div className="site-container flex flex-col gap-2 py-6 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Arya Salem</p>
        </div>
      </footer>
    </div>
  );
}
