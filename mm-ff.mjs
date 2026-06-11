import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  browser: 'firefox',
  executablePath: '/Applications/Firefox.app/Contents/MacOS/firefox',
  headless: true,
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 45000 })
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto' })
await new Promise(r => setTimeout(r, 1200))
await page.evaluate(() => document.getElementById('try-it').scrollIntoView({ block: 'center' }))
await new Promise(r => setTimeout(r, 800))

const r = await page.evaluate(() => {
  const i = document.querySelector('.wizard-search-box input')
  const b = i.getBoundingClientRect()
  const onTop = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2)
  return { x: b.left + b.width / 2, y: b.top + b.height / 2, covered: onTop === i ? 'no' : (onTop?.tagName + '.' + (onTop?.className || '')) }
})
console.log('cover:', JSON.stringify(r.covered))
await page.mouse.click(r.x, r.y)
await new Promise(rs => setTimeout(rs, 300))
await page.keyboard.type('blinding', { delay: 50 })
await new Promise(rs => setTimeout(rs, 500))
const a = await page.evaluate(() => ({
  value: document.querySelector('.wizard-search-box input').value,
  active: document.activeElement?.tagName + '.' + (document.activeElement?.className || ''),
}))
console.log('firefox typed:', JSON.stringify(a))
await browser.close()
