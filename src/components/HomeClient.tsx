'use client'

import { useEffect, useState } from 'react'
import { usePricing } from './usePricing'

export function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -2% 0px' }
    )
    // Use requestIdleCallback to avoid blocking main thread
    const schedule = typeof requestIdleCallback !== 'undefined' ? requestIdleCallback : (cb: () => void) => setTimeout(cb, 1)
    schedule(() => {
      document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    })
    return () => io.disconnect()
  }, [])
}

export function useDriftFloaters() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.float-card'))
    if (!cards.length) return
    type Meta = { card: HTMLElement; baseRotate: number; period: number; amp: number; start: number; visible: boolean }
    const metas: Meta[] = cards.map((c, i) => ({
      card: c,
      baseRotate: (Math.random() - 0.5) * 6,
      period: 9000 + i * 1700,
      amp: 4 + (i % 3) * 2,
      start: performance.now() - Math.random() * (9000 + i * 1700),
      visible: false,
    }))

    let raf = 0
    let running = false
    const tick = (now: number) => {
      let any = false
      for (const m of metas) {
        if (!m.visible) continue
        any = true
        const phase = ((now - m.start) % m.period) / m.period
        const y = Math.sin(phase * Math.PI * 2) * m.amp
        const x = Math.cos(phase * Math.PI * 2) * (m.amp * 0.4)
        m.card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${m.baseRotate.toFixed(2)}deg)`
      }
      if (any) {
        raf = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const m = metas.find((x) => x.card === e.target)
        if (m) m.visible = e.isIntersecting
      }
      if (!running && metas.some((m) => m.visible)) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    })
    metas.forEach((m) => io.observe(m.card))

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])
}

export function useStoryProgress() {
  const [activeStep, setActiveStep] = useState(0)
  useEffect(() => {
    const frames = Array.from(
      document.querySelectorAll<HTMLElement>('.story-wf .story-frame')
    )
    if (!frames.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = frames.indexOf(e.target as HTMLElement)
            if (idx >= 0) setActiveStep(idx)
          }
        })
      },
      { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
    )
    frames.forEach((f) => io.observe(f))
    return () => io.disconnect()
  }, [])
  return activeStep
}

function scrollToSelector(sel: string) {
  const el = document.querySelector(sel)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function BillingToggle() {
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual')
  const pricing = usePricing()

  const amount = billing === 'annual' ? pricing.yearly : pricing.monthly
  const anchor = billing === 'annual' ? pricing.anchorYearly : pricing.anchorMonthly
  const per = billing === 'annual' ? '/year' : '/month'

  return (
    <>
      <div className="billing-toggle-wrap">
        <div className="billing-toggle" role="tablist" aria-label="Billing period">
          <button
            role="tab"
            aria-selected={billing === 'annual'}
            className={billing === 'annual' ? 'on' : ''}
            onClick={() => setBilling('annual')}
          >
            Annual
            <span className="save">3-day free trial</span>
          </button>
          <button
            role="tab"
            aria-selected={billing === 'monthly'}
            className={billing === 'monthly' ? 'on' : ''}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="pricing-solo">
        <div className="plan plan-pro plan-solo">
          <div className="plan-ribbon">Full access</div>

          {pricing.isIndia && (
            <div className="region-banner" role="status">
              <span className="region-dot">◉</span>
              Regional pricing applied
            </div>
          )}

          <div className="plan-head">
            <div className="plan-name">
              Music Memory <span className="mark">◉</span>
            </div>
            <div className="plan-price">
              {anchor && <span className="anchor">{anchor}</span>}
              <span className="amount">{amount}</span>
              <span className="per">{per}</span>
            </div>
            <div className="plan-tag">
              {billing === 'annual'
                ? '3-day free trial, then billed yearly · cancel anytime'
                : 'Billed monthly · cancel anytime'}
            </div>
          </div>

          <ul className="plan-list">
            <li className="yes hl"><span className="ic"><CheckIcon /></span>Unlimited song memories</li>
            <li className="yes"><span className="ic"><CheckIcon /></span>Write what the song means to you &amp; when you first heard it</li>
            <li className="yes hl"><span className="ic"><CheckIcon /></span>Attach photos &amp; videos to any memory</li>
            <li className="yes hl"><span className="ic"><CheckIcon /></span>Tag the place where you first heard it</li>
            <li className="yes hl"><span className="ic"><CheckIcon /></span>Share your memories to the song&apos;s public feed</li>
            <li className="yes hl"><span className="ic"><CheckIcon /></span>Read how others remember the same song</li>
            <li className="yes"><span className="ic"><CheckIcon /></span>Add custom songs not on Apple Music</li>
            <li className="yes"><span className="ic"><CheckIcon /></span>Organise memories into collections</li>
            <li className="yes"><span className="ic"><CheckIcon /></span>Daily streak tracking</li>
          </ul>

          <a
            className="plan-cta primary"
            href="#download"
            onClick={(e) => {
              e.preventDefault()
              scrollToSelector('#download')
            }}
          >
            {billing === 'annual' ? 'Start 3-day free trial' : `Subscribe · ${amount}/mo`}
          </a>

          <div className="plan-region">
            {pricing.status === 'idle' && (
              <button type="button" className="region-link" onClick={pricing.requestLocation}>
                See pricing for your country
              </button>
            )}
            {pricing.status === 'locating' && <span className="region-note">Detecting your region…</span>}
            {pricing.status === 'resolved' && pricing.isRegional && (
              <span className="region-note">Showing {pricing.countryName} pricing</span>
            )}
            {pricing.status === 'resolved' && !pricing.isRegional && (
              <span className="region-note">Showing standard pricing</span>
            )}
            {(pricing.status === 'denied' || pricing.status === 'error') && (
              <button type="button" className="region-link" onClick={pricing.requestLocation}>
                Couldn&apos;t detect region — show prices in USD. Try again
              </button>
            )}
          </div>

          <div className="plan-fine">
            Billed through the App Store / Google Play. Prices shown in your local currency where available.
          </div>
        </div>
      </div>
    </>
  )
}

export function HeroBadges() {
  return (
    <div className="hero-badges">
      <a className="store-badge sb-ios" href="#download" onClick={(e) => { e.preventDefault(); scrollToSelector('.cta-wf') }} aria-label="Download on the App Store">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg" alt="Download on the App Store" width="135" height="44" />
      </a>
      <a className="store-badge sb-android" href="#download" onClick={(e) => { e.preventDefault(); scrollToSelector('.cta-wf') }} aria-label="Get it on Google Play">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/GetItOnGooglePlay_Badge_Web_color_English.svg" alt="Get it on Google Play" width="152" height="44" />
      </a>
    </div>
  )
}

export function StoryProgress({ steps }: { steps: string[] }) {
  const activeStep = useStoryProgress()
  return (
    <div className="progress">
      {steps.map((label, i) => (
        <div key={i} className={`step${i <= activeStep ? ' on' : ''}`}>
          <span className="dot"></span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

export function ClientEffects() {
  useReveal()
  useDriftFloaters()
  return null
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5l3.2 3.2L13 4.8" />
    </svg>
  )
}

