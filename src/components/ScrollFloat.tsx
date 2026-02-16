import React, { useEffect, useMemo, useRef } from "react";
import type { ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  splitBy?: "chars" | "words";
  scrub?: boolean | number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
                                                   children,
                                                   scrollContainerRef,
                                                   containerClassName = "",
                                                   textClassName = "",
                                                   animationDuration = 1,
                                                   ease = "power3.out",
                                                   scrollStart = "top 90%",
                                                   scrollEnd = "top 55%",
                                                   stagger = 0.03,
                                                   splitBy = "words",
                                                   scrub = 0.35,
                                                 }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;

    if (splitBy === "words") {
      return children.split(/(\s+)/).map((part, index) => {
        if (!part.trim()) return <span key={`space-${index}`}>{part}</span>;

        return (
            <span className="scroll-float-unit inline-block" key={`word-${index}`}>
            {part}
          </span>
        );
      });
    }

    return Array.from(children).map((char, index) => {
      if (char === " ") return <span key={`space-${index}`}> </span>;

      return (
          <span className="scroll-float-unit inline-block" key={`char-${index}`}>
          {char}
        </span>
      );
    });
  }, [children, splitBy]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current ?? window;

    const ctx = gsap.context(() => {
      const units = el.querySelectorAll(".scroll-float-unit");
      if (!units.length) return;

      const scrubValue =
          scrub === true ? 0.35 : scrub === false ? false : Math.max(0.1, scrub);

      gsap.fromTo(
          units,
          {
            willChange: "transform, filter",
            yPercent: 24,
            filter: "blur(10px)",
            opacity: 1,
          },
          {
            duration: animationDuration,
            ease,
            yPercent: 0,
            filter: "blur(0px)",
            opacity: 1,
            stagger,
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: scrollStart,
              end: scrollEnd,
              scrub: scrubValue === false ? false : scrubValue,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              // key: keep it stable; no reverse fade-outs
              onRefresh: (self) => self.update(),
            },
          },
      );
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, splitText, scrub]);

  return (
      <span ref={containerRef} className={`inline whitespace-normal align-baseline ${containerClassName}`.trim()}>
      <span className={`inline ${textClassName}`.trim()}>{splitText}</span>
    </span>
  );
};

export default ScrollFloat;