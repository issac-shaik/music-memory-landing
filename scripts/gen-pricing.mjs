// Build-time generator: parses the two App Store Connect price CSVs and emits
// src/data/pricing.generated.ts — a map keyed by ISO-2 country code with the
// local currency and monthly/yearly amounts. Run via `npm run gen:pricing`
// (wired into prebuild). The site is a static export, so prices must be baked
// in at build time rather than fetched at runtime.
//
// Re-run this whenever the CSVs change.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const MONTHLY_CSV = join(ROOT, 'src', 'Starting Price_Monthly.csv')
const YEARLY_CSV = join(ROOT, 'src', 'Starting Price_Yearly.csv')
const OUT = join(ROOT, 'src', 'data', 'pricing.generated.ts')

// Minimal RFC-4180-ish CSV parser (handles quoted fields with commas).
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else inQuotes = false
      } else field += c
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(field); field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field); field = ''
      if (row.length > 1 || row[0] !== '') rows.push(row)
      row = []
    } else field += c
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  return rows
}

// Apple-CSV country name → ISO-3166-1 alpha-2. Covers exactly the names that
// appear in these CSVs (incl. Apple-isms like "China mainland", "Türkiye").
const NAME_TO_ISO = {
  'Afghanistan': 'AF', 'Albania': 'AL', 'Algeria': 'DZ', 'Angola': 'AO', 'Anguilla': 'AI',
  'Antigua and Barbuda': 'AG', 'Argentina': 'AR', 'Armenia': 'AM', 'Australia': 'AU', 'Austria': 'AT',
  'Azerbaijan': 'AZ', 'Bahamas': 'BS', 'Bahrain': 'BH', 'Barbados': 'BB', 'Belarus': 'BY',
  'Belgium': 'BE', 'Belize': 'BZ', 'Benin': 'BJ', 'Bermuda': 'BM', 'Bhutan': 'BT', 'Bolivia': 'BO',
  'Bosnia and Herzegovina': 'BA', 'Botswana': 'BW', 'Brazil': 'BR', 'British Virgin Islands': 'VG',
  'Brunei': 'BN', 'Bulgaria': 'BG', 'Burkina Faso': 'BF', 'Cambodia': 'KH', 'Cameroon': 'CM',
  'Canada': 'CA', 'Cape Verde': 'CV', 'Cayman Islands': 'KY', 'Chad': 'TD', 'Chile': 'CL',
  'China mainland': 'CN', 'Colombia': 'CO', 'Congo, Democratic Republic of the': 'CD',
  'Congo, Republic of the': 'CG', 'Costa Rica': 'CR', 'Côte d’Ivoire': 'CI', 'Croatia': 'HR',
  'Cyprus': 'CY', 'Czech Republic': 'CZ', 'Denmark': 'DK', 'Dominica': 'DM', 'Dominican Republic': 'DO',
  'Ecuador': 'EC', 'Egypt': 'EG', 'El Salvador': 'SV', 'Estonia': 'EE', 'Eswatini': 'SZ', 'Fiji': 'FJ',
  'Finland': 'FI', 'France': 'FR', 'Gabon': 'GA', 'Gambia': 'GM', 'Georgia': 'GE', 'Germany': 'DE',
  'Ghana': 'GH', 'Greece': 'GR', 'Grenada': 'GD', 'Guatemala': 'GT', 'Guinea-Bissau': 'GW',
  'Guyana': 'GY', 'Honduras': 'HN', 'Hong Kong': 'HK', 'Hungary': 'HU', 'Iceland': 'IS', 'India': 'IN',
  'Indonesia': 'ID', 'Iraq': 'IQ', 'Ireland': 'IE', 'Israel': 'IL', 'Italy': 'IT', 'Jamaica': 'JM',
  'Japan': 'JP', 'Jordan': 'JO', 'Kazakhstan': 'KZ', 'Kenya': 'KE', 'Korea, Republic of': 'KR',
  'Kosovo': 'XK', 'Kuwait': 'KW', 'Kyrgyzstan': 'KG', 'Laos': 'LA', 'Latvia': 'LV', 'Lebanon': 'LB',
  'Liberia': 'LR', 'Libya': 'LY', 'Lithuania': 'LT', 'Luxembourg': 'LU', 'Macau': 'MO',
  'Madagascar': 'MG', 'Malawi': 'MW', 'Malaysia': 'MY', 'Maldives': 'MV', 'Mali': 'ML', 'Malta': 'MT',
  'Mauritania': 'MR', 'Mauritius': 'MU', 'Mexico': 'MX', 'Micronesia': 'FM', 'Moldova': 'MD',
  'Mongolia': 'MN', 'Montenegro': 'ME', 'Montserrat': 'MS', 'Morocco': 'MA', 'Mozambique': 'MZ',
  'Myanmar': 'MM', 'Namibia': 'NA', 'Nauru': 'NR', 'Nepal': 'NP', 'Netherlands': 'NL',
  'New Zealand': 'NZ', 'Nicaragua': 'NI', 'Niger': 'NE', 'Nigeria': 'NG', 'North Macedonia': 'MK',
  'Norway': 'NO', 'Oman': 'OM', 'Pakistan': 'PK', 'Palau': 'PW', 'Panama': 'PA',
  'Papua New Guinea': 'PG', 'Paraguay': 'PY', 'Peru': 'PE', 'Philippines': 'PH', 'Poland': 'PL',
  'Portugal': 'PT', 'Qatar': 'QA', 'Romania': 'RO', 'Russia': 'RU', 'Rwanda': 'RW',
  'São Tomé and Príncipe': 'ST', 'Saudi Arabia': 'SA', 'Senegal': 'SN', 'Serbia': 'RS',
  'Seychelles': 'SC', 'Sierra Leone': 'SL', 'Singapore': 'SG', 'Slovakia': 'SK', 'Slovenia': 'SI',
  'Solomon Islands': 'SB', 'South Africa': 'ZA', 'Spain': 'ES', 'Sri Lanka': 'LK',
  'St. Kitts and Nevis': 'KN', 'St. Lucia': 'LC', 'St. Vincent and the Grenadines': 'VC',
  'Suriname': 'SR', 'Sweden': 'SE', 'Switzerland': 'CH', 'Taiwan': 'TW', 'Tajikistan': 'TJ',
  'Tanzania': 'TZ', 'Thailand': 'TH', 'Tonga': 'TO', 'Trinidad and Tobago': 'TT', 'Tunisia': 'TN',
  'Türkiye': 'TR', 'Turkmenistan': 'TM', 'Turks and Caicos Islands': 'TC', 'Uganda': 'UG',
  'Ukraine': 'UA', 'United Arab Emirates': 'AE', 'United Kingdom': 'GB', 'United States': 'US',
  'Uruguay': 'UY', 'Uzbekistan': 'UZ', 'Vanuatu': 'VU', 'Venezuela': 'VE', 'Vietnam': 'VN',
  'Yemen': 'YE', 'Zambia': 'ZM', 'Zimbabwe': 'ZW',
}

