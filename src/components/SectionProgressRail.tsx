import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "music", label: "Music" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function SectionProgressRail() {
  const location = useLocation();
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (location.pathname !== "/") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-38% 0px -48% 0px",
        threshold: [0.08, 0.24, 0.42],
      },
    );

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  if (location.pathname !== "/") {
    return null;
  }

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    if (lenis) {
      lenis.scrollTo(target, { offset: -76, duration: 0.72 });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <TooltipProvider delayDuration={120}>
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 rounded-full border border-white/10 bg-slate-950/35 p-2 backdrop-blur-xl lg:flex">
        {sections.map((section) => (
          <Tooltip key={section.id}>
            <TooltipTrigger asChild>
              <button
                type="button"
                data-cursor-target
                onClick={() => scrollToSection(section.id)}
                className="group grid size-8 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                aria-label={`Scroll to ${section.label}`}
                aria-current={activeSection === section.id ? "true" : undefined}
              >
                <span
                  className={[
                    "block size-2.5 rounded-full border transition",
                    activeSection === section.id
                      ? "border-cyan-200 bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.48)]"
                      : "border-slate-400/60 bg-slate-900 group-hover:border-cyan-200/70",
                  ].join(" ")}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="border border-cyan-200/20 bg-slate-950 text-cyan-50">
              {section.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
