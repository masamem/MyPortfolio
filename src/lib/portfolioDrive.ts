export type PortfolioMediaType = 'image' | 'video' | 'pdf' | '3d';

export interface PortfolioMedia {
  id: string;
  name: string;
  mimeType: string;
  extension: string;
  type: PortfolioMediaType;
  size: string;
  modifiedTime: string;
  isCover: boolean;
  url: string;
  webViewLink?: string;
}

export interface DrivePortfolioProject {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  subcategory?: string;
  subcategoryId?: string;
  modifiedTime: string;
  /** From the Drive folder's Description; empty strings when not set. */
  description?: { en: string; ar: string };
  cover: PortfolioMedia | null;
  media: PortfolioMedia[];
}

export interface DrivePortfolioResponse {
  source: string;
  updatedAt: string;
  categories: Array<{ id: string; name: string }>;
  subcategories?: Array<{ id: string; name: string; category: string; categoryId: string }>;
  projects: DrivePortfolioProject[];
}

const CATEGORY_BLURBS: Record<string, { en: string; ar: string }> = {
  branding: { en: 'Brand identity design: logo, visual system and applications.', ar: 'تصميم هوية بصرية: الشعار والنظام البصري وتطبيقاته.' },
  videos: { en: 'Video production, editing and motion design.', ar: 'إنتاج ومونتاج فيديو وتصميم حركة.' },
  'social media': { en: 'Social media posts and campaign designs.', ar: 'تصاميم منشورات وحملات لوسائل التواصل الاجتماعي.' },
  '3d': { en: '3D models and product visuals.', ar: 'مجسمات ثلاثية الأبعاد ومرئيات منتجات.' },
  'other work': { en: 'Selected design pieces.', ar: 'مختارات من أعمال التصميم.' },
};

/** The project's own Drive description in the current language, else a short line for its category. */
export function projectBlurb(project: DrivePortfolioProject, lang: 'en' | 'ar'): string {
  const own = project.description?.[lang] || project.description?.en;
  if (own) return own;
  const key = project.category.trim().toLowerCase();
  const byCategory = CATEGORY_BLURBS[key] || (key.includes('ui') || key.includes('web') ? { en: 'UI/UX design and web development.', ar: 'تصميم واجهات وتجربة مستخدم وتطوير ويب.' } : null);
  return byCategory ? byCategory[lang] : lang === 'ar' ? 'مشروع مختار من أعمالي.' : 'A selected project from my work.';
}

// Always the same URL so Vercel's CDN can serve it. Drive changes show up within ~5 minutes.
// `_forceRefresh` is ignored; it's kept only so older, unused components still type-check.
export async function fetchPortfolioFromDrive(_forceRefresh?: boolean, signal?: AbortSignal) {
  const response = await fetch('/api/portfolio', {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = typeof body?.message === 'string' ? body.message : `Portfolio API responded with ${response.status}`;
    throw new Error(message);
  }

  const data = (await response.json()) as DrivePortfolioResponse;
  if (!Array.isArray(data.projects) || !Array.isArray(data.categories)) {
    throw new Error('Unexpected portfolio API payload');
  }
  return data;
}
