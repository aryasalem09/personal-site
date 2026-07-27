export const resumeHref = "/Arya-Salem-Resume.pdf";

export type ResumeIcon = "microscope" | "waves" | "chart" | "circuit" | "trophy" | "book";
export type BrandMark = "texas-am" | "ut-austin" | "asa" | "mecc-labs" | "tsa";

export type ResearchEntry = {
  id: string;
  icon: ResumeIcon;
  brand: BrandMark;
  verb: string;
  title: string;
  organization: string;
  role: string;
  period: string;
  summary: string;
  evidence: readonly { value: string; label: string }[];
};

export const researchExperience: readonly ResearchEntry[] = [
  {
    id: "neural-circuits",
    icon: "microscope",
    brand: "texas-am",
    verb: "Trace",
    title: "Finding neurons in the noise",
    organization: "Texas A&M University",
    role: "CURES Research Volunteer · Lillvis Research Group",
    period: "2026 — present",
    summary:
      "I trace and segment neurons through 3D expansion-microscopy image stacks, checking every structure from multiple angles and flagging uncertain boundaries for lab review instead of guessing.",
    evidence: [
      { value: "3D", label: "expansion-microscopy stacks" },
      { value: "XY · YZ · XZ", label: "quality-control views" },
    ],
  },
  {
    id: "pacific-coral",
    icon: "waves",
    brand: "ut-austin",
    verb: "Model",
    title: "Mapping where Pacific corals may persist",
    organization: "The University of Texas at Austin",
    role: "Student Researcher · Pacific Coral Modeling",
    period: "Apr 2026 — present",
    summary:
      "I built a reproducible geospatial pipeline that ranks relative habitat suitability for Pacific corals while keeping leakage, sampling bias, and provenance visible in the result.",
    evidence: [
      { value: "10", label: "coral species" },
      { value: "2,420", label: "reef cells" },
      { value: "131", label: "automated tests" },
    ],
  },
  {
    id: "biomedical-statistics",
    icon: "chart",
    brand: "asa",
    verb: "Test",
    title: "Turning health data into a question I could test",
    organization: "ASA South Florida Student Data Challenge",
    role: "Independent Researcher · NHANES 2024",
    period: "2026",
    summary:
      "I compared gradient-boosting and random-forest models for HDL cholesterol, used cross-validation to check the result, and interpreted the strongest predictors in a biomedical context.",
    evidence: [
      { value: "46%", label: "lower RMSE" },
      { value: "5-fold", label: "cross-validation" },
      { value: "Sole recipient", label: "Excellence Award" },
    ],
  },
] as const;

export type CommunityEntry = {
  icon: ResumeIcon;
  brand?: BrandMark;
  label: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  proof: string;
};

export const communityExperience: readonly CommunityEntry[] = [
  {
    icon: "circuit",
    brand: "mecc-labs",
    label: "Build",
    title: "MECC Labs",
    role: "Co-Founder & Lead Manager",
    period: "May 2025 — present",
    summary: "Hands-on programming, electronics, and engineering programs for students ages 8–14.",
    proof: "$20k+ raised · 100+ students reached",
  },
  {
    icon: "trophy",
    brand: "tsa",
    label: "Lead",
    title: "Technology Student Association",
    role: "Secretary",
    period: "2026 — 2027",
    summary: "I keep our chapter records and communications moving and help with the behind-the-scenes work that gets 200+ competitors ready for events.",
    proof: "Treasurer in 2025–2026 · managed a $10k+ annual budget",
  },
  {
    icon: "book",
    label: "Teach",
    title: "Competitive Math & School Tutoring",
    role: "Volunteer Tutor",
    period: "Summer 2023 — present",
    summary: "I tutor students from Algebra I through Calculus AB and competitive math. I've done this for as long as I can remember and I love helping others discover their love for math!",
    proof: "200+ volunteer hours",
  },
] as const;

export type AwardEntry = {
  id: string;
  mark: string;
  title: string;
  organization: string;
  year: string;
  brand?: BrandMark;
};

export const awards: readonly AwardEntry[] = [
  {
    id: "national-tsa",
    mark: "4th",
    title: "Video Game Design",
    organization: "National TSA Conference",
    year: "2026",
    brand: "tsa",
  },
  {
    id: "asa-excellence",
    mark: "Sole recipient",
    title: "Excellence Award",
    organization: "ASA South Florida Student Data Challenge",
    year: "2026",
    brand: "asa",
  },
  {
    id: "aime",
    mark: "Score 6",
    title: "AIME Qualifier",
    organization: "American Invitational Mathematics Examination",
    year: "2026",
  },
  {
    id: "texas-tsa",
    mark: "Top 25",
    title: "Video Game Design, Data Science & Webmasters",
    organization: "Texas TSA",
    year: "2025",
    brand: "tsa",
  },
] as const;
