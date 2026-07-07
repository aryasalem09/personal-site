/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // scrapbook stack
        display: ['"Fraunces Variable"', '"Fraunces"', "Georgia", "serif"],
        marker: ['"Permanent Marker"', '"Comic Sans MS"', "cursive"],
        hand: ['"Caveat"', '"Segoe Script"', "cursive"],
        note: ['"Patrick Hand"', "ui-rounded", "system-ui", "cursive"],
        sans: ['"IBM Plex Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        // theme-aware tokens (kept for existing consumers)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // scrapbook palette
        paper: "hsl(var(--paper))",
        "paper-aged": "hsl(var(--paper-aged))",
        ink: "hsl(var(--ink))",
        "ink-soft": "hsl(var(--ink-soft))",
        olive: "hsl(var(--olive))",
        forest: "hsl(var(--forest))",
        tan: "hsl(var(--tan))",
        terracotta: "hsl(var(--terracotta))",
        rose: "hsl(var(--rose))",
        denim: "hsl(var(--denim))",
        amber: "hsl(var(--amber))",
        edge: "hsl(var(--edge))",
        desk: "hsl(var(--desk))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        // neo-brutalist hard offsets (paper stuck onto the page)
        hard: "5px 5px 0 0 hsl(var(--edge))",
        "hard-sm": "3px 3px 0 0 hsl(var(--edge))",
        "hard-lg": "8px 8px 0 0 hsl(var(--edge))",
        lift: "0 14px 30px -12px hsl(var(--edge) / 0.65)",
        "lift-sm": "0 8px 18px -10px hsl(var(--edge) / 0.6)",
        soft: "0 18px 50px -28px hsl(var(--edge) / 0.6)",
      },
      maxWidth: {
        site: "68rem",
        book: "60rem",
      },
      keyframes: {
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.96)" },
          "60%": { opacity: "1", transform: "translateY(-2px) scale(1.01)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "flip-in": {
          "0%": { opacity: "0", transform: "perspective(1400px) rotateY(-38deg) translateX(6%)", transformOrigin: "left center" },
          "100%": { opacity: "1", transform: "perspective(1400px) rotateY(0) translateX(0)", transformOrigin: "left center" },
        },
        "flip-in-back": {
          "0%": { opacity: "0", transform: "perspective(1400px) rotateY(38deg) translateX(-6%)", transformOrigin: "right center" },
          "100%": { opacity: "1", transform: "perspective(1400px) rotateY(0) translateX(0)", transformOrigin: "right center" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(var(--r, 0deg))" },
          "50%": { transform: "rotate(calc(var(--r, 0deg) + 1.5deg))" },
        },
        "glow-drift": {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.5s cubic-bezier(.2,.8,.2,1) both",
        "flip-in": "flip-in 0.6s cubic-bezier(.2,.8,.2,1) both",
        "flip-in-back": "flip-in-back 0.6s cubic-bezier(.2,.8,.2,1) both",
        "glow-drift": "glow-drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
