export type ProjectKind = "club" | "climate" | "simulation" | "math" | "webmaster";

export type Project = {
  name: string;
  title: string;
  owner: string;
  url: string;
  liveUrl?: string;
  description: string;
  language?: string;
  tags: string[];
  featured?: boolean;
  status?: "Active" | "Archived" | "Experiment" | "School";
  year?: string;
  kind: ProjectKind;
  note: string;
  artifact: {
    label: string;
    rows: Array<[string, string]>;
  };
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
    tags: ["club site", "frontend", "school"],
    featured: true,
    status: "School",
    year: "2026",
    kind: "club",
    note: "The one I would show first because it has an actual audience at school.",
    artifact: {
      label: "club notice",
      rows: [
        ["for", "SLHS Hack Club"],
        ["job", "meetings + identity"],
        ["feel", "student-run, not corporate"],
      ],
    },
  },
  {
    name: "coral-bleaching-tracker",
    title: "Coral Bleaching Tracker",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/coral-bleaching-tracker",
    description:
      "A small climate-data interface for looking at reef stress and coral bleaching signals.",
    language: "TypeScript",
    tags: ["climate", "data", "research"],
    featured: true,
    status: "Active",
    year: "2026",
    kind: "climate",
    note: "A science-project interface, not a dashboard template.",
    artifact: {
      label: "reef reading",
      rows: [
        ["signal", "bleaching risk"],
        ["view", "map + context"],
        ["rule", "don’t overclaim the data"],
      ],
    },
  },
  {
    name: "ecosim",
    title: "Ecosim",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/ecosim",
    description:
      "An ecosystem simulation experiment for simple species interactions and emergent behavior.",
    language: "Rust",
    tags: ["simulation", "systems", "ecology"],
    featured: true,
    status: "Experiment",
    year: "2025",
    kind: "simulation",
    note: "Tiny systems are fun because simple rules start acting weird fast.",
    artifact: {
      label: "sim rule",
      rows: [
        ["prey + food", "growth"],
        ["predator + prey", "energy"],
        ["time", "changes everything"],
      ],
    },
  },
  {
    name: "Monte-Carlo-Pi-Estimator-",
    title: "Monte Carlo Pi Estimator",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/Monte-Carlo-Pi-Estimator-",
    description:
      "A compact Fortran implementation that estimates pi with random sampling.",
    language: "Fortran",
    tags: ["math", "monte carlo", "fortran"],
    status: "Experiment",
    year: "2025",
    kind: "math",
    note: "Mostly here because Fortran is funny and Monte Carlo is satisfying.",
    artifact: {
      label: "sampling note",
      rows: [
        ["inside circle", "count"],
        ["total points", "compare"],
        ["π", "estimate"],
      ],
    },
  },
  {
    name: "webpage",
    title: "SLHS TSA Webpage",
    owner: "slhstsa",
    url: "https://github.com/slhstsa/webpage",
    description:
      "A TSA webmaster project site for the 2025–2026 school year.",
    language: "JavaScript",
    tags: ["tsa", "webmasters", "school"],
    status: "School",
    year: "2026",
    kind: "webmaster",
    note: "A school web project with rules, constraints, and a real deadline.",
    artifact: {
      label: "webmaster brief",
      rows: [
        ["team", "SLHS TSA"],
        ["season", "2025–2026"],
        ["goal", "clear and usable"],
      ],
    },
  },
];
