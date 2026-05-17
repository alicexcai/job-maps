import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** GitHub Pages project site: https://<user>.github.io/job-maps/ */
const defaultPagesBase = '/job-maps/'

function normalizeBase(raw: string | undefined): string {
  const value = (raw ?? '/').trim()
  if (value === '/' || value === '') return '/'
  const withLeading = value.startsWith('/') ? value : `/${value}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

const base = normalizeBase(
  process.env.VITE_BASE_PATH ??
    (process.env.GITHUB_ACTIONS === 'true' ? defaultPagesBase : '/'),
)

export default defineConfig({
  plugins: [react()],
  base,
})
