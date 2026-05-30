'use client'

import { useCallback, useMemo, useState } from 'react'
import { PRICING_BY_ISO, USD_FALLBACK, type RegionPrice } from '../data/pricing.generated'

export type GeoStatus = 'idle' | 'locating' | 'resolved' | 'denied' | 'error'

// "Anchor" (pre-discount) prices we strike through to show the regional
// discount. Apple's standard non-discounted tiers for these markets.
const ANCHOR_BY_ISO: Record<string, { monthly: number; yearly: number }> = {
  IN: { monthly: 949, yearly: 4999 },
}

function format(currency: string, amount: number): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      // Whole-number currencies (JPY, KRW…) and tiers like ₹399 read cleaner
      // without forced decimals; keep cents for .99 prices.
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    // Unknown currency code → fall back to a plain prefixed amount.
    return `${currency} ${amount}`
  }
}

export type PricingView = {
  status: GeoStatus
  /** The price set currently shown (regional once resolved, else USD base). */
  price: RegionPrice
  /** True when we've resolved to a non-US region with its own currency. */
  isRegional: boolean
  /** True specifically for India (gets the prominent regional-pricing badge). */
  isIndia: boolean
  countryName: string | null
  monthly: string
  yearly: string
  /** Struck-through anchor prices when a discount applies (India), else null. */
  anchorMonthly: string | null
  anchorYearly: string | null
  /** Trigger the browser location prompt + reverse-geocode. */
  requestLocation: () => void
}

export function usePricing(): PricingView {
  const [status, setStatus] = useState<GeoStatus>('idle')
  const [iso, setIso] = useState<string | null>(null)

  const requestLocation = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setStatus('error')
      return
    }
    setStatus('locating')
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
          const data = await res.json()
          const code: string | undefined = data?.countryCode
          if (code && PRICING_BY_ISO[code]) {
            setIso(code)
            setStatus('resolved')
          } else {
            // Resolved a country we don't have a tier for → keep USD base.
            setStatus('resolved')
          }
        } catch {
          setStatus('error')
        }
      },
      () => setStatus('denied'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    )
  }, [])

  return useMemo<PricingView>(() => {
    const price = (iso && PRICING_BY_ISO[iso]) || USD_FALLBACK
    const isIndia = iso === 'IN'
    const isRegional = !!iso && iso !== 'US' && price.currency !== 'USD'
    const anchor = iso ? ANCHOR_BY_ISO[iso] : undefined

    return {
      status,
      price,
      isRegional,
      isIndia,
      countryName: iso ? price.country : null,
      monthly: format(price.currency, price.monthly),
      yearly: price.yearly != null ? format(price.currency, price.yearly) : '—',
      anchorMonthly: anchor ? format(price.currency, anchor.monthly) : null,
      anchorYearly: anchor ? format(price.currency, anchor.yearly) : null,
      requestLocation,
    }
  }, [status, iso, requestLocation])
}