function loadPrices(path) {
  const rows = parseCsv(readFileSync(path, 'utf8'))
  const header = rows.shift() // Countries or Regions, Currency Code, Billing Plan, Price, ...
  const map = new Map()
  for (const row of rows) {
    const [country, currency, , price] = row
    if (!country) continue
    map.set(country.trim(), { currency: currency.trim(), price: parseFloat(price) })
  }
  return map
}

const monthly = loadPrices(MONTHLY_CSV)
const yearly = loadPrices(YEARLY_CSV)

const out = {}
const unmapped = []
for (const [country, m] of monthly) {
  const y = yearly.get(country)
  const iso = NAME_TO_ISO[country]
  if (!iso) { unmapped.push(country); continue }
  out[iso] = {
    country,
    currency: m.currency,
    monthly: m.price,
    yearly: y ? y.price : null,
  }
}

if (unmapped.length) {
  console.error('[gen-pricing] Unmapped country names (add to NAME_TO_ISO):')
  for (const n of unmapped) console.error('  -', JSON.stringify(n))
  process.exit(1)
}

const banner = `// AUTO-GENERATED by scripts/gen-pricing.mjs — DO NOT EDIT BY HAND.
// Source: src/Starting Price_Monthly.csv + src/Starting Price_Yearly.csv
// Regenerate with: npm run gen:pricing
`

const body = `export type RegionPrice = {
  country: string
  currency: string
  monthly: number
  yearly: number | null
}

export const PRICING_BY_ISO: Record<string, RegionPrice> = ${JSON.stringify(out, null, 2)}

export const USD_FALLBACK: RegionPrice = PRICING_BY_ISO.US
`

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, banner + '\n' + body)
console.log(`[gen-pricing] Wrote ${Object.keys(out).length} countries → ${OUT.replace(ROOT + '/', '')}`)
