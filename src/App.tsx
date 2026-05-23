import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AmbientBackground from "@/components/AmbientBackground";
import SiteShell from "@/layouts/SiteShell";
import BlogListPage from "@/pages/BlogListPage";
import BlogPostPage from "@/pages/BlogPostPage";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";

function RoutedApp() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const targetId = location.hash.slice(1);
    const timeoutId = window.setTimeout(() => {
      const section = document.getElementById(targetId);
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 30);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [location.hash, location.pathname]);

  return (
    <div className="relative min-h-screen text-slate-100">
      <AmbientBackground />
      <Routes>
        <Route element={<SiteShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RoutedApp />
    </BrowserRouter>
  );
}
