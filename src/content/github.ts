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
  note: string;
};

export const githubProfile = {
  handle: "aryasalem09",
  url: "https://github.com/aryasalem09",
};

export const projects: Project[] = [
  {
    name: "SLHS-HackClub-Website",
    title: "SLHS Hack Club",
    owner: "aryaSalem09",
    url: "https://github.com/aryasalem09/SLHS-HackClub-Website",
    description:
      "A club website for announcements, meetings, and making the Hack Club feel real outside the room.",
    language: "TypeScript",
    year: "2026",
    kind: "club",
    note: "The one I would show first because it has an actual audience at school.",
  },
  {
    name: "coral-bleaching-tracker",
    title: "Coral Bleaching Tracker",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/coral-bleaching-tracker",
    description:
      "A small climate-data interface for looking at reef stress and coral bleaching signals.",
    language: "TypeScript",
    year: "2026",
    kind: "climate",
    note: "Started for a science project, and the data kept being interesting.",
  },
  {
    name: "ecosim",
    title: "Ecosim",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/ecosim",
    description:
      "An ecosystem simulation experiment for simple species interactions and emergent behavior.",
    language: "Rust",
    year: "2025",
    kind: "simulation",
    note: "Tiny systems are fun because simple rules start acting weird fast.",
  },
  {
    name: "Monte-Carlo-Pi-Estimator-",
    title: "Monte Carlo Pi Estimator",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/Monte-Carlo-Pi-Estimator-",
    description:
      "A compact Fortran implementation that estimates pi with random sampling.",
    language: "Fortran",
    year: "2025",
    kind: "math",
    note: "Mostly here because Fortran is funny and Monte Carlo is satisfying.",
  },
  {
    name: "webpage",
    title: "SLHS TSA Webpage",
    owner: "slhstsa",
    url: "https://github.com/slhstsa/webpage",
    description:
      "A TSA webmaster project site for the 2025–2026 school year.",
    language: "JavaScript",
    year: "2026",
    kind: "webmaster",
    note: "A school web project with rules, constraints, and a real deadline.",
  },
];
