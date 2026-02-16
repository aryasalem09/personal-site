import { Outlet } from "react-router-dom";

const navItems = [
  { href: "/#home", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#music", label: "Music" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function SiteShell() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 bg-slate-950/14 backdrop-blur-xl">
        <div className="slide-divider" />
        <div className="slide-inner py-4">
          <nav className="flex flex-wrap items-center justify-center gap-1.5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="cursor-target rounded-full px-4 py-2 text-sm font-medium text-slate-200/78 transition hover:bg-white/10 hover:text-slate-100"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://github.com/aryasalem09"
              target="_blank"
              rel="noreferrer"
              className="cursor-target rounded-full bg-white/8 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/12"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
