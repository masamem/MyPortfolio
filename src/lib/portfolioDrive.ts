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
