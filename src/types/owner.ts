export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  faculty: string;
  period: string;
  badge: string;
  logo?: string;
}

export interface FocusArea {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
}

export interface SocialLinkItem {
  id: "github" | "instagram" | "threads" | "facebook";
  label: string;
  handle: string;
  url: string;
}

export interface OwnerProfile {
  name: string;
  shortName: string;
  monogram: string;
  role: string;
  headlineIntro: string;
  institution: string;
  location: string;
  origin: string;
  domain: string;
  domainUrl: string;
  email: string;
  shortBio: string;
  extendedBio: string[];
  focusAreas: FocusArea[];
  education: EducationEntry[];
  socials: SocialLinkItem[];
}
