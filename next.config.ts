import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

// Backend Worker that the song-search wizard talks to. In production we never
// hit this directly from the browser — the same-origin Cloudflare Pages Function
// at functions/apple-music/[[path]].ts proxies to it. In `next dev` there are no
// Pages Functions, so we rewrite the same path to the Worker here instead.
// `rewrites()` is ignored by `output: 'export'` builds, so this is dev-only.
const BACKEND_ORIGIN =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://musicmemory-backend.issac-shaik.workers.dev'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure modern JS output (no legacy polyfills)
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  ...(isDev
    ? {
        async rewrites() {
          return [
            {
              source: '/apple-music/:path*',
              destination: `${BACKEND_ORIGIN}/apple-music/:path*`,
            },
          ]
        },
      }
    : {}),
}

export default nextConfig
