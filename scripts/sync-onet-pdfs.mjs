import { mkdir, copyFile, stat } from 'node:fs/promises'
import path from 'node:path'

import { ONET_PDF_REL_PATHS } from './onet-pdf-manifest.mjs'

const webappRoot = path.resolve(import.meta.dirname, '..')
/** Self-contained bundle inside the webapp folder (for deploy-this-folder-only). */
const embeddedDataRoot = path.resolve(webappRoot, 'data', 'onet-output')
/** Full monorepo layout: task-analysis/data/ONet/output */
const monorepoDataRoot = path.resolve(webappRoot, '..', 'data', 'ONet', 'output')
const publicRoot = path.resolve(webappRoot, 'public', 'onet')

async function ensureDirForFile(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true })
}

async function fileExists(filePath) {
  try {
    const s = await stat(filePath)
    return s.isFile()
  } catch {
    return false
  }
}

async function pickDataRoot() {
  const probe = path.resolve(embeddedDataRoot, ONET_PDF_REL_PATHS[0])
  if (await fileExists(probe)) {
    return { root: embeddedDataRoot, label: 'webapp/data/onet-output' }
  }
  return { root: monorepoDataRoot, label: '../data/ONet/output (monorepo)' }
}

async function main() {
  const { root: dataRoot, label } = await pickDataRoot()
  console.log(`O*NET PDF source: ${label}`)

  const missing = []

  for (const rel of ONET_PDF_REL_PATHS) {
    const src = path.resolve(dataRoot, rel)
    const dest = path.resolve(publicRoot, rel)

    if (!(await fileExists(src))) {
      missing.push(rel)
      continue
    }

    await ensureDirForFile(dest)
    await copyFile(src, dest)
  }

  if (missing.length) {
    console.error(
      [
        'Missing expected PDFs (skipping copy). Populate webapp/data/onet-output/ or run:',
        '  npm run copy-onet-from-monorepo',
        'when the parent task-analysis repo is available.',
        'Missing:',
        ...missing.map((m) => `- ${m}`),
      ].join('\n'),
    )
    process.exit(1)
  }

  console.log('Synced O*NET PDFs into webapp/public/onet/')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
