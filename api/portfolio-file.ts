import { google } from "googleapis";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const fileId = String(req.query.id || "");
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!fileId) return res.status(400).json({ error: "missing_file_id" });
  if (!email || !rawKey) return res.status(500).json({ error: "missing_credentials" });

  try {
    const auth = new google.auth.JWT({
      email,
      key: rawKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
    const drive = google.drive({ version: "v3", auth });

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
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("Content-Disposition", `inline; filename*=UTF-8''${encodeURIComponent(fileName)}`);

    if (meta.data.size) res.setHeader("Content-Length", meta.data.size);
    if (req.method === "HEAD") return res.status(200).end();

    const range = typeof req.headers.range === "string" ? req.headers.range : undefined;
    const response = await drive.files.get(
      { fileId, alt: "media", supportsAllDrives: true },
      { responseType: "stream", headers: range ? { Range: range } : undefined }
    );

    const headers = response.headers as Record<string, string | undefined>;
    if (headers["content-range"]) {
      res.statusCode = 206;
      res.setHeader("Content-Range", headers["content-range"]);
    }
    if (headers["content-length"]) res.setHeader("Content-Length", headers["content-length"]);

    response.data.on("error", (error: Error) => {
      console.error("[/api/portfolio-file stream]", error);
      if (!res.headersSent) res.status(500).end();
    });
    response.data.pipe(res);
  } catch (error) {
    console.error("[/api/portfolio-file]", error);
    if (!res.headersSent) return res.status(500).json({ error: "file_fetch_failed" });
  }
}
