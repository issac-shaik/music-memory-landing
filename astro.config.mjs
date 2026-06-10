// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

// Backend Worker that the song-search wizard talks to. In production we never
// hit this directly from the browser — the same-origin Cloudflare Pages
// Function at functions/apple-music/[[path]].ts proxies to it. In `astro dev`
// there are no Pages Functions, so the Vite dev server proxies the same path
// to the Worker instead. Either way the browser only ever makes a same-origin
// request, so there is no CORS anywhere.
const BACKEND_ORIGIN =
  process.env.PUBLIC_API_BASE_URL ??
  'https://musicmemory-backend.issac-shaik.workers.dev'

export default defineConfig({
  site: 'https://musicmemory.app',
  // Cloudflare Pages is configured to publish ./out (the old Next export
  // directory) — keep emitting there so the deploy settings stay untouched.
  outDir: './out',
  // Emit /privacy.html instead of /privacy/index.html so URLs keep the exact
  // shape the old Next export had (/privacy serves 200, no trailing-slash
  // redirect) and keep matching the canonicals + sitemap entries.
  build: { format: 'file' },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/apple-music': {
          target: BACKEND_ORIGIN,
          changeOrigin: true,
        },
      },
    },
  },
})
