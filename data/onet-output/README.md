# O\*NET sunburst PDFs (embedded copy)

This folder mirrors `data/ONet/output/` from the main **task-analysis** repository so the **webapp** directory can be copied, zipped, or deployed by itself.

- **Populate from the monorepo** (run inside `webapp/` when `../data/ONet/output/` exists):

  ```bash
  npm run copy-onet-from-monorepo
  ```

- **Build** (`npm run build` or `npm run dev`) runs `sync-pdfs`, which copies from **here** (`webapp/data/onet-output/`) into `webapp/public/onet/`. If this folder is empty, sync falls back to `../data/ONet/output/` when you still have the parent repo.

After copying, you can ship only the `webapp/` folder; run `npm ci` and `npm run build` on the target machine (no parent `data/` tree required).
