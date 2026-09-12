# Google Drive live portfolio setup

The portfolio now reads work from this Drive structure:

```text
My Portfolio
├── Branding
│   ├── Project 01
│   │   ├── cover.jpg
│   │   ├── 01.jpg
│   │   └── video.mp4
│   └── Project 02
├── Motion Graphic
├── Social Media
├── 3D
└── Other Work
```

## 1. Share the folder with the service account

Open the **My Portfolio** folder in Google Drive and share it with the same service-account email used by Rebune Media Library. Viewer access is enough.

## 2. Copy the folder ID

When the folder URL is:

`https://drive.google.com/drive/folders/ABC123XYZ`

The folder ID is `ABC123XYZ`.

## 3. Add Vercel environment variables

In Vercel > Project > Settings > Environment Variables add:

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_PORTFOLIO_FOLDER_ID`

If the first two already exist in the Rebune deployment, use the same values here. `GOOGLE_PORTFOLIO_FOLDER_ID` must point to **My Portfolio**.

## 4. Naming rule

- Every folder directly under **My Portfolio** becomes a filter/category.
- Every folder inside a category becomes a project card.
- The project folder name becomes the project title.
- `cover.jpg`, `cover.png`, `thumbnail.*`, `thumb.*`, `poster.*`, or `غلاف.*` is preferred as the project cover.
- If no explicit cover exists, the first image is used; otherwise the first video.
- Supported portfolio media: images, videos, PDF, GLB, GLTF.

## 5. Updating the portfolio

Upload/delete/replace files in Drive. The website metadata cache is only 30 seconds. The page also has a **Refresh** button to force a fresh metadata request immediately.

No source-code edit is required when adding new categories or projects.
