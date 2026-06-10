
import React, { useState, useEffect, useRef } from 'react'
import { ComingSoonWaitlist } from './Waitlist'

interface AppleMusicTrack {
  id: string
  name: string
  artistName: string
  albumName: string
  coverUrl: string
}

// A locally-held photo/video the user attaches to the memory. Nothing is
// uploaded anywhere — we keep the File in memory and a blob: object URL purely
// for the in-page preview, and revoke the URLs when the wizard resets.
interface LocalMedia {
  id: string
  url: string
  type: 'image' | 'video'
}

const MAX_MEDIA = 5

// The date step is a native date input → an ISO string like "2019-06-15".
// Render it as a tidy uppercase label ("JUN 15, 2019") for the polaroid; fall
// back to whatever's there if it isn't a parseable ISO date.
function formatMemoryDate(value: string): string {
  if (!value) return ''
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!m) return value.toUpperCase()
  const d = new Date(`${value}T00:00:00`)
  if (Number.isNaN(d.getTime())) return value.toUpperCase()
  return d
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase()
}

type Step = 'search' | 'date' | 'location' | 'memory' | 'outcome'

// Same-origin: we hit /apple-music/* on our OWN domain, never the Worker
// directly. In production a Cloudflare Pages Function
// (functions/apple-music/[[path]].ts) proxies to the backend; in `next dev` a
// dev-only rewrite in next.config.ts does the same. Either way the browser
// makes a same-origin request, so there is no CORS error anywhere.
const API_BASE_URL = ''

