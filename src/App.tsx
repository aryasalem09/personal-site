import { BrowserRouter, Route, Routes } from "react-router-dom";
import AmbientBackground from "@/components/AmbientBackground";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import TargetCursorLite from "@/components/TargetCursorLite";
import SiteShell from "@/layouts/SiteShell";
import BlogListPage from "@/pages/BlogListPage";
import BlogPostPage from "@/pages/BlogPostPage";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";

function RoutedApp() {
  return (
    <div className="relative min-h-screen text-slate-100">
      <AmbientBackground />
      <TargetCursorLite />
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
      <SmoothScrollProvider>
        <RoutedApp />
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}
