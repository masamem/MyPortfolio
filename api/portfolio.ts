import { google } from "googleapis";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const FOLDER_MIME = "application/vnd.google-apps.folder";
const FIELDS = "nextPageToken, files(id,name,mimeType,size,modifiedTime,parents,thumbnailLink,webViewLink)";

function esc(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function extensionOf(name: string): string {
  return name.includes(".") ? (name.split(".").pop() || "").toLowerCase() : "";
}

function mediaTypeOf(mimeType = "", extension = "") {
  if (mimeType.startsWith("image/") || ["jpg", "jpeg", "png", "webp", "gif", "avif", "svg"].includes(extension)) return "image" as const;
  if (mimeType.startsWith("video/") || ["mp4", "mov", "webm", "m4v", "avi"].includes(extension)) return "video" as const;
  if (mimeType === "application/pdf" || extension === "pdf") return "pdf" as const;
  if (["glb", "gltf"].includes(extension)) return "3d" as const;
  return "other" as const;
}

function formatSize(bytes?: string | null): string {
  const value = Number(bytes || 0);
  if (!Number.isFinite(value) || value <= 0) return "—";
  if (value < 1024) return `${value} B`;
  if (value < 1024 ** 2) return `${Math.round(value / 1024)} KB`;
  if (value < 1024 ** 3) return `${(value / 1024 ** 2).toFixed(1)} MB`;
  return `${(value / 1024 ** 3).toFixed(2)} GB`;
}

/** Map with at most `limit` calls in flight, preserving input order. Keeps Drive bursts under its rate limit. */
async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const DRIVE_CONCURRENCY = 8;

function isCoverName(name: string): boolean {
  const base = name.replace(/\.[^.]+$/, "").trim().toLowerCase();
  return ["cover", "thumbnail", "thumb", "poster", "غلاف"].includes(base);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  // The CDN caches per full URL, so any query string (e.g. ?refresh=123) would skip the
  // cache and force a full Drive crawl. Send those to the one cached URL instead.
  if (Object.keys(req.query || {}).length > 0) {
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.redirect(308, "/api/portfolio");
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const rootId = process.env.GOOGLE_PORTFOLIO_FOLDER_ID || process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!email || !rawKey || !rootId) {
    return res.status(500).json({
      error: "missing_credentials",
      message: "Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_PORTFOLIO_FOLDER_ID in Vercel.",
    });
  }

  try {
    const auth = new google.auth.JWT({
      email,
      key: rawKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
    const drive = google.drive({ version: "v3", auth });

    const listChildren = async (parentId: string, foldersOnly?: boolean) => {
      const items: any[] = [];
      let pageToken: string | undefined;
      const mimeFilter = foldersOnly === true
        ? ` and mimeType = '${FOLDER_MIME}'`
        : foldersOnly === false
          ? ` and mimeType != '${FOLDER_MIME}'`
          : "";

      do {
        const page = await drive.files.list({
          q: `'${esc(parentId)}' in parents and trashed = false${mimeFilter}`,
          fields: FIELDS,
          pageSize: 1000,
          pageToken,
          supportsAllDrives: true,
          includeItemsFromAllDrives: true,
          orderBy: "name",
        });
        items.push(...(page.data.files || []));
        pageToken = page.data.nextPageToken || undefined;
      } while (pageToken);

      return items;
    };

    // Supported structures:
    // 1) My Portfolio / Category / Project / files
    // 2) My Portfolio / Videos / Subcategory / Project / files
    const categoryFolders = await listChildren(rootId, true);
    const subcategories: any[] = [];

    const buildProject = async (
      projectFolder: any,
      categoryFolder: any,
      subcategoryFolder?: any,
    ) => {
      if (!projectFolder?.id || !projectFolder?.name) return null;
      const rawFiles = await listChildren(projectFolder.id, false);

      const media = rawFiles
        .filter((file) => file.id && file.name)
        .map((file) => {
          const extension = extensionOf(file.name!);
          const type = mediaTypeOf(file.mimeType || "", extension);
          const version = encodeURIComponent(file.modifiedTime || "");
          return {
            id: file.id,
            name: file.name,
            mimeType: file.mimeType || "",
            extension,
            type,
            size: formatSize(file.size),
            modifiedTime: file.modifiedTime || "",
            isCover: isCoverName(file.name!),
            url: `/api/portfolio-file?id=${encodeURIComponent(file.id!)}&v=${version}${type === "video" ? "&stream=2" : ""}`,
            webViewLink: file.webViewLink || "",
          };
        })
        .filter((item) => item.type !== "other");

      const cover =
        media.find((item) => item.isCover && item.type === "image") ||
        media.find((item) => item.isCover && item.type === "video") ||
        media.find((item) => item.type === "image") ||
        media.find((item) => item.type === "video") ||
        media[0] ||
        null;

      const latestModified = media
        .map((item) => item.modifiedTime)
        .filter(Boolean)
        .sort()
        .at(-1) || projectFolder.modifiedTime || "";

      return {
        id: projectFolder.id,
        name: projectFolder.name,
        category: categoryFolder.name,
        categoryId: categoryFolder.id,
        subcategory: subcategoryFolder?.name || "",
        subcategoryId: subcategoryFolder?.id || "",
        modifiedTime: latestModified,
        cover,
        media,
      };
    };

    // Phase 1: collect every project folder (folder listings run in parallel per level).
    type ProjectRef = { projectFolder: any; categoryFolder: any; subcategoryFolder?: any };
    const validCategories = categoryFolders.filter((folder) => folder.id && folder.name);
    const refsPerCategory = await mapLimit(validCategories, DRIVE_CONCURRENCY, async (categoryFolder): Promise<ProjectRef[]> => {
      const firstLevelFolders = (await listChildren(categoryFolder.id, true)).filter((f) => f.id && f.name);

      // Videos uses one extra level: Videos / Motion Graphics|AI Videos|Other Videos / Project / files
      if (categoryFolder.name.trim().toLowerCase() === "videos") {
        const perSub = await mapLimit(firstLevelFolders, DRIVE_CONCURRENCY, async (subcategoryFolder) => {
          subcategories.push({ id: subcategoryFolder.id, name: subcategoryFolder.name, category: categoryFolder.name, categoryId: categoryFolder.id });
          const projectFolders = await listChildren(subcategoryFolder.id, true);
          return projectFolders.map((projectFolder) => ({ projectFolder, categoryFolder, subcategoryFolder }));
        });
        return perSub.flat();
      }

      return firstLevelFolders.map((projectFolder) => ({ projectFolder, categoryFolder }));
    });

    // Phase 2: list every project's files in parallel.
    const built = await mapLimit(refsPerCategory.flat(), DRIVE_CONCURRENCY, (ref) =>
      buildProject(ref.projectFolder, ref.categoryFolder, ref.subcategoryFolder),
    );
    const projects = built.filter((project): project is NonNullable<typeof project> => project !== null);
    subcategories.sort((a, b) => `${a.category}/${a.name}`.localeCompare(`${b.category}/${b.name}`));

    projects.sort((a, b) => (b.modifiedTime || "").localeCompare(a.modifiedTime || ""));

    // Serve from Vercel's CDN for 5 minutes, then keep serving the last copy for up to a
    // day while one background request rebuilds it, so visitors never wait on the Drive crawl.
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=86400");
    return res.status(200).json({
      source: "google-drive",
      updatedAt: new Date().toISOString(),
      categories: categoryFolders
        .filter((folder) => folder.id && folder.name)
        .map((folder) => ({ id: folder.id, name: folder.name })),
      subcategories,
      projects,
    });
  } catch (error) {
    console.error("[/api/portfolio]", error);
    return res.status(500).json({ error: "drive_fetch_failed" });
  }
}
