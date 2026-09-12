# Mugahed Al-Maari Portfolio

React + Vite + TypeScript portfolio with a live **My Work / أعمالي** section powered by Google Drive.

## Live Drive structure

```text
My Portfolio
├── Branding
├── Motion Graphic
├── Social Media
├── 3D
└── Other Work
```

Each folder inside a category is treated as one project. See `GOOGLE-DRIVE-SETUP.md` for deployment and Drive permissions.

## Local development

```bash
npm install
npm run dev
```

The frontend can run locally, but the Drive-backed `/api/*` routes are Vercel Serverless Functions. For a full local serverless test, use the Vercel CLI or deploy a preview to Vercel with the required environment variables.

## Build

```bash
npm run build
```
