export interface SkillCategory {
  id: string;
  name: string;
  summary: string;
  skills: string[];
  verifiedIn: string[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  shortLabel: string;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  topic: string;
  message: string;
  website?: string;
  formStartedAt?: number;
}

export interface ContactApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  fallbackMailto?: boolean;
}
