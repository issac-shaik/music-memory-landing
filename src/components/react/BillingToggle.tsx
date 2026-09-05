import { useState } from 'react'
import { usePricing } from './usePricing'
import { getUiCopy } from '../../data/uiTranslations'

function scrollToSelector(sel: string) {
  const el = document.querySelector(sel)
  if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
}

export function BillingToggle() {
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual')
  const pricing = usePricing()
  const copy = getUiCopy()

  const amount = billing === 'annual' ? pricing.yearly : pricing.monthly
  const anchor = billing === 'annual' ? pricing.anchorYearly : pricing.anchorMonthly
  const per = billing === 'annual' ? copy.perYear : copy.perMonth

  return (
    <>
      <div className="billing-toggle-wrap">
        <div className="billing-toggle" role="tablist" aria-label={copy.billingPeriod}>
          <button
            role="tab"
            aria-selected={billing === 'annual'}
            className={billing === 'annual' ? 'on' : ''}
            onClick={() => setBilling('annual')}
          >
            {copy.annual}
            <span className="save">{copy.freeTrial}</span>
          </button>
          <button
            role="tab"
            aria-selected={billing === 'monthly'}
            className={billing === 'monthly' ? 'on' : ''}
            onClick={() => setBilling('monthly')}
          >
            {copy.monthly}
          </button>
        </div>
      </div>

      <div className="pricing-solo">
        <div className="plan plan-pro plan-solo">
          <div className="plan-ribbon">{copy.fullAccess}</div>

          {pricing.isIndia && (
            <div className="region-banner" role="status">
              {copy.regionalPricing}
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
                ? copy.annualTerms
                : copy.monthlyTerms}
            </div>
          </div>

          <ul className="plan-list">
            {copy.features.map((feature, index) => (
              <li className={index === 1 || index >= 6 ? 'yes' : 'yes hl'} key={feature}>
                <span className="ic"><CheckIcon /></span>{feature}
              </li>
            ))}
          </ul>

          <a
            className="plan-cta primary"
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault()
              scrollToSelector('#waitlist')
            }}
          >
            {copy.joinWaitlist}
          </a>

          <div className="plan-region">
            {(pricing.status === 'detecting' || pricing.status === 'locating') && (
              <span className="region-note">{copy.detectingRegion}</span>
            )}
            {pricing.status === 'resolved' && pricing.isRegional && (
              <span className="region-note">{copy.showingCountryPricing(pricing.countryName ?? '')}</span>
            )}
            {pricing.status === 'resolved' && !pricing.isRegional && (
              <button type="button" className="region-link" onClick={pricing.requestLocation}>
                {copy.usePreciseLocation}
              </button>
            )}
            {(pricing.status === 'denied' || pricing.status === 'error') && (
              <span className="region-note">{copy.standardPricing}</span>
            )}
          </div>

          <div className="plan-fine">
            {copy.billingFinePrint}
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
