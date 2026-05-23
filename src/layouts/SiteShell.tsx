import { NavLink, Outlet } from "react-router-dom";
import CommandPalette from "@/components/CommandPalette";
import SectionProgressRail from "@/components/SectionProgressRail";

const navItems = [
  { href: "/#home", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/#music", label: "Music" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function SiteShell() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 bg-slate-950/[0.14] backdrop-blur-xl">
        <div className="slide-divider" />
        <div className="slide-inner py-4">
          <nav className="flex flex-wrap items-center justify-center gap-1.5">
            {navItems.map((item) =>
              item.href.startsWith("/#") ? (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor-target
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-200/78 outline-none transition hover:bg-white/10 hover:text-slate-100 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href}
                  data-cursor-target
                  className={({ isActive }) =>
                    [
                      "rounded-full px-4 py-2 text-sm font-medium outline-none transition hover:bg-white/10 hover:text-slate-100 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                      isActive ? "bg-white/10 text-slate-100" : "text-slate-200/78",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <a
              href="https://github.com/aryasalem09"
              target="_blank"
              rel="noreferrer"
              data-cursor-target
              className="rounded-full bg-white/[0.08] px-4 py-2 text-sm font-medium text-slate-100 outline-none transition hover:bg-white/[0.12] focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              GitHub
            </a>
            <CommandPalette />
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <SectionProgressRail />
    </div>
  );
}
