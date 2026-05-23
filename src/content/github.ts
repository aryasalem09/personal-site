export const githubProfile = { handle: "aryasalem09", url: "https://github.com/aryasalem09" };

export type Project = {
  name: string;
  owner: string;
  url: string;
  liveUrl?: string;
  description: string;
  language?: string;
  tags: string[];
  featured?: boolean;
  status?: "Active" | "Archived" | "Experiment" | "School";
  year?: string;
};

export const projects: Project[] = [
  {
    name: "SLHS-HackClub-Website",
    owner: "aryaSalem09",
    url: "https://github.com/aryasalem09/SLHS-HackClub-Website",
    description: "A polished site for SLHS Hack Club with event information, club identity, and student-friendly navigation.",
    language: "TypeScript",
    tags: ["Club site", "Frontend", "Student tech"],
    featured: true,
    status: "School",
    year: "2026",
  },
  {
    name: "coral-bleaching-tracker",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/coral-bleaching-tracker",
    description: "A data-focused coral bleaching tracker for exploring reef stress signals and environmental context.",
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
    description: "An ecosystem simulation experiment built to model simple interactions and emergent behavior.",
    language: "Rust",
    tags: ["Simulation", "Systems", "Ecology"],
    featured: true,
    status: "Experiment",
    year: "2025",
  },
  {
    name: "Monte-Carlo-Pi-Estimator-",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/Monte-Carlo-Pi-Estimator-",
    description: "A compact Fortran implementation that estimates pi with Monte Carlo sampling.",
    language: "Fortran",
    tags: ["Numerical methods", "Monte Carlo", "Fortran"],
    status: "Experiment",
    year: "2025",
  },
  {
    name: "webpage",
    owner: "slhstsa",
    url: "https://github.com/slhstsa/webpage",
    description: "A TSA webmaster project site for the 2025-2026 school year.",
    language: "JavaScript",
    tags: ["TSA", "Webmasters", "School"],
    status: "School",
    year: "2026",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
