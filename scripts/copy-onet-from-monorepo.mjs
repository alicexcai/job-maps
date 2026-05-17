/**
 * One-way copy: repo `../data/ONet/output/` → `webapp/data/onet-output/`
 * Run from the webapp folder when the full task-analysis repo is present, so the webapp
 * folder can be copied or zipped alone and `npm run build` still finds PDFs.
 */
import { mkdir, copyFile, stat } from 'node:fs/promises'
import path from 'node:path'

import { ONET_PDF_REL_PATHS } from './onet-pdf-manifest.mjs'

const webappRoot = path.resolve(import.meta.dirname, '..')
const monorepoOut = path.resolve(webappRoot, '..', 'data', 'ONet', 'output')
const embeddedRoot = path.resolve(webappRoot, 'data', 'onet-output')

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

async function main() {
  const missing = []
  let copied = 0

  for (const rel of ONET_PDF_REL_PATHS) {
    const src = path.resolve(monorepoOut, rel)
    const dest = path.resolve(embeddedRoot, rel)

    if (!(await fileExists(src))) {
      missing.push(rel)
      continue
    }

    await ensureDirForFile(dest)
    await copyFile(src, dest)
    copied += 1
  }

  if (missing.length) {
    console.error(
      [
        'Missing PDFs under ../data/ONet/output (not copied):',
        ...missing.map((m) => `- ${m}`),
      ].join('\n'),
    )
    process.exit(1)
  }

  console.log(`Copied ${copied} PDF(s) into ${path.relative(webappRoot, embeddedRoot)}/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
