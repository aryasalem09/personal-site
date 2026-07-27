import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function readTheme() {
  return document.documentElement.classList.contains("dark");
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(readTheme);

  useEffect(() => {
    const syncTheme = (event: StorageEvent) => {
      if (event.key !== "theme" || event.newValue === null) return;

      const next = event.newValue === "dark";
      document.documentElement.classList.toggle("dark", next);
      document.documentElement.style.colorScheme = next ? "dark" : "light";
      setDark(next);
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";

    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private browsing can disable storage; the in-session theme still updates.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      className="inline-flex size-7 items-center justify-center text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
