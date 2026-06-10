import { usePricing } from './usePricing'

export function FaqPricingAnswer() {
  const pricing = usePricing()
  return (
    <div className="a">
      <p>
        No — Music Memory is a subscription. You get a <strong>3-day free
          trial</strong>, then Pro is {pricing.monthly}/month or {pricing.yearly}/year.
        Pro includes unlimited memories, photos and videos, location tagging,
        and access to the public song memory feed.
      </p>
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
  )
}

export default FaqPricingAnswer
