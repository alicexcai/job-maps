import { spawnSync } from 'node:child_process'

const base = process.argv[2]
const npmArgs = process.argv.slice(3)

if (!base || npmArgs.length === 0) {
  console.error('Usage: node scripts/run-with-base.mjs <base-path> <npm-script> [...args]')
  process.exit(1)
}

const normalized = base.endsWith('/') ? base : `${base}/`
const result = spawnSync('npm', npmArgs, {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, VITE_BASE_PATH: normalized },
})

process.exit(result.status ?? 1)
