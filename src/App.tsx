import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import SeoHead from "@/components/SeoHead";
import SiteShell from "@/layouts/SiteShell";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";

function NotFoundPage() {
  return (
    <section className="site-container py-20 md:py-28">
      <div className="max-w-xl border-t border-border pt-5">
        <p className="kicker">404 / lost page</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">Nothing is filed here.</h1>
        <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
          This page may have moved, or the address was typed incorrectly.
        </p>
      </div>
    </section>
  );
}

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SeoHead />
      <ScrollManager />
      <Routes>
        <Route element={<SiteShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
