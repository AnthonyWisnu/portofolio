export type ProjectTier = "utama" | "pendukung";

export type ProjectCategory =
  | "Fullstack & SaaS"
  | "Automation & Media"
  | "Web Komersial"
  | "AI & Knowledge Graph"
  | "Machine Learning & Data";

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectArchitectureNode {
  layer: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  tier: ProjectTier;
  category: ProjectCategory;
  year: string;
  tagline: string;
  summary: string;
  problem: string;
  solution: string;
  highlights: string[];
  architecture: ProjectArchitectureNode[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  coverImage?: string;
  screenshots: ProjectScreenshot[];
  consoleVariant?: "void" | "minji" | "scout";
  verificationNote: string;
}

export interface VoidPlatformSpec {
  id: string;
  name: string;
  badge: string;
  codec: string;
  description: string;
  accent: string;
}
