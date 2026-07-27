export const githubProfile = { handle: "aryasalem09", url: "https://github.com/aryasalem09" };

export type Project = {
  name: string;
  title?: string;
  owner: string;
  url: string;
  liveUrl?: string;
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
    featured: true,
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
    name: "mathlify",
    title: "Mathify",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/mathlify",
    description: "A TypeScript app for student labs and an admin dashboard, backed by Supabase.",
    language: "TypeScript",
    tags: ["Education", "Student labs", "Admin dashboard", "Supabase"],
    status: "Active",
    year: "2026",
  },
  {
    name: "PolyShield-App",
    title: "PolyShield App",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/PolyShield-App",
    description: "A TypeScript security and privacy-focused application built with Next.js and Supabase.",
    language: "TypeScript",
    tags: ["Security & privacy", "Next.js", "Supabase"],
    status: "Active",
    year: "2026",
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