export function SongSearchWizard() {
  const [step, setStep] = useState<Step>('search')
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<AppleMusicTrack[]>([])
  const [searchError, setSearchError] = useState<string | null>(null)

  // Selected song & user inputs
  const [selectedSong, setSelectedSong] = useState<AppleMusicTrack | null>(null)
  const [dateVal, setDateVal] = useState('')
  const [dateSkipped, setDateSkipped] = useState(false)
  const [locationVal, setLocationVal] = useState('')
  const [locationSkipped, setLocationSkipped] = useState(false)
  const [memoryVal, setMemoryVal] = useState('')
  const [memorySkipped, setMemorySkipped] = useState(false)
  const [media, setMedia] = useState<LocalMedia[]>([])

  const searchInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const hasMounted = useRef(false)

  // Focus the search input when the user navigates BACK to the search step —
  // but never on the very first mount, and never in a way that scrolls the
  // page. Focusing on mount used to yank the viewport down to this section on
  // load; preventScroll + the mount guard keep the page at the top.
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }
    if (step === 'search' && searchInputRef.current) {
      searchInputRef.current.focus({ preventScroll: true })
    }
  }, [step])

  // Handle Apple Music Catalog search
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const trimmed = query.trim()
    if (trimmed.length < 3) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    setSearchError(null)

    try {
      const url = `${API_BASE_URL}/apple-music/search?term=${encodeURIComponent(trimmed)}&storefront=us`
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error('Failed to fetch songs')
      }
      const data = await res.json()
      const rawSongs = data.results?.songs?.data || []

      const mappedTracks: AppleMusicTrack[] = rawSongs.slice(0, 5).map((song: any) => {
        const attrs = song.attributes || {}
        const artworkUrl = attrs.artwork?.url
          ? attrs.artwork.url.replace('{w}', '300').replace('{h}', '300')
          : 'https://via.placeholder.com/300'
        return {
          id: song.id,
          name: attrs.name || 'Unknown Song',
          artistName: attrs.artistName || 'Unknown Artist',
          albumName: attrs.albumName || 'Unknown Album',
          coverUrl: artworkUrl,
        }
      })

      setSearchResults(mappedTracks)
      if (mappedTracks.length === 0) {
        setSearchError('No songs found matching your search. Try another query.')
      }
    } catch (err) {
      console.error('Search failed:', err)
      setSearchError('Failed to search for songs. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  // Trigger search on typing if length >= 3 (debounced)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length >= 3) {
        handleSearch()
      } else {
        setSearchResults([])
      }
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [query])

  const selectSong = (song: AppleMusicTrack) => {
    setSelectedSong(song)
    setStep('date')
  }

  const handleNext = (field: 'date' | 'location' | 'memory', skipped: boolean) => {
    if (field === 'date') {
      setDateSkipped(skipped)
      setStep('location')
    } else if (field === 'location') {
      setLocationSkipped(skipped)
      setStep('memory')
    } else if (field === 'memory') {
      setMemorySkipped(skipped)
      setStep('outcome')
    }
  }

  const handleBack = () => {
    if (step === 'date') {
      setSelectedSong(null)
      setDateVal('')
      setStep('search')
    } else if (step === 'location') {
      setLocationVal('')
      setStep('date')
    } else if (step === 'memory') {
      setMemoryVal('')
      setStep('location')
    } else if (step === 'outcome') {
      setStep('memory')
    }
  }

  // Add picked files as local previews, capped at MAX_MEDIA total.
  const addMedia = (files: FileList | null) => {
    if (!files || files.length === 0) return
    setMedia((prev) => {
      const room = MAX_MEDIA - prev.length
      if (room <= 0) return prev
      const next = Array.from(files)
        .slice(0, room)
        .filter((f) => f.type.startsWith('image/') || f.type.startsWith('video/'))
        .map((f) => ({
          id: `${f.name}-${f.size}-${f.lastModified}-${Math.random().toString(36).slice(2)}`,
          url: URL.createObjectURL(f),
          type: (f.type.startsWith('video/') ? 'video' : 'image') as LocalMedia['type'],
        }))
      return [...prev, ...next]
    })
    // Reset the input so picking the same file again still fires onChange.
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeMedia = (id: string) => {
    setMedia((prev) => {
      const target = prev.find((m) => m.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((m) => m.id !== id)
    })
  }

  // Revoke any outstanding object URLs when the component unmounts.
  useEffect(() => {
    return () => {
      media.forEach((m) => URL.revokeObjectURL(m.url))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetWizard = () => {
    media.forEach((m) => URL.revokeObjectURL(m.url))
    setStep('search')
    setQuery('')
    setSearchResults([])
    setSelectedSong(null)
    setDateVal('')
    setDateSkipped(false)
    setLocationVal('')
    setLocationSkipped(false)
    setMemoryVal('')
    setMemorySkipped(false)
    setMedia([])
  }

  // Determine if any of the fields were skipped
  const hasForgotDetails = dateSkipped || locationSkipped || memorySkipped || !dateVal.trim() || !locationVal.trim() || !memoryVal.trim()

  return (
    <div className="wizard-container reveal" id="try-it">
      <div className="eyebrow" style={{ justifyContent: 'center' }}>
        <span> Capture the moment</span>
      </div>
      <h2 className="wizard-title text-center">
        Try it: capture a<br />
        song <em>memory.</em>
      </h2>

      <div className="wizard-card">
        {step === 'search' && (
          <div>
            <div className="wizard-label">
              Search for a song you <em>can&apos;t forget.</em>
            </div>
            <form onSubmit={handleSearch} className="wizard-search-box">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Type artist, track name, or lyrics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search songs"
              />
              <span className="search-icon" aria-hidden="true">
                {isSearching ? '...' : '🔍'}
              </span>
            </form>

            {searchError && (
              <div style={{ color: 'var(--ink-50)', fontSize: 13, marginBottom: 16 }}>
                {searchError}
              </div>
            )}

            <div className="wizard-search-results">
              {searchResults.map((song) => (
                <button
                  key={song.id}
                  type="button"
                  className="wizard-search-item"
                  onClick={() => selectSong(song)}
                >
                  <img
                    src={song.coverUrl}
                    alt={song.albumName}
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                  <div className="details">
                    <div className="title">{song.name}</div>
                    <div className="artist">{song.artistName}</div>
                    <div className="album">{song.albumName}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'date' && selectedSong && (
          <div>
            <div className="wizard-header-song">
              <img src={selectedSong.coverUrl} alt="" width="36" height="36" />
              <div>
                <div className="name">{selectedSong.name}</div>
                <div className="artist">{selectedSong.artistName}</div>
              </div>
            </div>

            <div className="wizard-label">
              When did you first <em>listen</em> to this song?
            </div>

            <div className="wizard-input-wrap">
              <input
                type="date"
                className="wizard-text-input wizard-date-input"
                value={dateVal}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDateVal(e.target.value)}
                aria-label="First listened date"
              />
            </div>

            <div className="wizard-actions">
              <button type="button" className="wizard-btn-back" onClick={handleBack}>
                ← Back
              </button>
              <div className="wizard-btn-grp">
                <button
                  type="button"
                  className="wizard-btn-skip"
                  onClick={() => handleNext('date', true)}
                >
                  Don&apos;t remember
                </button>
                <button
                  type="button"
                  className="wizard-btn-continue"
                  disabled={!dateVal.trim()}
                  onClick={() => handleNext('date', false)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'location' && selectedSong && (
          <div>
            <div className="wizard-header-song">
              <img src={selectedSong.coverUrl} alt="" width="36" height="36" />
              <div>
                <div className="name">{selectedSong.name}</div>
                <div className="artist">{selectedSong.artistName}</div>
              </div>
            </div>

            <div className="wizard-label">
              Where <em>were you</em> when you first heard it?
            </div>

            <div className="wizard-input-wrap">
              <input
                type="text"
                className="wizard-text-input"
                placeholder="e.g. Tokyo train station, Queens kitchen..."
                value={locationVal}
                onChange={(e) => setLocationVal(e.target.value)}
                aria-label="First heard location"
              />
            </div>

            <div className="wizard-actions">
              <button type="button" className="wizard-btn-back" onClick={handleBack}>
                ← Back
              </button>
              <div className="wizard-btn-grp">
                <button
                  type="button"
                  className="wizard-btn-skip"
                  onClick={() => handleNext('location', true)}
                >
                  Don&apos;t remember
                </button>
                <button
                  type="button"
                  className="wizard-btn-continue"
                  disabled={!locationVal.trim()}
                  onClick={() => handleNext('location', false)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'memory' && selectedSong && (
          <div>
            <div className="wizard-header-song">
              <img src={selectedSong.coverUrl} alt="" width="36" height="36" />
              <div>
                <div className="name">{selectedSong.name}</div>
                <div className="artist">{selectedSong.artistName}</div>
              </div>
            </div>

            <div className="wizard-label">
              What were you doing when that song <em>clicked</em>?
            </div>

            <div className="wizard-input-wrap">
              <textarea
                className="wizard-text-input wizard-textarea"
                placeholder="Write what you felt or what was happening in your life..."
                value={memoryVal}
                onChange={(e) => setMemoryVal(e.target.value)}
                aria-label="Memory description"
              />
            </div>

            {/* Optional: attach up to 5 photos/videos, kept locally for preview. */}
            <div className="wizard-media">
              <div className="wizard-media-head">
                <span>Add photos or videos <em>(optional)</em></span>
                <span className="wizard-media-count">{media.length}/{MAX_MEDIA}</span>
              </div>

              <div className="wizard-media-grid">
                {media.map((m) => (
                  <div key={m.id} className="wizard-media-tile">
                    {m.type === 'video' ? (
                      <video src={m.url} muted playsInline />
                    ) : (
                      <img src={m.url} alt="" />
                    )}
                    <button
                      type="button"
                      className="wizard-media-remove"
                      aria-label="Remove media"
                      onClick={() => removeMedia(m.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}

                {media.length < MAX_MEDIA && (
                  <button
                    type="button"
                    className="wizard-media-add"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Add photos or videos"
                  >
                    <span className="plus">+</span>
                    <span className="lbl">Upload</span>
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                hidden
                onChange={(e) => addMedia(e.target.files)}
              />
            </div>

            <div className="wizard-actions">
              <button type="button" className="wizard-btn-back" onClick={handleBack}>
                ← Back
              </button>
              <div className="wizard-btn-grp">
                <button
                  type="button"
                  className="wizard-btn-skip"
                  onClick={() => handleNext('memory', true)}
                >
                  Don&apos;t remember
                </button>
                <button
                  type="button"
                  className="wizard-btn-continue"
                  disabled={!memoryVal.trim()}
                  onClick={() => handleNext('memory', false)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'outcome' && selectedSong && (
          <div>
            {hasForgotDetails ? (
              <div className="wizard-outcome-forgot">
                <div className="alert-icon" aria-hidden="true">
                  ⚠️
                </div>
                <p>
                  You forgot the story behind that song, but you will
                  never forget another story behind your songs if you use{' '}
                  <strong>Music Memory.</strong>
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                  <ComingSoonWaitlist />
                  <button type="button" className="wizard-reset-btn" onClick={resetWizard}>
                    ← Search another song
                  </button>
                </div>
              </div>
            ) : (
              <div className="polaroid-outcome-container">
                <div className="polaroid-title">
                  <span>✨</span> Memory preview saved!
                </div>

                <div className="polaroid-card">
                  <div className="polaroid-art-frame">
                    <img src={selectedSong.coverUrl} alt={selectedSong.albumName} />
                  </div>
                  <div className="polaroid-details">
                    <div className="polaroid-song-meta">
                      <div className="name">{selectedSong.name}</div>
                      <div className="artist">{selectedSong.artistName}</div>
                    </div>
                    <div className="polaroid-story">
                      &ldquo;{memoryVal}&rdquo;
                    </div>

                    {media.length > 0 && (
                      <div className="polaroid-media">
                        {media.map((m) => (
                          <div key={m.id} className="polaroid-media-tile">
                            {m.type === 'video' ? (
                              <video src={m.url} muted playsInline />
                            ) : (
                              <img src={m.url} alt="" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="polaroid-footer-meta">
                      <span>{formatMemoryDate(dateVal)}</span>
                      <span className="pin">{locationVal.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 20, color: 'var(--ink)' }}>
                    This memory is ready to be preserved forever.
                  </div>
                  <ComingSoonWaitlist />
                  <button type="button" className="wizard-reset-btn" onClick={resetWizard}>
                    ← Try another song
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step !== 'outcome' && (
          <div className="wizard-steps">
            <span className={`wizard-step-dot ${step === 'search' ? 'active' : ''}`} />
            <span className={`wizard-step-dot ${step === 'date' ? 'active' : step === 'location' || step === 'memory' ? 'completed' : ''}`} />
            <span className={`wizard-step-dot ${step === 'location' ? 'active' : step === 'memory' ? 'completed' : ''}`} />
            <span className={`wizard-step-dot ${step === 'memory' ? 'active' : ''}`} />
          </div>
        )}
      </div>
    </div>
  )
}
export default SongSearchWizard
