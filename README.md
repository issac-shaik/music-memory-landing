# musicmemory-landing

Marketing site for [Music Memory](https://musicmemory.app) — the music journal
& song diary app. Built with **Astro 5** as a fully static, crawler-first site:
every page is plain HTML at build time, and React loads only for the four
interactive islands (waitlist form, pricing toggle, FAQ pricing answer, and the
song-search wizard).

## Stack

- **Astro 5** (static output → `./out`)
- **React 19** islands via `@astrojs/react` (`client:idle` / `client:visible`)
- **Tailwind CSS 4** via `@tailwindcss/vite` (most styling is the hand-written
  design system in `src/styles/global.css`; the "Liner Notes" theme is scoped
  under `body.liner` at the end of that file)
- **Fontsource** variable fonts (Newsreader + Hanken Grotesk, self-hosted)

## Commands

| Command           | Action                                            |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Dev server (proxies `/apple-music/*` to the Worker) |
| `npm run build`   | Regenerates pricing data, builds to `./out`       |
| `npm run preview` | Preview the production build                      |
| `npm run pages:dev` | Serve `./out` through Wrangler (Pages Functions active) |

`npm run gen:pricing` rebuilds `src/data/pricing.generated.ts` from the two
CSVs in `src/` (it also runs automatically before `dev` and `build`).

## Deploy

Pushing to `main` auto-deploys via Cloudflare Pages (build command
`npm run build`, output directory `out`). `functions/apple-music/[[path]].ts`
is a Pages Function that proxies the song-search wizard's API calls to the
backend Worker so the browser only ever makes same-origin requests.

## SEO

- Per-page titles/descriptions/canonicals + Open Graph/Twitter cards in
  `src/layouts/BaseLayout.astro`
- JSON-LD: Organization + WebSite on every page; MobileApplication,
  SoftwareApplication, FAQPage on the home page (FAQ content lives in
  `src/data/faq.ts` so the visible FAQ and the structured data never drift)
- Hand-maintained `public/sitemap.xml` (update `lastmod` + add entries when
  adding pages), `public/robots.txt` (search + AI crawlers welcomed),
  `public/llms.txt`
- Keyword pages: `/faq`, `/music-journal-app`, `/song-diary-app`
