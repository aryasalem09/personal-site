import { useEffect, useRef } from "react";

export default function TargetCursorLite() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const latestPointRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const canUseCursor = !reduceMotion.matches && !coarsePointer.matches;
    const cursor = cursorRef.current;

    if (!cursor) {
      return undefined;
    }

    cursor.dataset.enabled = canUseCursor ? "true" : "false";

    if (!canUseCursor) {
      return undefined;
    }

    const moveCursor = () => {
      rafRef.current = null;
      const { x, y } = latestPointRef.current;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const handlePointerMove = (event: PointerEvent) => {
      latestPointRef.current = { x: event.clientX, y: event.clientY };

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(moveCursor);
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest("[data-cursor-target]") : null;
      cursor.dataset.active = target ? "true" : "false";
    };

    const handlePointerOut = (event: PointerEvent) => {
      const nextTarget = event.relatedTarget instanceof Element ? event.relatedTarget.closest("[data-cursor-target]") : null;

      if (!nextTarget) {
        cursor.dataset.active = "false";
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <div ref={cursorRef} aria-hidden="true" className="target-cursor-lite" data-enabled="false" />;
}
