import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* private mode — theme just won't persist */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Turn the desk lamp on (switch to day)" : "Turn the desk lamp off (switch to night)"}
      className="cursor-target group inline-flex items-center gap-2 rounded-full border-2 border-edge bg-paper/95 px-3 py-1.5 shadow-hard-sm outline-none backdrop-blur transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="inline-flex size-5 items-center justify-center text-terracotta">
        {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </span>
      <span className="font-mono text-[0.65rem] uppercase tracking-wide text-ink-soft">
        desk lamp
      </span>
      <span
        aria-hidden="true"
        className="font-mono text-[0.65rem] font-medium uppercase tracking-wide text-terracotta"
      >
        {dark ? "night" : "day"}
      </span>
    </button>
  );
}
