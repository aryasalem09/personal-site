export const githubProfile = { handle: "aryasalem09", url: "https://github.com/aryasalem09" };

export type Project = {
  name: string;
  title?: string;
  owner: string;
  url: string;
  liveUrl?: string;
  urlLabel?: string;
  preview?: {
    src: string;
    alt: string;
    animatedSrc?: string;
    width?: number;
    height?: number;
  };
  description: string;
  language?: string;
  tags: string[];
  featured?: boolean;
  status?: "Active" | "Archived" | "Experiment" | "School";
  year?: string;
};

export const projects: Project[] = [
  {
    name: "slhs-tsa-website",
    title: "SLHS TSA Site",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/slhs-tsa-website",
    liveUrl: "https://www.slhstsa.org",
    preview: {
      src: "/projects/slhs-tsa-screenshot.webp",
      alt: "Seven Lakes High School TSA website homepage with chapter navigation and student project content",
    },
    description:
      "The website I built for Seven Lakes TSA, so members can find events, competition resources, photos, and chapter updates without digging through five different links.",
    language: "TypeScript",
    tags: ["Chapter site", "Next.js", "Supabase"],
    featured: true,
    status: "School",
    year: "2026",
  },
  {
    name: "coral-bleaching-tracker",
    title: "Coral Bleaching Tracker",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/coral-bleaching-tracker",
    liveUrl: "https://aryasalem09.github.io/coral-bleaching-tracker/",
    description: "An interactive map I built to bring reef surveys, NOAA heat stress, and a four-week bleaching forecast into one place.",
    preview: {
      src: "/projects/coral-screenshot.webp",
      alt: "Coral Bleaching Tracker interface showing reef-stress data and map-based exploration tools",
    },
    language: "TypeScript",
    tags: ["Climate", "Data visualization", "Research"],
    featured: true,
    status: "Active",
    year: "2026",
  },
  {
    name: "worktree",
    title: "Worktree",
    owner: "Worktree",
    url: "https://tryworktree.com",
    urlLabel: "Visit Worktree",
    preview: {
      src: "/projects/worktree-website.webp",
      alt: "Worktree website demo showing a shared agent conversation beside a code review",
      width: 1280,
      height: 720,
    },
    description: "As Co-Founder & CTO, I’m building a desktop workspace for teams using AI coding agents, with shared threads and context across computers and an account-free local mode.",
    tags: ["AI collaboration", "Desktop workspace", "Team context"],
    featured: true,
    status: "Active",
    year: "Jul 2026 — present",
  },
  {
    name: "brasstune",
    title: "BrassTune",
    owner: "Arya Salem & Kelvin Guo",
    url: "https://apps.apple.com/us/app/brasstune/id6795688588",
    urlLabel: "View on the App Store",
    preview: {
      src: "/projects/brasstune-app-store.webp",
      alt: "BrassTune App Store screenshots showing practice routines, live tuning, and score practice",
      width: 1600,
      height: 900,
    },
    description: "Co-developed with Kelvin Guo, this free iPhone and iPad brass practice app has live tuning, transposition-aware profiles, practice tools, and local history.",
    tags: ["Music practice", "iPhone & iPad", "Live tuning"],
    featured: true,
    status: "Active",
    year: "Aug 2026",
  },
  {
    name: "ecosim",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/ecosim",
    description: "A Rust simulation where plants, herbivores, and predators compete for space and energy while live graphs show the ecosystem change.",
    preview: {
      src: "/projects/ecosim-screenshot.webp",
      animatedSrc: "/projects/ecosim-demo.webm",
      alt: "EcoSim interface showing a simulated ecosystem with controls and live population data",
      width: 1294,
      height: 831,
    },
    language: "Rust",
    tags: ["Simulation", "Systems", "Ecology"],
    status: "Experiment",
    year: "2025",
  },
  {
    name: "Monte-Carlo-Pi-Estimator-",
    title: "Monte Carlo Pi Estimator",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/Monte-Carlo-Pi-Estimator-",
    description: "A compact Fortran implementation that estimates pi with Monte Carlo sampling.",
    language: "Fortran",
    tags: ["Numerical methods", "Monte Carlo", "Fortran"],
    status: "Experiment",
    year: "2025",
  },
  {
    name: "EventImpactModel",
    title: "Event Impact Model",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/EventImpactModel",
    description: "Cross-asset event-study analytics with a FastAPI backend, React interface, and Plotly visualizations.",
    language: "TypeScript",
    tags: ["Financial analytics", "FastAPI", "React", "Plotly"],
    status: "Active",
    year: "2026",
  },
  {
    name: "MacForge",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/MacForge",
    description: "A macOS utility for Now Playing, timers, downloads, a file tray, and CLI activity.",
    language: "Swift",
    tags: ["macOS utility", "SwiftUI", "AppKit", "CLI"],
    status: "Experiment",
    year: "2026",
  },
  {
    name: "oceansim",
    title: "Ocean Sandbox",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/oceansim",
    description: "A Rust oil-spill response simulation modeling currents, weathering, booms, skimmers, and dispersant.",
    language: "Rust",
    tags: ["Simulation", "Oil-spill response", "Environmental modeling"],
    status: "Experiment",
    year: "2026",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
