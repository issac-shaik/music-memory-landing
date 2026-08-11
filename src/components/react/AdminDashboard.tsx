import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'

type AdminRole = 'owner' | 'admin' | 'moderator'
type Tab = 'queue' | 'overview' | 'team'
type QueueStatus = 'needs_review' | 'approved' | 'removed'

interface Props {
  supabaseUrl: string
  supabasePublishableKey: string
}

interface PublicConfig {
  supabaseUrl: string
  supabasePublishableKey: string
}

interface Member {
  user_id: string
  email: string
  role: AdminRole
  invited_by: string | null
  joined_at: string
  revoked_at: string | null
}

interface ReportRow {
  id: string
  reason_code: string
  details: string | null
  created_at: string
}

interface CaseMedia {
  id: string
  type: 'image' | 'video'
  preview_url: string
  created_at: string
}

interface ModerationCase {
  id: string
  target_type: string
  target_id: string
  owner_user_id: string
  status: string
  source: string
  created_at: string
  categories: string[]
  target: Record<string, unknown> | null
  owner: {
    id: string
    username: string | null
    strikes_count: number
    is_suspended: boolean
    is_banned: boolean
  } | null
  reports: ReportRow[]
  media: CaseMedia[]
}

interface Stats {
  entries_today: number
  entries_by_day: Array<{ day: string; count: number }>
  open_cases: number
  oldest_opened_at: string | null
  reports_last_24_hours: number
  decisions_today: number
  average_review_seconds: number
  role: AdminRole
}

interface TeamResponse {
  members: Member[]
  invitations: Array<{
    id: string
    email: string
    role: 'admin' | 'moderator'
    created_at: string
    expires_at: string
  }>
}

class ApiError extends Error {
  constructor(readonly status: number, readonly code?: string, message?: string) {
    super(message || 'Request failed')
  }
}

async function api<T>(
  supabase: SupabaseClient,
  path: string,
  init?: RequestInit,
): Promise<T> {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) throw new ApiError(401, 'signed_out', 'Your session has ended')
  const headers = new Headers(init?.headers)
  headers.set('Authorization', `Bearer ${token}`)
  if (init?.body) headers.set('Content-Type', 'application/json')
  const response = await fetch(`/admin-api${path}`, { ...init, headers })
  const body = await response.json().catch(() => ({})) as {
    error?: string
    code?: string
  } & T
  if (!response.ok) throw new ApiError(response.status, body.code, body.error)
  return body
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong'
}

function formatAge(value: string | null): string {
  if (!value) return 'No waiting cases'
  const milliseconds = Date.now() - new Date(value).getTime()
  const minutes = Math.max(0, Math.floor(milliseconds / 60_000))
  if (minutes < 60) return `${minutes}m waiting`
  const hours = Math.floor(minutes / 60)
  if (hours < 48) return `${hours}h waiting`
  return `${Math.floor(hours / 24)}d waiting`
}

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return 'Not enough data'
  if (seconds < 60) return `${Math.round(seconds)} sec`
  if (seconds < 3600) return `${Math.round(seconds / 60)} min`
  return `${(seconds / 3600).toFixed(1)} hr`
}

function targetPresentation(item: ModerationCase): {
  title: string
  subtitle: string
  content: string
} {
  const target = item.target ?? {}
  const text = (key: string) => typeof target[key] === 'string' ? String(target[key]) : ''
  switch (item.target_type) {
    case 'entry':
      return {
        title: text('song_name') || 'Untitled memory',
        subtitle: [text('artist_name'), text('visibility')].filter(Boolean).join(' · '),
        content: text('journal_text'),
      }
    case 'comment':
      return { title: 'Reported comment', subtitle: 'Community conversation', content: text('content') }
    case 'profile':
      return { title: text('username') ? `@${text('username')}` : 'Reported profile', subtitle: 'Profile', content: text('bio') }
    case 'feature_request':
      return { title: text('title') || 'Feature request', subtitle: 'Community roadmap', content: text('description') }
    case 'feature_request_comment':
      return { title: 'Feature request comment', subtitle: 'Community roadmap', content: text('body') }
    case 'collection':
      return { title: text('name') || 'Collection', subtitle: text('visibility'), content: text('description') }
    default:
      return { title: 'Reported content', subtitle: item.target_type, content: '' }
  }
}

