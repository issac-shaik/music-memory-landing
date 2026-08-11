import fs from 'node:fs/promises'
import path from 'node:path'
import { parse, serialize } from 'parse5'

const projectRoot = process.cwd()
const outputDir = path.join(projectRoot, 'out')
const publicDir = path.join(projectRoot, 'public')
const cacheDir = path.join(projectRoot, 'src', 'data', 'site-translations')
const siteUrl = 'https://musicmemory.app'

const languages = {
  de: 'German',
  es: 'Spanish',
  fr: 'French',
  it: 'Italian',
  ja: 'Japanese',
  pt: 'Portuguese',
  zh: 'Simplified Chinese',
}

const skipTags = new Set(['script', 'style', 'svg', 'noscript', 'code', 'pre'])
const translatedAttributes = new Set(['aria-label', 'alt', 'title', 'placeholder'])
const legalPages = new Set(['terms.html', 'privacy.html', 'community-guidelines.html', 'delete-account.html'])
let bingSession

const getAttribute = (node, name) => node.attrs?.find((attribute) => attribute.name === name)?.value

const setAttribute = (node, name, value) => {
  node.attrs ??= []
  const attribute = node.attrs.find((item) => item.name === name)
  if (attribute) attribute.value = value
  else node.attrs.push({ name, value })
}

const removeAttribute = (node, name) => {
  if (node.attrs) node.attrs = node.attrs.filter((attribute) => attribute.name !== name)
}

const setElementText = (node, value) => {
  const textNode = (node.childNodes ?? []).find((child) => child.nodeName === '#text')
  if (textNode) textNode.value = value
  else {
    node.childNodes ??= []
    node.childNodes.push({ nodeName: '#text', value, parentNode: node })
  }
}

const isTranslationProtected = (node) =>
  getAttribute(node, 'translate') === 'no' || getAttribute(node, 'data-language-picker') !== undefined

const walk = (node, visitor, state = { skipped: false }) => {
  const skipped = state.skipped || skipTags.has(node.tagName) || isTranslationProtected(node)
  visitor(node, skipped)
  for (const child of node.childNodes ?? []) walk(child, visitor, { skipped })
}

const normalizeText = (value) => value.trim().replace(/\s+/g, ' ')

const collectStrings = (document, strings) => {
  walk(document, (node, skipped) => {
    if (skipped) return
    if (node.nodeName === '#text') {
      const value = normalizeText(node.value)
      if (value.length > 1 && value !== 'Music Memory') strings.add(value)
    }

    for (const attribute of node.attrs ?? []) {
      if (translatedAttributes.has(attribute.name)) {
        const value = normalizeText(attribute.value)
        if (value.length > 1 && value !== 'Music Memory') strings.add(value)
      }
    }

    const isDescription =
      node.tagName === 'meta' &&
      ['description', 'og:title', 'og:description', 'og:image:alt', 'twitter:title', 'twitter:description'].includes(
        getAttribute(node, 'name') ?? getAttribute(node, 'property')
      )
    if (isDescription) {
      const value = normalizeText(getAttribute(node, 'content') ?? '')
      if (value.length > 1) strings.add(value)
    }
  })
}

const chunkStrings = (strings, maxLength = 3900) => {
  const chunks = []
  let current = []
  let length = 0
  for (const value of strings) {
    const addition = value.length + 24
    if (current.length && length + addition > maxLength) {
      chunks.push(current)
      current = []
      length = 0
    }
    current.push(value)
    length += addition
  }
  if (current.length) chunks.push(current)
  return chunks
}

const createBingSession = async () => {
  const response = await fetch('https://www.bing.com/translator')
  const html = await response.text()
  const ig = html.match(/IG:"([^"]+)"/)?.[1]
  const iid = html.match(/data-iid="(translator\.\d+)"/)?.[1]
  const prevention = html.match(/params_AbusePreventionHelper\s*=\s*\[(\d+),"([^"]+)"/) 
  if (!ig || !iid || !prevention) throw new Error('Unable to initialize the Bing translation fallback')
  const cookies = response.headers
    .getSetCookie()
    .map((cookie) => cookie.split(';', 1)[0])
    .join('; ')
  return { ig, iid, key: prevention[1], token: prevention[2], cookies }
}

const translateChunkWithBing = async (values, language) => {
  bingSession ??= await createBingSession()
  const input = values.map((value, index) => `${value}\n__MMSEP_${index}__`).join('\n')
  const body = new URLSearchParams({
    fromLang: 'en',
    to: language === 'zh' ? 'zh-Hans' : language,
    text: input,
    token: bingSession.token,
    key: bingSession.key,
    tryFetchingGenderDebiasedTranslations: 'true',
  })
  const response = await fetch(
    `https://www.bing.com/ttranslatev3?isVertical=1&IG=${bingSession.ig}&IID=${bingSession.iid}.1`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        cookie: bingSession.cookies,
        origin: 'https://www.bing.com',
        referer: 'https://www.bing.com/translator',
      },
      body,
    }
  )
  const payload = await response.json()
  const translated = payload?.[0]?.translations?.[0]?.text
  if (!translated) throw new Error('Bing translation fallback did not return translated text')
  const parts = translated.split(/__MMSEP_\d+__/).map((part) => part.trim())
  if (parts.length < values.length) {
    if (values.length === 1) return [translated.trim()]
    const midpoint = Math.ceil(values.length / 2)
    return [
      ...(await translateChunkWithBing(values.slice(0, midpoint), language)),
      ...(await translateChunkWithBing(values.slice(midpoint), language)),
    ]
  }
  return parts.slice(0, values.length)
}

