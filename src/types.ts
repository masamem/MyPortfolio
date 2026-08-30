export type Language = 'en' | 'ar';

export interface ProjectItem {
  id: string;
  client: string;
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
  fullDesc: { en: string; ar: string };
  category: string;
  categories: string[];
  disciplines: { en: string[]; ar: string[] };
  imageUrl: string;
  videoUrl?: string;
  featured?: boolean;
  year?: string;
  tags: string[];
  deliverables: { en: string[]; ar: string[] };
  stats?: { label: { en: string; ar: string }; value: string };
  accentColor?: string;
}

export interface ExperienceItem {
  role: { en: string; ar: string };
  company: { en: string; ar: string };
  period: { en: string; ar: string };
  desc: { en: string; ar: string };
  location: { en: string; ar: string };
  achievements?: { en: string[]; ar: string[] };
}

export interface ToolItem {
  name: { en: string; ar: string };
  cat: { en: string; ar: string };
  categoryGroup: 'video' | 'design' | 'interactive' | '3d';
}

export interface SocialItem {
  label: { en: string; ar: string };
  href: string;
  iconName: string;
}