function Gate({
  supabase,
  session,
  onReady,
}: {
  supabase: SupabaseClient
  session: Session | null
  onReady: (member: Member) => void
}) {
  const [stage, setStage] = useState<'checking' | 'signin' | 'enroll' | 'challenge' | 'denied'>('checking')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [factorId, setFactorId] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const processedToken = useRef<string | null>(null)
  const invitationAcceptance = useRef<Promise<void> | null>(null)
  const inviteToken = useMemo(() => {
    if (typeof window === 'undefined') return null
    return new URLSearchParams(window.location.search).get('invite')
  }, [])

  const acceptInvitationOnce = useCallback(async () => {
    if (!inviteToken) return
    invitationAcceptance.current ??= (async () => {
      await api<{ accepted: boolean; role: AdminRole }>(supabase, '/invitations/accept', {
        method: 'POST',
        body: JSON.stringify({ token: inviteToken }),
      })
      const cleanUrl = new URL(window.location.href)
      cleanUrl.searchParams.delete('invite')
      window.history.replaceState({}, '', cleanUrl)
    })().catch((caught) => {
      invitationAcceptance.current = null
      throw caught
    })
    await invitationAcceptance.current
  }, [inviteToken, supabase])

  const finishAccess = useCallback(async () => {
    await acceptInvitationOnce()
    const response = await api<{ member: Member; mfa_required: boolean }>(supabase, '/session')
    if (response.mfa_required) throw new ApiError(403, 'mfa_required', 'Multi-factor authentication is required')
    onReady(response.member)
  }, [acceptInvitationOnce, onReady, supabase])

  const prepareMfa = useCallback(async () => {
    setError('')
    const aal = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    if (aal.error) throw aal.error
    if (aal.data.currentLevel === 'aal2') {
      await finishAccess()
      return
    }
    const listed = await supabase.auth.mfa.listFactors()
    if (listed.error) throw listed.error
    const verified = listed.data.totp.find((factor) => factor.status === 'verified')
    if (verified) {
      setFactorId(verified.id)
      setStage('challenge')
      return
    }
    for (const factor of listed.data.all.filter(
      (item) => item.factor_type === 'totp' && item.status !== 'verified',
    )) {
      await supabase.auth.mfa.unenroll({ factorId: factor.id })
    }
    const enrolled = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'Music Memory review desk',
    })
    if (enrolled.error) throw enrolled.error
    setFactorId(enrolled.data.id)
    setQrCode(enrolled.data.totp.qr_code)
    setSecret(enrolled.data.totp.secret)
    setStage('enroll')
  }, [finishAccess, supabase])

  useEffect(() => {
    if (!session) {
      processedToken.current = null
      setStage('signin')
      return
    }
    if (processedToken.current === session.access_token) return
    processedToken.current = session.access_token
    let cancelled = false
    const check = async () => {
      setStage('checking')
      setError('')
      try {
        if (!inviteToken) {
          const response = await api<{ member: Member; mfa_required: boolean }>(supabase, '/session')
          if (!response.mfa_required) {
            if (!cancelled) onReady(response.member)
            return
          }
        }
        if (!cancelled) await prepareMfa()
      } catch (caught) {
        if (cancelled) return
        if (caught instanceof ApiError && caught.status === 404) setStage('denied')
        else {
          setError(errorMessage(caught))
          setStage('signin')
        }
      }
    }
    void check()
    return () => { cancelled = true }
  }, [inviteToken, onReady, prepareMfa, session, supabase])

  const signIn = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    const result = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    setBusy(false)
    if (result.error) setError(result.error.message)
  }

  const signInWithGoogle = async () => {
    setBusy(true)
    setError('')
    const redirectTo = new URL(window.location.href)
    redirectTo.hash = ''
    const result = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectTo.toString() },
    })
    if (result.error) {
      setError(result.error.message)
      setBusy(false)
    }
  }

  const verifyMfa = async (event: FormEvent) => {
    event.preventDefault()
    if (!/^\d{6}$/u.test(code)) {
      setError('Enter the six-digit code from your authenticator app')
      return
    }
    setBusy(true)
    setError('')
    try {
      const challenge = await supabase.auth.mfa.challenge({ factorId })
      if (challenge.error) throw challenge.error
      const verified = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code,
      })
      if (verified.error) throw verified.error
      processedToken.current = null
      await finishAccess()
    } catch (caught) {
      setError(errorMessage(caught))
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="admin-gate">
      <section className="gate-card" aria-live="polite">
        <img className="gate-mark" src="/adaptive-icon.png" alt="" width="38" height="38" />
        <p className="gate-kicker">Private review desk</p>
        <h1>{stage === 'denied' ? 'No invitation found.' : 'Keep the community safe.'}</h1>

        {stage === 'checking' && <><p className="gate-copy">Verifying your access and session security.</p><div className="loading-line" /></>}

        {stage === 'signin' && (
          <form className="admin-form" onSubmit={signIn}>
            <p className="gate-copy">Owners can use their existing Google account. Invited team members can use the sign-in method connected to their Music Memory account.</p>
            <button className="google-button" type="button" disabled={busy} onClick={() => void signInWithGoogle()}>
              Continue with Google
            </button>
            <div className="auth-divider"><span>or use email and password</span></div>
            <label className="admin-field"><span>Email</span><input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
            <label className="admin-field"><span>Password</span><input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
            {error && <div className="gate-error" role="alert">{error}</div>}
            <button className="primary-button" disabled={busy}>{busy ? 'Signing in…' : 'Continue with email'}</button>
          </form>
        )}

        {stage === 'enroll' && (
          <form className="admin-form" onSubmit={verifyMfa}>
            <p className="gate-copy">Scan this code with an authenticator app. Every moderator must use two-factor authentication.</p>
            <img className="mfa-qr" src={qrCode} alt="Authenticator QR code" />
            <div className="secret-code">Manual key: {secret}</div>
            <label className="admin-field"><span>Six-digit code</span><input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/gu, ''))} /></label>
            {error && <div className="gate-error" role="alert">{error}</div>}
            <button className="primary-button" disabled={busy}>{busy ? 'Verifying…' : 'Verify and enter'}</button>
          </form>
        )}

        {stage === 'challenge' && (
          <form className="admin-form" onSubmit={verifyMfa}>
            <p className="gate-copy">Enter the current code from your authenticator app.</p>
            <label className="admin-field"><span>Six-digit code</span><input autoFocus inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/gu, ''))} /></label>
            {error && <div className="gate-error" role="alert">{error}</div>}
            <button className="primary-button" disabled={busy}>{busy ? 'Verifying…' : 'Open review desk'}</button>
          </form>
        )}

        {stage === 'denied' && (
          <>
            <p className="gate-copy">This account is not a member of the moderation team. Access can only be granted through a single-use invitation.</p>
            <button className="quiet-button" onClick={() => void supabase.auth.signOut()}>Sign out</button>
          </>
        )}
      </section>
    </main>
  )
}

