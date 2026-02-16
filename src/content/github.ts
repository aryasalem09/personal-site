export const githubProfile = { handle: "aryasalem09", url: "https://github.com/aryasalem09" };

export type PinnedRepo = {
  name: string;
  owner: string;
  url: string;
  description: string;
  language?: string;
};

export const pinnedRepos: PinnedRepo[] = [
  {
    name: "SLHS-HackClub-Website",
    owner: "aryaSalem09",
    url: "https://github.com/aryasalem09/SLHS-HackClub-Website",
    description: "Website for the SLHS HackClub",
    language: "TypeScript"
  },
  {
    name: "coral-bleaching-tracker",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/coral-bleaching-tracker",
    description: "",
    language: "TypeScript"
  },
  {
    name: "ecosim",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/ecosim",
    description: "",
    language: "Rust"
  },
  {
    name: "Monte-Carlo-Pi-Estimator-",
    owner: "aryasalem09",
    url: "https://github.com/aryasalem09/Monte-Carlo-Pi-Estimator-",
    description: "Turns out reddit is the best place to learn Fortran",
    language: "Fortran"
  },
  {
    name: "webpage",
    owner: "slhstsa",
    url: "https://github.com/slhstsa/webpage",
    description: "2025-2026 Webmasters",
    language: "JavaScript"
  }
];
