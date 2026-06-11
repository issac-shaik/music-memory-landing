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
  )
}

export default FaqPricingAnswer
