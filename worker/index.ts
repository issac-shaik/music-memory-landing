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
  SUPABASE_URL?: string
  SUPABASE_PUBLISHABLE_KEY?: string
}

// Cloudflare adds request.cf with the visitor's IP-derived ISO country. This
// lets the page show regional pricing WITHOUT a browser location prompt.
// `cf` is absent in some local dev modes, so callers must tolerate null.
function geo(request: Request): Response {
  const cf = (request as Request & { cf?: { country?: string } }).cf
  const country = cf?.country ?? null
  return new Response(JSON.stringify({ country }), {
    headers: {
      'content-type': 'application/json',
      // Per-visitor value — never let a CDN/browser cache one user's country
      // for another.
      'cache-control': 'no-store',
    },
  })
}

function adminConfig(env: Env): Response {
  if (!env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY) {
    return new Response(JSON.stringify({ error: 'Review desk configuration is unavailable' }), {
      status: 503,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store',
      },
    })
  }
  return new Response(JSON.stringify({
    supabaseUrl: env.SUPABASE_URL,
    supabasePublishableKey: env.SUPABASE_PUBLISHABLE_KEY,
  }), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  })
}

async function proxy(request: Request, rewrittenPath?: string): Promise<Response> {
  const incoming = new URL(request.url)
  // Preserve the full path (/apple-music/...) and query string, swapping only
  // the origin to the backend Worker.
  const target = new URL((rewrittenPath ?? incoming.pathname) + incoming.search, BACKEND_ORIGIN)

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

    // Canonical host: 301 www.musicmemory.app/* -> musicmemory.app/*, preserving
    // path + query. The apex is the canonical in every <link rel="canonical">,
    // so collapsing the www duplicate here keeps host-level URLs single-source.
    if (url.hostname === 'www.musicmemory.app') {
      url.hostname = 'musicmemory.app'
      return Response.redirect(url.toString(), 301)
    }

    if (url.pathname === '/geo') {
      return geo(request)
    }

    if (url.pathname === '/admin-config') {
      return adminConfig(env)
    }

    if (url.pathname.startsWith('/apple-music/')) {
      return proxy(request)
    }
    if (url.pathname === '/admin-api' || url.pathname.startsWith('/admin-api/')) {
      const adminPath = `/v1/admin${url.pathname.slice('/admin-api'.length)}`
      return proxy(request, adminPath)
    }
    return env.ASSETS.fetch(request)
  },
}
