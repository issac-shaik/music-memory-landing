// Worker entry for the musicmemory.app deployment (Workers static assets).
//
// The site deploys as a Cloudflare Worker with `[assets] directory = "./out"`
// (see wrangler.toml) — NOT classic Pages — so a `functions/` directory would
// be ignored. This script handles the one dynamic route, /apple-music/*, and
// every other request falls through to the static assets binding.
//
// Why the proxy exists: the song-search wizard fetches the Apple Music
// catalogue from the backend Worker. That Worker only allows CORS for the
// production origins, so a direct browser fetch from previews fails CORS. By
// calling this path on our OWN origin and forwarding server-side (where CORS
// does not apply), the browser never makes a cross-origin request.

const BACKEND_ORIGIN = 'https://musicmemory-backend.issac-shaik.workers.dev'

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
}

async function proxy(request: Request): Promise<Response> {
  const incoming = new URL(request.url)
  // Preserve the full path (/apple-music/...) and query string, swapping only
  // the origin to the backend Worker.
  const target = new URL(incoming.pathname + incoming.search, BACKEND_ORIGIN)

  // Forward the request method/body/headers, but strip hop-by-hop and
  // origin-specific headers so the Worker sees a clean server-to-server call.
  const headers = new Headers(request.headers)
  headers.delete('host')
  headers.delete('origin')
  headers.delete('referer')

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: 'follow',
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body
  }

  const upstream = await fetch(target.toString(), init)

  // Pass the response straight back. It's now same-origin, so no CORS headers
  // are needed; we drop any the Worker set to avoid confusing the browser.
  const respHeaders = new Headers(upstream.headers)
  respHeaders.delete('access-control-allow-origin')
  respHeaders.delete('access-control-allow-methods')
  respHeaders.delete('access-control-allow-headers')

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: respHeaders,
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname.startsWith('/apple-music/')) {
      return proxy(request)
    }
    return env.ASSETS.fetch(request)
  },
}
