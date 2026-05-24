import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure modern JS output (no legacy polyfills)
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
