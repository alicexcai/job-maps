import { mkdir, copyFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

import { ONET_COLOR_SCHEME_DIRS, ONET_PDF_REL_PATHS } from './onet-pdf-manifest.mjs'

const repoRoot = path.resolve(import.meta.dirname, '..')
const embeddedDataRoot = path.resolve(repoRoot, 'data', 'onet-output')
const publicRoot = path.resolve(repoRoot, 'public', 'onet')

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

async function dirExists(dirPath) {
  try {
    const s = await stat(dirPath)
    return s.isDirectory()
  } catch {
    return false
  }
}

async function colorSchemesReadyUnder(root) {
  for (const dir of ONET_COLOR_SCHEME_DIRS) {
    const schemeDir = path.resolve(root, 'occupations_relevant', dir)
    if (!(await dirExists(schemeDir))) return false
    const entries = await readdir(schemeDir)
    if (!entries.some((name) => name.endsWith('.pdf'))) return false
  }
  return true
}

async function allPresentUnder(root) {
  for (const rel of ONET_PDF_REL_PATHS) {
    if (!(await fileExists(path.resolve(root, rel)))) return false
  }
  return (await colorSchemesReadyUnder(root))
}

async function syncColorSchemePdfs(srcRoot, destRoot) {
  for (const dir of ONET_COLOR_SCHEME_DIRS) {
    const srcDir = path.resolve(srcRoot, 'occupations_relevant', dir)
    const destDir = path.resolve(destRoot, 'occupations_relevant', dir)
    const entries = await readdir(srcDir)
    for (const name of entries) {
      if (!name.endsWith('.pdf')) continue
      const src = path.resolve(srcDir, name)
      const dest = path.resolve(destDir, name)
      await mkdir(destDir, { recursive: true })
      await copyFile(src, dest)
    }
  }
}

async function main() {
  const embeddedReady = await allPresentUnder(embeddedDataRoot)
  const publicReady = await allPresentUnder(publicRoot)

  if (!embeddedReady && publicReady) {
    console.log('PDFs already in public/onet/; skipping sync.')
    return
  }

  if (!embeddedReady) {
    let firstMissing = null
    for (const rel of ONET_PDF_REL_PATHS) {
      if (!(await fileExists(path.resolve(embeddedDataRoot, rel)))) {
        firstMissing = rel
        break
      }
    }
    console.error(
      [
        'Missing O*NET PDFs under data/onet-output/.',
        'Add PDFs there (see data/onet-output/README.md) or ensure public/onet/ is complete.',
        firstMissing ? `First missing: ${firstMissing}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    process.exit(1)
  }

  console.log('O*NET PDF source: data/onet-output')

  const missing = []

  for (const rel of ONET_PDF_REL_PATHS) {
    const src = path.resolve(embeddedDataRoot, rel)
    const dest = path.resolve(publicRoot, rel)

    if (!(await fileExists(src))) {
      missing.push(rel)
      continue
    }

    await ensureDirForFile(dest)
    await copyFile(src, dest)
  }

  await syncColorSchemePdfs(embeddedDataRoot, publicRoot)

  if (missing.length) {
    console.error(['Missing expected PDFs:', ...missing.map((m) => `- ${m}`)].join('\n'))
    process.exit(1)
  }

  console.log('Synced O*NET PDFs into public/onet/')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
