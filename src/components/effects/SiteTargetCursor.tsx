import { lazy, Suspense, useEffect, useState } from "react";

import { useEnhancedEffects } from "@/hooks/useEnhancedEffects";

const TargetCursor = lazy(() => import("@/components/react-bits/TargetCursor"));

// gsap can't tween border colors written as `hsl(var(--x))`, so resolve the
// theme tokens to concrete values and re-resolve when the theme class flips.
function useCursorColors(enabled: boolean) {
  const [colors, setColors] = useState<{ base: string; target: string } | null>(null);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const resolve = () => {
      const styles = getComputedStyle(document.documentElement);
      setColors({
        base: `hsl(${styles.getPropertyValue("--foreground").trim()})`,
        target: `hsl(${styles.getPropertyValue("--signal").trim()})`,
      });
    };

    resolve();

    const observer = new MutationObserver(resolve);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [enabled]);

  return colors;
}

export default function SiteTargetCursor() {
  const enabled = useEnhancedEffects();
  const colors = useCursorColors(enabled);

  if (!enabled || !colors) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <TargetCursor
        key={colors.base}
        targetSelector=".cursor-target"
        spinDuration={1.8}
        hideDefaultCursor
        hoverDuration={0.16}
        parallaxOn={false}
        cursorColor={colors.base}
        cursorColorOnTarget={colors.target}
      />
    </Suspense>
  );
}
