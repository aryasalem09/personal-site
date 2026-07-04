import { lazy, Suspense, useEffect, useState } from "react";

import { useEnhancedEffects } from "@/hooks/useEnhancedEffects";

const TargetCursor = lazy(() => import("@/components/react-bits/TargetCursor"));

function readCssColor(name: string) {
  if (typeof window === "undefined") return "#ffffff";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export default function SiteTargetCursor() {
  const enabled = useEnhancedEffects();
  const [colors, setColors] = useState({
    normal: "#1f2937",
    target: "#2563eb",
  });

  useEffect(() => {
    const update = () => {
      setColors({
        normal: readCssColor("--cursor-color") || "#1f2937",
        target: readCssColor("--cursor-target-color") || "#2563eb",
      });
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <TargetCursor
        key={colors.normal}
        targetSelector=".cursor-target"
        spinDuration={1.8}
        hideDefaultCursor
        hoverDuration={0.16}
        parallaxOn={false}
        cursorColor={colors.normal}
        cursorColorOnTarget={colors.target}
      />
    </Suspense>
  );
}
