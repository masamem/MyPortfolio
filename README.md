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

## Services page

A bilingual Services page is available at `/services` and uses the existing portfolio visual system. It includes:
- Creative service cards
- Video editing packages in SAR
- Arabic/English language support
- Contact CTAs that return to the homepage contact section

`vercel.json` includes a rewrite so `/services` works when opened directly on Vercel.
