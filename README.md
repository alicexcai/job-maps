# O\*NET Dashboard (webapp)

Vite + React viewer for the occupation sunburst PDFs.

## Self-contained deploy (this folder only)

1. **Include PDFs inside webapp**  
   From the full repo, inside `webapp/`:

   ```bash
   npm run copy-onet-from-monorepo
   ```

   That fills `data/onet-output/` with the same layout as `task-analysis/data/ONet/output/`.

2. **Build**

   ```bash
   npm ci
   npm run build
   ```

   `sync-pdfs` runs first and copies `data/onet-output/` → `public/onet/` (or uses `../data/ONet/output/` if the embedded folder is still empty).

3. **Deploy** the `dist/` output (or run `npm run preview` to test).  
   PDF URLs use `import.meta.env.BASE_URL`, so if you host under a subpath, set `base` in `vite.config.ts` accordingly.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run copy-onet-from-monorepo` | `../data/ONet/output/` → `data/onet-output/` |
| `npm run sync-pdfs` | `data/onet-output/` (or monorepo fallback) → `public/onet/` |

Manifest of PDF paths: `scripts/onet-pdf-manifest.mjs`.