function Dashboard({
  supabase,
  member,
}: {
  supabase: SupabaseClient
  member: Member
}) {
  const [tab, setTab] = useState<Tab>('queue')
  const [queueStatus, setQueueStatus] = useState<QueueStatus>('needs_review')
  const [cases, setCases] = useState<ModerationCase[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [team, setTeam] = useState<TeamResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [actingCase, setActingCase] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'admin' | 'moderator'>('moderator')
  const [inviteStatus, setInviteStatus] = useState('')
  const canManageTeam = member.role === 'owner' || member.role === 'admin'

  const loadStats = useCallback(async () => {
    try {
      const response = await api<Stats>(supabase, '/stats?days=14')
      setStats(response)
    } catch (caught) {
      setError(errorMessage(caught))
    }
  }, [supabase])

  const loadQueue = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api<{ cases: ModerationCase[] }>(
        supabase,
        `/moderation?status=${queueStatus}&limit=30`,
      )
      setCases(response.cases)
    } catch (caught) {
      setError(errorMessage(caught))
    } finally {
      setLoading(false)
    }
  }, [queueStatus, supabase])

  const loadTeam = useCallback(async () => {
    if (!canManageTeam) return
    try {
      setTeam(await api<TeamResponse>(supabase, '/team'))
    } catch (caught) {
      setError(errorMessage(caught))
    }
  }, [canManageTeam, supabase])

  useEffect(() => { void loadStats() }, [loadStats])
  useEffect(() => { if (tab === 'queue') void loadQueue() }, [loadQueue, tab])
  useEffect(() => { if (tab === 'team') void loadTeam() }, [loadTeam, tab])

  const decide = async (item: ModerationCase, action: 'approve' | 'remove') => {
    if (action === 'remove' && !window.confirm(`Remove this ${item.target_type.replaceAll('_', ' ')} from shared areas?`)) return
    setActingCase(item.id)
    setError('')
    try {
      await api(supabase, `/moderation/${item.id}/decision`, {
        method: 'POST',
        body: JSON.stringify({
          action,
          reason_code: action === 'approve'
            ? 'reviewed_safe'
            : item.reports[0]?.reason_code || 'community_guidelines',
        }),
      })
      setCases((current) => current.filter((candidate) => candidate.id !== item.id))
      await loadStats()
    } catch (caught) {
      setError(errorMessage(caught))
    } finally {
      setActingCase('')
    }
  }

  const invite = async (event: FormEvent) => {
    event.preventDefault()
    setInviteStatus('Sending invitation…')
    try {
      await api(supabase, '/invitations', {
        method: 'POST',
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      })
      setInviteEmail('')
      setInviteStatus('Invitation sent. It expires in 48 hours.')
      await loadTeam()
    } catch (caught) {
      setInviteStatus(errorMessage(caught))
    }
  }

  const revokeInvite = async (id: string) => {
    if (!window.confirm('Revoke this invitation?')) return
    try {
      await api(supabase, `/invitations/${id}`, { method: 'DELETE' })
      await loadTeam()
    } catch (caught) {
      setError(errorMessage(caught))
    }
  }

  const revokeMember = async (target: Member) => {
    if (!window.confirm(`Remove dashboard access for ${target.email}?`)) return
    try {
      await api(supabase, `/team/${target.user_id}`, { method: 'DELETE' })
      await loadTeam()
    } catch (caught) {
      setError(errorMessage(caught))
    }
  }

  const navItems: Array<{ id: Tab; label: string }> = [
    { id: 'queue', label: 'Review queue' },
    { id: 'overview', label: 'Activity' },
    ...(canManageTeam ? [{ id: 'team' as const, label: 'Team access' }] : []),
  ]
  const headings: Record<Tab, { title: string; copy: string }> = {
    queue: { title: 'Review desk', copy: 'Reports and appeals, oldest first.' },
    overview: { title: 'Daily pulse', copy: 'First-party activity and moderation workload.' },
    team: { title: 'Trusted access', copy: 'Invitation-only roles with enforced MFA.' },
  }
  const heading = headings[tab]

  return (
    <div className="admin-frame">
      <aside className="admin-rail">
        <div className="admin-brand">
          <img className="admin-brand-mark" src="/adaptive-icon.png" alt="" width="38" height="38" />
          <div><strong>Music Memory</strong><span>Safety desk</span></div>
        </div>
        <nav className="admin-nav" aria-label="Admin sections">
          {navItems.map((item) => (
            <button key={item.id} aria-current={tab === item.id ? 'page' : undefined} onClick={() => setTab(item.id)}>{item.label}</button>
          ))}
        </nav>
        <div className="rail-session">
          <p>{member.email}<br />{member.role}</p>
          <button className="quiet-button" onClick={() => void supabase.auth.signOut()}>Sign out</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div><h1>{heading.title}</h1><p>{heading.copy}</p></div>
          <div className="header-clock">UTC operational day · {new Date().toLocaleDateString(undefined, { dateStyle: 'medium' })}</div>
        </header>

        {error && <p className="inline-error" role="alert">{error}</p>}

        {tab === 'queue' && (
          <>
            <section className="stats-strip" aria-label="Moderation summary">
              <div className="stat-cell"><span>Waiting</span><strong>{stats?.open_cases ?? '—'}</strong></div>
              <div className="stat-cell"><span>Reports, 24h</span><strong>{stats?.reports_last_24_hours ?? '—'}</strong></div>
              <div className="stat-cell"><span>Decided today</span><strong>{stats?.decisions_today ?? '—'}</strong></div>
              <div className="stat-cell"><span>Oldest</span><strong style={{ fontSize: 23 }}>{formatAge(stats?.oldest_opened_at ?? null)}</strong></div>
            </section>
            <div className="queue-toolbar" aria-label="Queue status">
              {([
                ['needs_review', 'Needs review'],
                ['approved', 'Approved'],
                ['removed', 'Removed'],
              ] as Array<[QueueStatus, string]>).map(([value, label]) => (
                <button key={value} aria-pressed={queueStatus === value} onClick={() => setQueueStatus(value)}>{label}</button>
              ))}
              <button onClick={() => void loadQueue()}>Refresh</button>
            </div>
            {loading && <div className="loading-line" />}
            {!loading && cases.length === 0 && (
              <div className="empty-desk"><strong>The desk is clear.</strong><span>No cases in this view.</span></div>
            )}
            <section className="review-list" aria-label="Moderation cases">
              {cases.map((item) => {
                const presentation = targetPresentation(item)
                return (
                  <article className="review-card" key={item.id}>
                    <div className="review-playhead" aria-hidden="true" />
                    <div className="review-body">
                      <div className="review-meta">
                        <span className="review-pill">{item.target_type.replaceAll('_', ' ')}</span>
                        <span>{item.reports.length} {item.reports.length === 1 ? 'report' : 'reports'}</span>
                        <span>·</span>
                        <span>{formatAge(item.created_at)}</span>
                        <span>·</span>
                        <span>@{item.owner?.username || 'unknown'}</span>
                        {(item.owner?.strikes_count ?? 0) > 0 && <span className="review-pill">{item.owner?.strikes_count} strikes</span>}
                      </div>
                      <h2>{presentation.title}</h2>
                      <p className="review-subtitle">{presentation.subtitle}</p>
                      {presentation.content && <div className="memory-copy">{presentation.content}</div>}
                      {item.reports.length > 0 && (
                        <div className="report-ledger">
                          {item.reports.map((report) => (
                            <div className="report-line" key={report.id}>
                              <strong>{report.reason_code.replaceAll('_', ' ')}</strong>
                              <span>{report.details || 'No additional details'}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.media.length > 0 && (
                        <div className="media-grid">
                          {item.media.map((media) => (
                            <figure className="media-frame" key={media.id}>
                              {media.type === 'video'
                                ? <video controls preload="metadata" src={media.preview_url}>Video preview unavailable.</video>
                                : <img loading="lazy" src={media.preview_url} alt="User-uploaded content under review" />}
                              <figcaption>{media.type} · preview expires in five minutes</figcaption>
                            </figure>
                          ))}
                        </div>
                      )}
                      {queueStatus === 'needs_review' && (
                        <div className="review-actions">
                          <button className="remove-button" disabled={actingCase === item.id} onClick={() => void decide(item, 'remove')}>Remove from community</button>
                          <button className="approve-button" disabled={actingCase === item.id} onClick={() => void decide(item, 'approve')}>{actingCase === item.id ? 'Saving…' : 'Keep published'}</button>
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </section>
          </>
        )}

        {tab === 'overview' && (
          <>
            <section className="stats-strip" aria-label="Activity summary">
              <div className="stat-cell"><span>Entries today</span><strong>{stats?.entries_today ?? '—'}</strong></div>
              <div className="stat-cell"><span>Reports, 24h</span><strong>{stats?.reports_last_24_hours ?? '—'}</strong></div>
              <div className="stat-cell"><span>Average review</span><strong style={{ fontSize: 23 }}>{formatDuration(stats?.average_review_seconds ?? 0)}</strong></div>
              <div className="stat-cell"><span>Queue depth</span><strong>{stats?.open_cases ?? '—'}</strong></div>
            </section>
            <section className="chart-panel">
              <div className="panel-heading"><h2>Entries created</h2><span>Last 14 UTC days</span></div>
              <div className="entry-chart" role="img" aria-label="Entries created per day">
                {(stats?.entries_by_day ?? []).map((point) => {
                  const maximum = Math.max(1, ...(stats?.entries_by_day ?? []).map((candidate) => Number(candidate.count)))
                  const height = Math.max(2, (Number(point.count) / maximum) * 100)
                  return (
                    <div className="chart-column" key={point.day} title={`${point.day}: ${point.count} entries`}>
                      <div className="chart-bar" style={{ height: `${height}%` }} />
                      <span>{new Date(`${point.day}T00:00:00Z`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    </div>
                  )
                })}
              </div>
            </section>
          </>
        )}

        {tab === 'team' && canManageTeam && (
          <section className="team-panel">
            <div className="panel-heading"><h2>Moderation team</h2><span>Access requires an invitation and MFA</span></div>
            <div className="team-grid">
              <form className="team-form admin-form" onSubmit={invite}>
                <label className="admin-field"><span>Email</span><input type="email" required value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="moderator@example.com" /></label>
                <label className="admin-field"><span>Role</span><select value={inviteRole} onChange={(event) => setInviteRole(event.target.value as 'admin' | 'moderator')}><option value="moderator">Moderator</option>{member.role === 'owner' && <option value="admin">Administrator</option>}</select></label>
                <button className="primary-button">Send invitation</button>
                {inviteStatus && <div className={inviteStatus.startsWith('Invitation sent') ? 'gate-success' : 'gate-error'}>{inviteStatus}</div>}
              </form>
              <div>
                <p className="utility-label" style={{ marginTop: 0 }}>Active members</p>
                <div className="team-list">
                  {(team?.members ?? []).map((item) => (
                    <div className="team-row" key={item.user_id}>
                      <div><strong>{item.email}</strong><span>Joined {new Date(item.joined_at).toLocaleDateString()}</span></div>
                      <div className="role-chip">{item.role}</div>
                      {item.role !== 'owner' && item.user_id !== member.user_id && (member.role === 'owner' || item.role === 'moderator')
                        ? <button className="text-button" onClick={() => void revokeMember(item)}>Remove access</button>
                        : <span />}
                    </div>
                  ))}
                </div>
                {(team?.invitations.length ?? 0) > 0 && <p className="utility-label">Pending invitations</p>}
                <div className="team-list">
                  {(team?.invitations ?? []).map((item) => (
                    <div className="team-row" key={item.id}>
                      <div><strong>{item.email}</strong><span>Expires {new Date(item.expires_at).toLocaleString()}</span></div>
                      <div className="role-chip">{item.role}</div>
                      <button className="text-button" onClick={() => void revokeInvite(item.id)}>Revoke</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default function AdminDashboard({ supabaseUrl, supabasePublishableKey }: Props) {
  const [publicConfig, setPublicConfig] = useState<PublicConfig | null>(() => (
    supabaseUrl && supabasePublishableKey
      ? { supabaseUrl, supabasePublishableKey }
      : null
  ))
  const [configReady, setConfigReady] = useState(Boolean(publicConfig))
  const [configError, setConfigError] = useState('')

  useEffect(() => {
    if (publicConfig) return
    let mounted = true
    void fetch('/admin-config', { headers: { Accept: 'application/json' } })
      .then(async (response) => {
        const body = await response.json().catch(() => ({})) as Partial<PublicConfig> & { error?: string }
        if (!response.ok || !body.supabaseUrl || !body.supabasePublishableKey) {
          throw new Error(body.error || 'The review desk configuration is unavailable')
        }
        if (mounted) setPublicConfig({
          supabaseUrl: body.supabaseUrl,
          supabasePublishableKey: body.supabasePublishableKey,
        })
      })
      .catch((caught) => {
        if (mounted) setConfigError(errorMessage(caught))
      })
      .finally(() => {
        if (mounted) setConfigReady(true)
      })
    return () => { mounted = false }
  }, [publicConfig])

  const supabase = useMemo(() => {
    if (!publicConfig) return null
    return createClient(publicConfig.supabaseUrl, publicConfig.supabasePublishableKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  }, [publicConfig])
  const [session, setSession] = useState<Session | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [member, setMember] = useState<Member | null>(null)

  useEffect(() => {
    if (!supabase) return
    let mounted = true
    void supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session)
        setAuthReady(true)
      }
    })
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession)
        if (!nextSession) setMember(null)
        setAuthReady(true)
      }
    })
    return () => {
      mounted = false
      data.subscription.unsubscribe()
    }
  }, [supabase])

  if (!configReady) {
    return <main className="admin-gate"><section className="gate-card"><p className="gate-kicker">Private review desk</p><h1>Connecting securely.</h1><div className="loading-line" /></section></main>
  }
  if (!supabase) {
    return (
      <main className="admin-gate"><section className="gate-card"><p className="gate-kicker">Configuration required</p><h1>The review desk is not connected.</h1><p className="gate-copy">{configError || 'Set the review desk Supabase configuration in Cloudflare.'}</p></section></main>
    )
  }
  if (!authReady) {
    return <main className="admin-gate"><section className="gate-card"><p className="gate-kicker">Private review desk</p><h1>Checking your session.</h1><div className="loading-line" /></section></main>
  }
  if (!member) return <Gate supabase={supabase} session={session} onReady={setMember} />
  return <Dashboard supabase={supabase} member={member} />
}