const translateChunkWithChrome = async (values, language) => {
  const input = values.map((value, index) => `${value}\n__MMSEP_${index}__`).join('\n')
  const response = await fetch(
    `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=${language === 'zh' ? 'zh-CN' : language}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: new URLSearchParams({ q: input }),
    }
  )
  if (!response.ok) return translateChunkWithBing(values, language)
  const payload = await response.json()
  const translated = Array.isArray(payload) ? payload.join('') : ''
  if (!translated) return translateChunkWithBing(values, language)
  const parts = translated.split(/__MMSEP_\d+__/).map((part) => part.trim())
  if (parts.length < values.length) {
    if (values.length === 1) return [translated.trim()]
    const midpoint = Math.ceil(values.length / 2)
    return [
      ...(await translateChunkWithChrome(values.slice(0, midpoint), language)),
      ...(await translateChunkWithChrome(values.slice(midpoint), language)),
    ]
  }
  return parts.slice(0, values.length)
}

const translateChunk = async (values, language, attempt = 1) => {
  const input = values.map((value, index) => `${value}\n__MMSEP_${index}__`).join('\n')
  const body = new URLSearchParams({ q: input })
  const response = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${language}&dt=t`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body,
    }
  )

  if (!response.ok) {
    if (response.status === 429 && language === 'zh') {
      return translateChunkWithChrome(values, language)
    }
    if (attempt < 4) {
      const delay = response.status === 429 ? attempt * 10_000 : attempt * 900
      await new Promise((resolve) => setTimeout(resolve, delay))
      return translateChunk(values, language, attempt + 1)
    }
    throw new Error(`Translation request failed for ${language}: ${response.status}`)
  }

  const payload = await response.json()
  const translated = (payload[0] ?? []).map((part) => part[0] ?? '').join('')
  const parts = translated.split(/__MMSEP_\d+__/).map((part) => part.trim())
  if (parts.length < values.length) {
    if (values.length === 1) return [translated.trim()]
    const midpoint = Math.ceil(values.length / 2)
    return [
      ...(await translateChunk(values.slice(0, midpoint), language)),
      ...(await translateChunk(values.slice(midpoint), language)),
    ]
  }
  return parts.slice(0, values.length)
}

const loadCache = async (language) => {
  try {
    return JSON.parse(await fs.readFile(path.join(cacheDir, `${language}.json`), 'utf8'))
  } catch {
    return {}
  }
}

const saveCache = async (language, cache) => {
  await fs.mkdir(cacheDir, { recursive: true })
  const ordered = Object.fromEntries(Object.entries(cache).sort(([left], [right]) => left.localeCompare(right)))
  await fs.writeFile(path.join(cacheDir, `${language}.json`), `${JSON.stringify(ordered, null, 2)}\n`)
}

const translateMissing = async (language, strings, cache) => {
  const missing = [...strings].filter((value) => !cache[value])
  const chunks = chunkStrings(missing)
  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index]
    const translated = await translateChunk(chunk, language)
    chunk.forEach((value, valueIndex) => {
      cache[value] = translated[valueIndex] || value
    })
    // Persist each successful batch so transient translation-service limits can
    // be resumed without retranslating already completed legal copy.
    await saveCache(language, cache)
    process.stdout.write(`\r[translate:${language}] ${index + 1}/${chunks.length} batches`)
  }
  if (chunks.length) process.stdout.write('\n')
  await saveCache(language, cache)
}

const applyTranslations = (document, translations) => {
  walk(document, (node, skipped) => {
    if (skipped) return
    if (node.nodeName === '#text') {
      const normalized = normalizeText(node.value)
      if (translations[normalized]) {
        const leading = node.value.match(/^\s*/)?.[0] ?? ''
        const trailing = node.value.match(/\s*$/)?.[0] ?? ''
        node.value = `${leading}${translations[normalized]}${trailing}`
      }
    }

    for (const attribute of node.attrs ?? []) {
      if (translatedAttributes.has(attribute.name)) {
        const normalized = normalizeText(attribute.value)
        if (translations[normalized]) attribute.value = translations[normalized]
      }
    }

    const metaKey = getAttribute(node, 'name') ?? getAttribute(node, 'property')
    if (
      node.tagName === 'meta' &&
      ['description', 'og:title', 'og:description', 'og:image:alt', 'twitter:title', 'twitter:description'].includes(metaKey)
    ) {
      const content = normalizeText(getAttribute(node, 'content') ?? '')
      if (translations[content]) setAttribute(node, 'content', translations[content])
    }
  })
}

