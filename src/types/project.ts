export type ProjectTier = "utama" | "pendukung";

export type ProjectCategory =
  | "Sistem Bisnis"
  | "Automation & Media"
  | "Web Komersial"
  | "Sistem Informasi"
  | "Bot WhatsApp"
  | "Machine Learning & Data";

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  kind?: "screenshot" | "diagram" | "illustration";
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
  featured?: boolean;
  repositoryVisibility?: "public" | "private";
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
