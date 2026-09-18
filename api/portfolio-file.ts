import { google } from "googleapis";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Support both Fetch Headers (Gaxios 7) and older Google client header objects.
export function responseHeader(headers: unknown, name: string): string | undefined {
  const value = headers as { get?: (key: string) => string | null } & Record<string, unknown>;
  if (typeof value.get === "function") return value.get(name) || undefined;
  const header = value[name];
  return Array.isArray(header) ? header.join(", ") : typeof header === "string" ? header : undefined;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const fileId = String(req.query.id || "");
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const rootId = process.env.GOOGLE_PORTFOLIO_FOLDER_ID || process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!fileId) return res.status(400).json({ error: "missing_file_id" });
  if (!email || !rawKey || !rootId) {
    return res.status(500).json({ error: "missing_credentials" });
  }

  try {
    const auth = new google.auth.JWT({
      email,
      key: rawKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
    const drive = google.drive({ version: "v3", auth });

    const isInsidePortfolio = async (candidateId: string): Promise<boolean> => {
      const visited = new Set<string>();
      let pending = [candidateId];

      // Portfolio files currently have at most four levels. Keep a bounded
      // traversal to prevent malformed Drive relationships from causing loops.
      for (let depth = 0; depth < 10 && pending.length > 0; depth += 1) {
        const next: string[] = [];

        for (const id of pending) {
          if (id === rootId) return true;
          if (visited.has(id)) continue;
          visited.add(id);

          const item = await drive.files.get({
            fileId: id,
            fields: "id,parents",
            supportsAllDrives: true,
          });

          next.push(...(item.data.parents || []));
        }

        pending = next;
      }

      return false;
    };

    if (!(await isInsidePortfolio(fileId))) {
      return res.status(403).json({ error: "file_not_in_portfolio" });
    }

    const meta = await drive.files.get({
      fileId,
      fields: "name,mimeType,size,modifiedTime",
      supportsAllDrives: true,
    });

    const fileName = meta.data.name || "file";
    const extension = fileName.includes(".") ? (fileName.split(".").pop() || "").toLowerCase() : "";
    const contentType = extension === "glb"
      ? "model/gltf-binary"
      : extension === "gltf"
        ? "model/gltf+json"
        : meta.data.mimeType || "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Cache-Control", contentType.startsWith("video/")
      ? "private, no-store"
      : "public, max-age=31536000, immutable");
    res.setHeader("Content-Disposition", `inline; filename*=UTF-8''${encodeURIComponent(fileName)}`);

    if (meta.data.size) res.setHeader("Content-Length", meta.data.size);
    if (req.method === "HEAD") return res.status(200).end();

    const range = typeof req.headers.range === "string" ? req.headers.range : undefined;
    const response = await drive.files.get(
      { fileId, alt: "media", supportsAllDrives: true },
      { responseType: "stream", headers: range ? { Range: range } : undefined }
    );

    // Gaxios 7 returns Fetch Headers, not a plain object. Safari needs the
    // actual partial-response status and length for its initial bytes=0-1 probe.
    const contentRange = responseHeader(response.headers, "content-range");
    const contentLength = responseHeader(response.headers, "content-length");
    res.statusCode = response.status;
    if (contentRange) res.setHeader("Content-Range", contentRange);
    if (contentLength) {
      res.setHeader("Content-Length", contentLength);
    } else {
      res.removeHeader("Content-Length");
    }

    response.data.on("error", (error: Error) => {
      console.error("[/api/portfolio-file stream]", error);
      if (!res.headersSent) {
        res.removeHeader("Content-Length");
        res.removeHeader("Content-Range");
        res.status(500).end();
      } else {
        res.destroy(error);
      }
    });
    res.on("close", () => response.data.destroy());
    response.data.pipe(res);
  } catch (error) {
    console.error("[/api/portfolio-file]", error);
    if (!res.headersSent) {
      res.removeHeader("Content-Length");
      res.removeHeader("Content-Range");
      res.setHeader("Cache-Control", "no-store");
      const upstream = error as { response?: { status?: number; headers?: Headers } };
      if (upstream.response?.status === 416) {
        const range = upstream.response.headers?.get("content-range");
        if (range) res.setHeader("Content-Range", range);
        return res.status(416).end();
      }
      return res.status(500).json({ error: "file_fetch_failed" });
    }
  }
}