const localizeDocumentMetadata = (document, language, pageName) => {
  walk(document, (node) => {
    if (node.tagName === 'html') setAttribute(node, 'lang', language)
    if (node.tagName === 'link' && getAttribute(node, 'rel') === 'canonical') {
      const route = pageName === 'index.html' ? '/' : `/${pageName.replace(/\.html$/, '')}`
      setAttribute(node, 'href', `${siteUrl}/${language}${route}`)
    }
    if (node.tagName === 'meta' && getAttribute(node, 'property') === 'og:url') {
      const route = pageName === 'index.html' ? '/' : `/${pageName.replace(/\.html$/, '')}`
      setAttribute(node, 'content', `${siteUrl}/${language}${route}`)
    }
    if (node.tagName === 'meta' && getAttribute(node, 'property') === 'og:locale') {
      setAttribute(node, 'content', language === 'zh' ? 'zh_CN' : `${language}_${language.toUpperCase()}`)
    }

    if (node.tagName === 'a') {
      const href = getAttribute(node, 'href')
      const isLanguageOption = getAttribute(node, 'data-language') !== undefined
      const alreadyLocalized = /^\/(de|es|fr|it|ja|pt|zh)(?=\/|$)/.test(href ?? '')
      if (href?.startsWith('/') && !href.startsWith('/_') && !isLanguageOption && !alreadyLocalized) {
        setAttribute(node, 'href', `/${language}${href === '/' ? '/' : href}`)
      }
    }

    if (node.tagName === 'details' && getAttribute(node, 'data-language-picker') !== undefined) {
      walk(node, (pickerNode) => {
        if (pickerNode.tagName === 'summary') {
          const label = (pickerNode.childNodes ?? []).find((child) => child.tagName === 'span')
          if (label) setElementText(label, language.toUpperCase())
        }
        if (pickerNode.tagName === 'a' && getAttribute(pickerNode, 'data-language')) {
          const selected = getAttribute(pickerNode, 'data-language') === language
          if (selected) setAttribute(pickerNode, 'aria-current', 'page')
          else removeAttribute(pickerNode, 'aria-current')
          const check = (pickerNode.childNodes ?? []).find(
            (child) => child.tagName === 'span' && getAttribute(child, 'class') === 'language-check'
          )
          if (check) setElementText(check, selected ? '✓' : '')
        }
      })
    }
  })
}

const injectTranslationNotice = (document, language) => {
  const notices = {
    de: 'Diese Übersetzung dient der besseren Verständlichkeit. Bei Abweichungen ist die englische Fassung maßgeblich.',
    es: 'Esta traducción se ofrece para facilitar la comprensión. En caso de discrepancia, prevalece la versión en inglés.',
    fr: 'Cette traduction est fournie pour faciliter la compréhension. En cas de divergence, la version anglaise prévaut.',
    it: 'Questa traduzione è fornita per agevolare la comprensione. In caso di discrepanze, prevale la versione inglese.',
    ja: 'この翻訳は理解を助けるために提供されています。相違がある場合は英語版が優先されます。',
    pt: 'Esta tradução é fornecida para facilitar a compreensão. Em caso de divergência, prevalece a versão em inglês.',
    zh: '本翻译仅为便于理解而提供。如有任何差异，以英文版本为准。',
  }
  let heading
  walk(document, (node, skipped) => {
    if (!heading && !skipped && node.tagName === 'h1') heading = node
  })
  const parent = heading?.parentNode
  if (!parent) return
  const index = parent.childNodes.indexOf(heading)
  const fragment = parse(`<p class="translation-notice" role="note">${notices[language]}</p>`)
  const notice = fragment.childNodes[0].childNodes[1].childNodes[0]
  notice.parentNode = parent
  parent.childNodes.splice(index + 1, 0, notice)
}

// The moderation dashboard is an invitation-only operational surface, not a
// storefront page. Keep one canonical English route and do not duplicate it
// into the public locale directories.
const files = (await fs.readdir(outputDir)).filter(
  (file) => file.endsWith('.html') && file !== 'admin.html'
)
const sources = new Map()
const strings = new Set()

for (const file of files) {
  const document = parse(await fs.readFile(path.join(outputDir, file), 'utf8'))
  sources.set(file, document)
  collectStrings(document, strings)
}

console.log(`[translate] ${files.length} pages, ${strings.size} unique strings`)

for (const [language, label] of Object.entries(languages)) {
  const cache = await loadCache(language)
  await translateMissing(language, strings, cache)
  const destination = path.join(publicDir, language)
  await fs.mkdir(destination, { recursive: true })

  for (const [file, source] of sources) {
    const document = parse(serialize(source))
    applyTranslations(document, cache)
    localizeDocumentMetadata(document, language, file)
    if (legalPages.has(file)) injectTranslationNotice(document, language)
    await fs.writeFile(path.join(destination, file), serialize(document))
  }
  console.log(`[translate] Wrote ${label} pages to public/${language}`)
}
