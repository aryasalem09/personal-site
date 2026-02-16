import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import DebugOverlay from "@/components/DebugOverlay";
import FaultyTerminalBackground from "@/components/FaultyTerminalBackground";
import TargetCursor from "@/components/TargetCursor";
import SiteShell from "@/layouts/SiteShell";
import BlogListPage from "@/pages/BlogListPage";
import BlogPostPage from "@/pages/BlogPostPage";
import HomePage from "@/pages/HomePage";

function RoutedApp() {
  const [faultyTerminalMounted, setFaultyTerminalMounted] = useState(false);
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
      <FaultyTerminalBackground onMountChange={setFaultyTerminalMounted} />
      <div className="pointer-events-none fixed left-3 top-3 z-[70] rounded-full border border-cyan-300/50 bg-slate-950/55 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
        BUILD: FT-V3
      </div>
      <DebugOverlay faultyTerminalMounted={faultyTerminalMounted} />
      <Routes>
        <Route element={<SiteShell />}>
          <Route path="/" element={<HomePage />} />
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
      <TargetCursor
        targetSelector=".cursor-target, a, button, [role='button'], iframe"
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      <RoutedApp />
    </BrowserRouter>
  );
}
