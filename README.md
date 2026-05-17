# O\*NET Dashboard

Vite + React static site for occupation sunburst PDFs. Production output is plain HTML/CSS/JS in `dist/` (no server runtime).

## Build locally

```bash
npm ci
npm run build
npm run preview
```

Open the URL Vite prints (default `http://localhost:4173/`).

## Deploy to GitHub Pages

This repo is set up for a **project site** at `https://alicexcai.github.io/job-maps/`.

1. In the repo on GitHub: **Settings → Pages → Build and deployment → Source** → **GitHub Actions**.
2. Push to `main`. The workflow `.github/workflows/deploy-pages.yml` runs `npm run build` with `VITE_BASE_PATH=/job-maps/` and publishes `dist/`.

To test the Pages base path locally:

```bash
npm run build:pages
npm run preview:pages
```

For another host or subpath, set `VITE_BASE_PATH` when building (must start and end with `/`, e.g. `/my-app/`).

## PDF data

PDFs live in `data/onet-output/` and are copied to `public/onet/` on build (`npm run sync-pdfs`). If `public/onet/` is already complete, sync is skipped.

Layout matches the manifest in `scripts/onet-pdf-manifest.mjs`.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Sync PDFs, then Vite dev server |
| `npm run build` | Sync, typecheck, static build → `dist/` |
| `npm run build:pages` | Build with `/job-maps/` base (GitHub Pages) |
| `npm run preview` | Serve `dist/` locally |
