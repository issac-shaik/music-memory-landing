// Cloudflare Pages Function — same-origin proxy for the Music Memory backend.
//
// Why this exists: the wizard fetches the Apple Music catalogue from the
// backend Worker. That Worker only allows CORS for the production origins
// (musicmemory.app / www.musicmemory.app), so a direct browser fetch from
// localhost or a *.pages.dev preview fails CORS. By calling this path on our
// OWN origin and forwarding server-side (where CORS does not apply), the
// browser never makes a cross-origin request and CORS errors disappear
// everywhere.
//
// Matches requests to /apple-music/* (e.g. /apple-music/search?term=...).

const BACKEND_ORIGIN = 'https://musicmemory-backend.issac-shaik.workers.dev'

// Minimal shape of the Pages Functions event context (avoids a dependency on
// @cloudflare/workers-types, which isn't installed).
interface EventContext {
  request: Request
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

export const onRequest = (context: EventContext): Promise<Response> =>
  proxy(context.request)
