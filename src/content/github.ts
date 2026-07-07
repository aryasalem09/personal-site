export type ProjectKind = "club" | "climate" | "simulation" | "math" | "webmaster";

export type Project = {
  name: string;
  title: string;
  owner: string;
  url: string;
  description: string;
  language?: string;
  year?: string;
  kind: ProjectKind;
  // short marker label for the filing tab
  tag: string;
  // handwritten note in the margin — why this one is here
  note: string;
};

export const githubProfile = {
  handle: "aryasalem09",
  url: "https://github.com/aryasalem09",
};

export const projects: Project[] = [
  {
    name: "coral-bleaching-tracker",
    title: "Coral Bleaching Tracker",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/coral-bleaching-tracker",
    description:
      "A small map for reading reef stress and where coral is bleaching.",
    language: "TypeScript",
    year: "2026",
    kind: "climate",
    tag: "climate",
    note: "Started as a science project. The data kept being interesting.",
  },
  {
    name: "ecosim",
    title: "Ecosim",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/ecosim",
    description:
      "An ecosystem toy: a few species, a few rules, and whatever they do to each other.",
    language: "Rust",
    year: "2025",
    kind: "simulation",
    tag: "simulation",
    note: "Simple rules start acting weird fast. That's the fun part.",
  },
  {
    name: "Monte-Carlo-Pi-Estimator-",
    title: "Monte Carlo Pi Estimator",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/Monte-Carlo-Pi-Estimator-",
    description:
      "Throw random darts at a square, count the ones that land in the circle, and out comes pi.",
    language: "Fortran",
    year: "2025",
    kind: "math",
    tag: "fortran",
    note: "Here because Fortran is funny and Monte Carlo is satisfying.",
  },
  {
    name: "webpage",
    title: "SLHS TSA Webpage",
    owner: "slhstsa",
    url: "https://github.com/slhstsa/webpage",
    description:
      "The TSA webmaster project for the 2025–2026 year, judged against a real rubric with a real deadline.",
    language: "JavaScript",
    year: "2026",
    kind: "webmaster",
    tag: "webmaster",
    note: "A school project with rules, which I didn't mind.",
  },
];
