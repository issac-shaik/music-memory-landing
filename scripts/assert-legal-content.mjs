import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pagesRoot = path.join(projectRoot, 'src', 'pages')
const supportEmail = 'support@musicmemory.app'

// The spec design identifies these canonical English pages as the repository
// legal sources. App Store Connect locale/URL mappings remain an external gate;
// adding a localized Astro legal source makes this inventory fail until that
// source is explicitly added and given equivalent semantic assertions.
const legalSurfaces = [
  { name: 'Community Guidelines', file: 'community-guidelines.astro', route: '/community-guidelines' },
  { name: 'Delete Account', file: 'delete-account.astro', route: '/delete-account' },
  { name: 'Privacy Policy', file: 'privacy.astro', route: '/privacy' },
  { name: 'Terms of Service', file: 'terms.astro', route: '/terms' },
]

const reportReasons = [
  ['harassment', 'Harassment or bullying'],
  ['hate_speech', 'Hate speech'],
  ['sexual_content', 'Sexual content'],
  ['violence_threats', 'Violence or threats'],
  ['self_harm', 'Self-harm'],
  ['spam_scam', 'Spam or scam'],
  ['impersonation', 'Impersonation'],
  ['copyright_ip', 'Copyright/IP'],
  ['personal_information', 'Personal information'],
  ['other', 'Other'],
]

const failures = []
const fail = (message) => failures.push(message)
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function normalizeText(source) {
  return source
    .replace(/<[^>]+>/gu, ' ')
    .replace(/&(?:apos|#39);/giu, "'")
    .replace(/&(?:ldquo|rdquo|quot);/giu, '"')
    .replace(/&(?:ndash|mdash);/giu, '-')
    .replace(/&amp;/giu, '&')
    .replace(/\s+/gu, ' ')
    .trim()
    .toLowerCase()
}

function requirePattern(page, text, pattern, meaning) {
  if (!pattern.test(text)) fail(`${page}: missing ${meaning}`)
}

function rejectPattern(page, text, pattern, staleMeaning) {
  if (pattern.test(text)) fail(`${page}: contains prohibited stale claim (${staleMeaning})`)
}

async function collectLegalSourceFiles(directory, relative = '') {
  const files = []
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const childRelative = path.join(relative, entry.name)
    if (entry.isDirectory()) {
      files.push(...await collectLegalSourceFiles(path.join(directory, entry.name), childRelative))
    } else if (legalSurfaces.some(({ file }) => file === entry.name)) {
      files.push(childRelative)
    }
  }
  return files.sort()
}

function extractReportReasons(page, source) {
  const list = source.match(/<ul\b[^>]*\bdata-report-reasons\b[^>]*>([\s\S]*?)<\/ul>/iu)
  if (!list) {
    fail(`${page}: missing the marked report-reason list`)
    return []
  }

  return [...list[1].matchAll(
    /<li\b[^>]*\bdata-report-reason="([^"]+)"[^>]*>([\s\S]*?)<\/li>/giu,
  )].map((match) => [match[1], normalizeText(match[2])])
}

const expectedSourceFiles = legalSurfaces.map(({ file }) => file).sort()
const actualSourceFiles = await collectLegalSourceFiles(pagesRoot)
if (JSON.stringify(actualSourceFiles) !== JSON.stringify(expectedSourceFiles)) {
  fail(
    `legal source inventory differs: expected ${expectedSourceFiles.join(', ')}, `
      + `found ${actualSourceFiles.join(', ')}`,
  )
}

