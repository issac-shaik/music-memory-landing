import { useState, type FormEvent } from 'react'
import { getUiCopy } from '../../data/uiTranslations'

// Backend base URL (Cloudflare Worker). Inlined at build time for the static
// export. Falls back to the production worker host if unset.
const API_BASE_URL =
  import.meta.env.PUBLIC_API_BASE_URL ??
  'https://musicmemory-backend.issac-shaik.workers.dev'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type WaitlistState = 'idle' | 'submitting' | 'success' | 'error'

export function ComingSoonWaitlist() {
  const copy = getUiCopy()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<WaitlistState>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (state === 'submitting') return

    const value = email.trim().toLowerCase()
    if (!EMAIL_RE.test(value)) {
      setState('error')
      setMessage(copy.invalidEmail)
      return
    }

    setState('submitting')
    setMessage('')
    try {
      const res = await fetch(`${API_BASE_URL}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok) {
        setState('success')
        setMessage(
          data?.already
            ? copy.alreadyWaiting
            : copy.joined
        )
        setEmail('')
      } else {
        setState('error')
        setMessage(data?.error || copy.genericError)
      }
    } catch {
      setState('error')
      setMessage(copy.networkError)
    }
  }

  return (
    <div className="waitlist">
      {state === 'success' ? (
        <p className="waitlist-success" role="status">{message}</p>
      ) : (
        <form className="waitlist-form" onSubmit={onSubmit} noValidate>
          <input
            type="email"
            className="waitlist-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state === 'error') setState('idle')
            }}
            aria-label={copy.emailAddress}
            autoComplete="email"
            inputMode="email"
            required
          />
          <button type="submit" className="waitlist-btn" disabled={state === 'submitting'}>
            {state === 'submitting' ? copy.joining : copy.joinWaitlist}
          </button>
        </form>
      )}
      {state === 'error' && <p className="waitlist-error" role="alert">{message}</p>}
    </div>
  )
}

export default ComingSoonWaitlist
