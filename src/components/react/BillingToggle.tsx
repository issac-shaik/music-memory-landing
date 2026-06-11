import { useState } from 'react'
import { usePricing } from './usePricing'

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
              Regional pricing applied
            </div>
          )}

          <div className="plan-head">
            <div className="plan-name">
              Music Memory
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
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault()
              scrollToSelector('#waitlist')
            }}
          >
            Join the waitlist
          </a>

          <div className="plan-region">
            {(pricing.status === 'detecting' || pricing.status === 'locating') && (
              <span className="region-note">Detecting your region…</span>
            )}
            {pricing.status === 'resolved' && pricing.isRegional && (
              <span className="region-note">Showing {pricing.countryName} pricing</span>
            )}
            {pricing.status === 'resolved' && !pricing.isRegional && (
              <button type="button" className="region-link" onClick={pricing.requestLocation}>
                Showing standard (USD) pricing — use my precise location
              </button>
            )}
            {(pricing.status === 'denied' || pricing.status === 'error') && (
              <span className="region-note">Showing standard (USD) pricing</span>
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5l3.2 3.2L13 4.8" />
    </svg>
  )
}

export default BillingToggle