const sources = new Map()
for (const surface of legalSurfaces) {
  const source = await fs.readFile(path.join(pagesRoot, surface.file), 'utf8')
  sources.set(surface.file, source)

  const canonicalPattern = new RegExp(
    `canonical=["']${escapeRegExp(surface.route)}["']`,
    'u',
  )
  if (!canonicalPattern.test(source)) {
    fail(`${surface.name}: canonical route must be ${surface.route}`)
  }

  const mailAddresses = [...source.matchAll(/href=["']mailto:([^?"']+)/giu)]
    .map((match) => match[1].toLowerCase())
  if (mailAddresses.length === 0) {
    fail(`${surface.name}: missing visible support mail link`)
  }
  if (mailAddresses.some((address) => address !== supportEmail)) {
    fail(`${surface.name}: support mail link differs from ${supportEmail}`)
  }
  if (!normalizeText(source).includes(supportEmail)) {
    fail(`${surface.name}: visible support address differs from ${supportEmail}`)
  }
}

const deleteAccount = normalizeText(sources.get('delete-account.astro'))
const terms = normalizeText(sources.get('terms.astro'))
const guidelines = normalizeText(sources.get('community-guidelines.astro'))
const privacy = normalizeText(sources.get('privacy.astro'))

for (const [page, text] of [
  ['Delete Account', deleteAccount],
  ['Terms of Service', terms],
]) {
  requirePattern(page, text, /\b(?:14-day|fourteen \(14\) day)\b/u, 'the 14-day pending period')
  requirePattern(page, text, /signing in[^.]{0,100}does not cancel deletion/u, 'sign-in/cancellation separation')
  requirePattern(page, text, /explicit(?:ly)?[^.]{0,120}cancel deletion/u, 'the explicit cancellation action')
  requirePattern(
    page,
    text,
    /subscription cancellation or lapse[^.]{0,120}does not delete[^.]{0,120}visibility/u,
    'subscription memory and visibility retention',
  )
}

for (const [page, source, text] of [
  ['Terms of Service', sources.get('terms.astro'), terms],
  ['Community Guidelines', sources.get('community-guidelines.astro'), guidelines],
]) {
  const actualReasons = extractReportReasons(page, source)
  const expectedReasons = reportReasons.map(([id, label]) => [id, label.toLowerCase()])
  if (JSON.stringify(actualReasons) !== JSON.stringify(expectedReasons)) {
    fail(
      `${page}: report reasons differ from the deployed ten-reason set; `
        + `expected ${JSON.stringify(expectedReasons)}, found ${JSON.stringify(actualReasons)}`,
    )
  }

  requirePattern(page, text, /deterministic prepublication checks/u, 'deterministic prepublication checks')
  requirePattern(page, text, /successful report[^.]{0,160}hide[^.]{0,120}reporter/u, 'reporter-local hiding')
  requirePattern(page, text, /duplicate[^.]{0,100}(?:do not|does not|prevent)/u, 'duplicate-report prevention')
  requirePattern(page, text, /human review/u, 'human review')
}

const staleDeletionClaims = [
  [/simply signing back in/u, 'sign-in cancels deletion'],
  [/deletion may be cancel(?:led|ed) by signing back in/u, 'sign-in cancels deletion'],
  [/cancel(?:led|ed) by signing back in/u, 'sign-in cancels deletion'],
  [/automatically reverted to private/u, 'subscription changes visibility'],
  [/all features are available exclusively to subscribers/u, 'all actions require entitlement'],
  [/there is no free tier/u, 'all actions require entitlement'],
]
for (const [pattern, meaning] of staleDeletionClaims) {
  rejectPattern('Delete Account', deleteAccount, pattern, meaning)
  rejectPattern('Terms of Service', terms, pattern, meaning)
}

const staleModerationClaims = [
  [/\bthresholds?\b/u, 'report-count enforcement'],
  [/\bstrikes?\b/u, 'account strikes'],
  [/forced[- ]private/u, 'report-driven visibility change'],
  [/rolling (?:ninety|90)/u, 'rolling report window'],
  [/automatically lifted/u, 'automatic suspension lifecycle'],
  [/automated suspensions?/u, 'automatic suspension'],
  [/small number of distinct users/u, 'report-count enforcement'],
  [/substantial number of distinct users/u, 'report-count enforcement'],
  [/profanity (?:filter|detection)/u, 'unsupported generic profanity system'],
  [/automatic restriction/u, 'automatic report-driven restriction'],
]
for (const [pattern, meaning] of staleModerationClaims) {
  rejectPattern('Terms of Service', terms, pattern, meaning)
  rejectPattern('Community Guidelines', guidelines, pattern, meaning)
}

requirePattern(
  'Privacy Policy',
  privacy,
  /do not use[^.]{0,160}cross-company tracking/u,
  'the no-tracking statement',
)
requirePattern(
  'Privacy Policy',
  privacy,
  /do not access[^.]{0,100}device(?:'s)? gps/u,
  'the no-device-GPS statement',
)
requirePattern(
  'Privacy Policy',
  privacy,
  /manually search for and select a place/u,
  'the manually selected stored-location distinction',
)

if (failures.length > 0) {
  console.error('Legal content assertions failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log(
    `PASS: ${legalSurfaces.length} canonical legal surfaces satisfy deletion, `
      + `retention, moderation, privacy, report-reason, and support-address contracts.`,
  )
}
