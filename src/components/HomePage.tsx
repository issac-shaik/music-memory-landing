'use client'

import { useEffect, useState } from 'react'

const SONGS = [
  "Stay close, stay quiet",
  "Window seat",
  "Five o'clock light",
  "All the way home",
  "Late at the corner",
  "Mid August",
  "Long way around",
  "Three blocks east",
  "Halfway there yet",
  "The kind of rain",
  "Last train, first light",
  "Holding pattern",
  "Soft month",
  "Pier 14",
  "Sun loop",
  "Until we forget",
  "Empty apartment",
  "Salt air",
  "Marker on the wall",
  "Half a cigarette",
]

const ARTISTS = [
  "K. Vermillion",
  "Sun Choir",
  "Page Forty",
  "Atlas Mode",
  "Distant Sons",
  "Lake Theory",
  "Coriander",
  "Quiet Ferry",
  "Lower Sky",
  "Sand Hours",
  "Auburn Park",
  "Otter & Eel",
  "Two Field",
  "Slow Carbon",
  "Lyra Mae",
  "Verra",
  "Outlanding",
  "Halsey Park",
  "Nine Coast",
  "Plain Air",
]

const COLLECTIONS = [
  "Quiet years",
  "First apartments",
  "End of August",
  "Long drives",
]

let _si = 0
let _ai = 0
let _ci = 0
const song = () => SONGS[_si++ % SONGS.length]
const artist = () => ARTISTS[_ai++ % ARTISTS.length]
const collection = () => COLLECTIONS[_ci++ % COLLECTIONS.length]

function resetCounters() {
  _si = 0
  _ai = 0
  _ci = 0
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5l3.2 3.2L13 4.8" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  )
}

function Avatar({ seed }: { seed: string }) {
  const url = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear&backgroundColor=ff6500,1a0a00,3b82f6,f4f1ec`
  return <img className="av" src={url} alt="" loading="lazy" />
}

function PhoneFrame({ width }: { width?: string | number }) {
  return (
    <div className="phone-frame" style={width ? { width } : undefined}>
      <div className="screen">
        <div className="ios-status">
          <span>11:22</span>
          <span className="r"><span className="wifi"></span><span className="batt"></span></span>
        </div>
        <div className="scroller">
          <div className="month">March 2026</div>
          <div className="entries cols-2">
            <div className="entry"><div className="dl">MON 02 MAR</div><div className="card"><div className="cv"></div><div className="meta"><div className="song">{song()}</div><div className="artist">{artist()}</div><div className="date">3/2/2026</div><div className="snip">"Walked home in the rain on purpose..."</div></div></div></div>
            <div className="entry"><div className="dl">MON 02 MAR</div><div className="card"><div className="cv"></div><div className="meta"><div className="song">{song()}</div><div className="artist">{artist()}</div><div className="date">3/2/2026</div><div className="snip">"Found this in a friend's car..."</div></div></div></div>
          </div>
          <div className="month">February 2026</div>
          <div className="entries cols-4">
            <div className="entry"><div className="dl">THU 19 FEB</div><div className="card"><div className="cv"></div><div className="meta"><div className="song">{song()}</div><div className="artist">{artist()}</div><div className="date">2/19/26</div><div className="snip">"Was recomm..."</div></div></div></div>
            <div className="entry"><div className="dl">SUN 15 FEB</div><div className="card"><div className="cv"></div><div className="meta"><div className="song">{song()}</div><div className="artist">{artist()}</div><div className="date">2/15/26</div><div className="snip">"I was driving..."</div></div></div></div>
            <div className="entry"><div className="dl">SUN 15 FEB</div><div className="card"><div className="cv"></div><div className="meta"><div className="song">{song()}</div><div className="artist">{artist()}</div><div className="date">2/15/26</div><div className="snip">"Imported from..."</div></div></div></div>
            <div className="entry"><div className="dl">SUN 15 FEB</div><div className="card"><div className="cv"></div><div className="meta"><div className="song">{song()}</div><div className="artist">{artist()}</div><div className="date">2/15/26</div><div className="snip">"Me and adv..."</div></div></div></div>
          </div>
          <div className="entries cols-4">
            <div className="entry"><div className="dl">SUN 15 FEB</div><div className="card"><div className="cv"></div><div className="meta"><div className="song">{song()}</div><div className="artist">{artist()}</div><div className="date">2/15/26</div><div className="snip">"Birthday playlist..."</div></div></div></div>
            <div className="entry"><div className="dl">SAT 14 FEB</div><div className="card"><div className="cv"></div><div className="meta"><div className="song">{song()}</div><div className="artist">{artist()}</div><div className="date">2/14/26</div><div className="snip">"The night we..."</div></div></div></div>
            <div className="entry"><div className="dl">FRI 13 FEB</div><div className="card"><div className="cv"></div><div className="meta"><div className="song">{song()}</div><div className="artist">{artist()}</div><div className="date">2/13/26</div><div className="snip">"Late drive..."</div></div></div></div>
            <div className="entry"><div className="dl">THU 12 FEB</div><div className="card"><div className="cv"></div><div className="meta"><div className="song">{song()}</div><div className="artist">{artist()}</div><div className="date">2/12/26</div><div className="snip">"Bookstore..."</div></div></div></div>
          </div>
        </div>
        <div className="fab search">⌕</div>
        <div className="fab up">↑</div>
        <div className="tab-bar">
          <div className="tab active book"><div className="ic"></div>Journal</div>
          <div className="tab folder"><div className="ic"></div>Collections</div>
          <div className="tab add"><div className="ic"></div>Add</div>
          <div className="tab gear"><div className="ic"></div>Settings</div>
        </div>
      </div>
    </div>
  )
}

function useReveal() {
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
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    })
    return () => io.disconnect()
  }, [])
}

function useDriftFloaters() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.float-card'))
    if (!cards.length) return
    type Meta = { card: HTMLElement; baseRotate: number; period: number; amp: number; start: number; visible: boolean }
    const metas: Meta[] = cards.map((c, i) => {
      c.style.willChange = 'transform'
      return {
        card: c,
        baseRotate: (Math.random() - 0.5) * 6,
        period: 9000 + i * 1700,
        amp: 4 + (i % 3) * 2,
        start: performance.now() - Math.random() * (9000 + i * 1700),
        visible: false,
      }
    })

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

function useStoryProgress() {
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

export function HomePage() {
  resetCounters()
  useReveal()
  useDriftFloaters()
  const activeStep = useStoryProgress()
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual')

  const storySteps = [
    '01 — Hear the song again',
    '02 — Attach the date you first heard it',
    '03 — Drop the place it belongs to',
    '04 — Write what you felt',
    '05 — Add the photos that go with it',
  ]

  return (
    <main className="page">
      {/* 02 HERO */}
      <section className="reveal" data-screen-label="02 Hero">
        <div className="hero-wf">
          <div className="hero-grid">
            <div className="hero-copy">
              <div>
                <div className="eyebrow hero-eyebrow">◉ Music Memory · An emotional archive</div>
                <h2 className="hero-headline">
                  Every song<br />
                  remembers<br />
                  <em>something.</em>
                </h2>
                <p className="hero-sub">
                  Attach the songs that scored your life to the moments
                  they belong to. A quiet, cinematic place to keep the
                  tracks that already remember you.
                </p>
              </div>
              <div className="hero-bottom">
                <div className="hero-badges">
                  <a className="store-badge sb-ios" href="#download" onClick={(e) => { e.preventDefault(); scrollToSelector('.cta-wf') }} aria-label="Download on the App Store">
                    <img src="/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg" alt="Download on the App Store" />
                  </a>
                  <a className="store-badge sb-android" href="#download" onClick={(e) => { e.preventDefault(); scrollToSelector('.cta-wf') }} aria-label="Get it on Google Play">
                    <img src="/GetItOnGooglePlay_Badge_Web_color_English.svg" alt="Get it on Google Play" />
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-stage">
              <div className="phone-shot">
                <img src="/screenshot-journal.png" alt="Music Memory journal screen" />
              </div>

              <div className="float-card fc-1">
                <div className="top">
                  <div className="cover"></div>
                  <div>
                    <div className="song">{song()}</div>
                    <div className="artist">{artist()}</div>
                  </div>
                </div>
                <div className="body">"It was raining the night I first heard this."</div>
                <div className="meta"><span>JUN 2019</span><span className="pin">TOKYO</span></div>
              </div>

              <div className="float-card fc-2">
                <div className="top">
                  <div className="cover"></div>
                  <div>
                    <div className="song">{song()}</div>
                    <div className="artist">{artist()}</div>
                  </div>
                </div>
                <div className="body">"Drove the long way home just so it would finish."</div>
                <div className="meta"><span>NOV 2021</span><span className="pin">LISBON</span></div>
              </div>

              <div className="float-card fc-3">
                <div className="top">
                  <div className="cover"></div>
                  <div>
                    <div className="song">{song()}</div>
                    <div className="artist">{artist()}</div>
                  </div>
                </div>
                <div className="body">"Mom's kitchen, Sunday afternoon."</div>
                <div className="meta"><span>2014</span><span className="pin">QUEENS</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 03 STORYTELLING */}
      <section data-screen-label="03 Scroll Storytelling" id="memories">
        <div className="story-wf">
          <div className="story-grid">
            <div className="story-sticky">
              <div className="eyebrow">◉ A memory, becoming.</div>
              <h3 style={{ marginTop: 20 }}>
                How a song<br /><em>becomes</em><br />a memory.
              </h3>
              <div className="progress">
                {storySteps.map((label, i) => (
                  <div key={i} className={`step${i <= activeStep ? ' on' : ''}`}>
                    <span className="dot"></span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="story-frames">
              <div className="story-frame reveal">
                <div className="copy">
                  <div className="step-num">01 — REENCOUNTER</div>
                  <h4>You hear it again.<br />Somewhere unexpected.</h4>
                  <p>The first beat lands and the room rearranges. You were
                    seventeen. You were on that train. You were everything.</p>
                </div>
                <div className="vis">
                  <div className="ghost-ui">
                    <div style={{ height: 24, borderRadius: 4, background: 'var(--ink-07)' }}></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 8, marginTop: 6 }}>
                      <div style={{ width: 48, height: 48, background: 'var(--ink-12)', borderRadius: 3 }}></div>
                      <div>
                        <div style={{ height: 10, width: '60%', background: 'var(--ink-12)', borderRadius: 2, marginBottom: 6 }}></div>
                        <div style={{ height: 8, width: '40%', background: 'var(--ink-07)', borderRadius: 2 }}></div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 8 }}>
                      <div style={{ width: 48, height: 48, background: 'var(--ink-12)', borderRadius: 3 }}></div>
                      <div>
                        <div style={{ height: 10, width: '70%', background: 'var(--ink-07)', borderRadius: 2, marginBottom: 6 }}></div>
                        <div style={{ height: 8, width: '30%', background: 'var(--ink-07)', borderRadius: 2 }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="story-frame reveal">
                <div className="copy">
                  <div className="step-num">02 — TIMESTAMP</div>
                  <h4>Pin it to <em>when</em>.<br />A date. A season.</h4>
                  <p>"First heard, June 2019." That's all it takes for a song
                    to know which chapter it belongs to.</p>
                </div>
                <div className="vis">
                  <div className="ghost-ui" style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'var(--f-display)', fontSize: 48, lineHeight: 1, textAlign: 'center', color: 'var(--ink-90)' }}>June 2019</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginTop: 14 }}>
                      <div style={{ height: 14, background: 'var(--ink-07)', borderRadius: 2 }}></div>
                      <div style={{ height: 14, background: 'var(--ink-07)', borderRadius: 2 }}></div>
                      <div style={{ height: 14, background: 'var(--accent)', borderRadius: 2 }}></div>
                      <div style={{ height: 14, background: 'var(--ink-07)', borderRadius: 2 }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="story-frame reveal">
                <div className="copy">
                  <div className="step-num">03 — PLACE</div>
                  <h4>Drop the place<br />it belongs to.</h4>
                  <p>Cities and corner stores. Beaches and bedrooms.
                    Where you were is half of what the song means.</p>
                </div>
                <div className="vis">
                  <div className="ghost-ui" style={{ background: 'linear-gradient(135deg, rgba(255,101,0,0.05), transparent 60%)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 0 6px var(--accent-soft)' }}></span>
                      <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-90)' }}>SHIBUYA CROSSING · TOKYO, JP</span>
                    </div>
                    <div style={{ marginTop: 10, height: 8, width: '60%', background: 'var(--ink-07)', borderRadius: 2 }}></div>
                    <div style={{ marginTop: 6, height: 8, width: '40%', background: 'var(--ink-07)', borderRadius: 2 }}></div>
                  </div>
                </div>
              </div>

              <div className="story-frame reveal">
                <div className="copy">
                  <div className="step-num">04 — FEELING</div>
                  <h4>Write what<br />you <em>felt</em>.</h4>
                  <p>Not what you did. What you felt. Even a sentence is
                    enough to make a song stop being just sound.</p>
                </div>
                <div className="vis">
                  <div className="ghost-ui">
                    <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.45, color: 'var(--ink-90)' }}>"Walked home in the rain on purpose, just so it could keep playing."</div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 14, fontFamily: 'var(--f-mono)', fontSize: 9.5, color: 'var(--ink-35)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      <span>32 WORDS</span><span>· DRAFT</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="story-frame reveal">
                <div className="copy">
                  <div className="step-num">05 — TEXTURE</div>
                  <h4>Add the photos.<br />Up to five.</h4>
                  <p>The polaroid, the ticket stub, the screenshot at 2 a.m.
                    Whatever the song was sitting next to in your life.</p>
                </div>
                <div className="vis">
                  <div className="ghost-ui">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                      <div style={{ aspectRatio: '1/1', background: 'repeating-linear-gradient(135deg, transparent 0 6px, var(--ink-12) 6px 7px), var(--ink-07)', borderRadius: 3 }}></div>
                      <div style={{ aspectRatio: '1/1', background: 'repeating-linear-gradient(135deg, transparent 0 6px, var(--ink-12) 6px 7px), var(--ink-07)', borderRadius: 3 }}></div>
                      <div style={{ aspectRatio: '1/1', background: 'repeating-linear-gradient(135deg, transparent 0 6px, var(--ink-12) 6px 7px), var(--ink-07)', borderRadius: 3 }}></div>
                      <div style={{ aspectRatio: '1/1', background: 'repeating-linear-gradient(135deg, transparent 0 6px, var(--ink-12) 6px 7px), var(--ink-07)', borderRadius: 3 }}></div>
                      <div style={{ aspectRatio: '1/1', border: '1px dashed var(--ink-35)', borderRadius: 3, display: 'grid', placeItems: 'center', fontFamily: 'var(--f-mono)', fontSize: 18, color: 'var(--ink-50)' }}>+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 04 PRODUCT SHOWCASE */}
      <section data-screen-label="04 Product Showcase" id="features">
        <div className="showcase-wf">
          <div className="showcase-row reveal">
            <div className="showcase-copy">
              <div className="feat-num">FEATURE 01 — TIMELINE</div>
              <h3>A grid of <em>covers</em>.<br />Months as chapters.</h3>
              <p>Your journal looks like the inside of a record store —
                month headers anchor each chapter, the current month
                opens 2-up with full journal previews, older months
                collapse to a tighter 4-up grid as you scroll back.</p>
              <div className="feat-meta">
                <div><strong>Layout</strong>Month-grouped · day labels above each card · cover → song → artist → date → snippet</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="phone-shot">
                <img src="/screenshot-journal.png" alt="Music Memory journal grid" />
              </div>
            </div>
          </div>

          <div className="showcase-row flip reveal">
            <div className="showcase-copy">
              <div className="feat-num">FEATURE 02 — DETAIL</div>
              <h3>Open a memory.<br />Stand <em>inside</em> it.</h3>
              <p>Tap a cover and step inside. Song title and artist
                at the top, the album cover centered large, then
                Apple Music and Spotify shortcuts, the date, the
                place — and your memory in its own panel beneath,
                with the photos slotted under.</p>
              <div className="feat-meta">
                <div><strong>Background</strong>Ambient halo extracted from cover · soft top-down warmth</div>
                <div><strong>Hierarchy</strong>Header → cover → play-on → date+place → memory → media</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="phone-shot">
                <img src="/screenshot-entry.png" alt="Music Memory entry detail screen" />
              </div>
            </div>
          </div>

          <div className="showcase-row reveal">
            <div className="showcase-copy">
              <div className="feat-num">FEATURE 03 — SEARCH</div>
              <h3>Pull songs <em>directly</em><br />from Apple Music.</h3>
              <p>Search the catalogue, attach the real cover, link out
                to the track. Don't see it? Create a custom entry —
                even mixtapes belong here.</p>
              <div className="feat-meta">
                <div><strong>Integrations</strong>Apple Music API</div>
                <div><strong>Fallback</strong>Custom entry · upload cover · text</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="phone-shot">
                <img src="/Search_Songs.png" alt="Search Apple Music for a song" />
              </div>
            </div>
          </div>

          <div className="showcase-row flip reveal">
            <div className="showcase-copy">
              <div className="feat-num">FEATURE 04 — LOCATION</div>
              <h3>Where you<br /><em>first</em> heard it.</h3>
              <p>A train platform in Berlin. The bathroom at a party.
                Locations live with the memory — and you can see every
                song you tagged in a city you've been to.</p>
              <div className="feat-meta">
                <div><strong>Search</strong>Place lookup · custom labels OK</div>
                <div><strong>Privacy</strong>Coarse by default · exact opt-in</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="map-vis">
                <div className="pin a"></div>
                <div className="pin b"></div>
                <div className="pin c"></div>
                <div className="place a">TOKYO · 03</div>
                <div className="place b">LISBON · 07</div>
                <div className="place c">QUEENS · 01</div>
              </div>
            </div>
          </div>

          <div className="showcase-row reveal">
            <div className="showcase-copy">
              <div className="feat-num">FEATURE 05 — TEXTURE</div>
              <h3>Up to <em>five</em> media.<br /></h3>
              <p>The polaroid, the screenshot, the blurry concert clip.
                Songs aren't sound alone — they're everything you saw
                while they were playing.</p>
              <div className="feat-meta">
                <div><strong>Limits</strong>5 photos or 5 videos · Pro only</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="media-shot">
                <img src="/Media_selector.png" alt="Photo and video selector" />
              </div>
            </div>
          </div>

          <div className="showcase-row flip reveal">
            <div className="showcase-copy">
              <div className="feat-num">FEATURE 06 — COLLECTIONS</div>
              <h3>Group the songs<br />that go <em>together</em>.</h3>
              <p>Playlists of moments. "First year of grad school."
                "The summer everything changed." Curate, name, cover —
                and keep them private or share them.</p>
              <div className="feat-meta">
                <div><strong>Cover</strong>Auto-mosaic of 4 album arts · or custom</div>
                <div><strong>Sort</strong>Manual drag · or chronological</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="phone-shot rounded">
                <img src="/Collections.png" alt="Collections list view" />
              </div>
            </div>
          </div>

          <div className="showcase-row reveal">
            <div className="showcase-copy">
              <div className="feat-num">FEATURE 07 — EXPORT</div>
              <h3>Send a collection<br />back to <em>Apple Music</em>.</h3>
              <p>One tap turns any collection into a real playlist
                in your music library. Listen end-to-end and you've
                just played a chapter of your life.</p>
              <div className="feat-meta">
                <div><strong>Format</strong>Apple Music playlist · ordered · public/private</div>
                <div><strong>Sync</strong>One-way · re-export to overwrite</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="phone-shot">
                <img src="/Export_Apple_Music.png" alt="Export collection to Apple Music" />
              </div>
            </div>
          </div>

          <div className="showcase-row flip reveal">
            <div className="showcase-copy">
              <div className="feat-num">FEATURE 08 — COMMUNITY</div>
              <h3>See how others<br />remember the<br /><em>same</em> song.</h3>
              <p>Make a memory public and you'll see everyone else
                who attached their life to the same track. React,
                reply, recognise yourself in a stranger.</p>
              <div className="feat-meta">
                <div><strong>Reactions</strong>Like / dislike · threaded comments</div>
                <div><strong>Safety</strong>Per-post report · moderation queue</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="community-stack">
                {[
                  { who: '@m.k', said: '"Played at every bus stop in Seoul, summer 2018."', react: '♡ 312' },
                  { who: '@noahw', said: '"Skipping class in the parking lot."', react: '♡ 188' },
                  { who: '@you', said: '"Walked home in the rain on purpose."', react: '♡ 47', accent: true },
                  { who: '@l.alvarez', said: '"Mom played it the morning we moved."', react: '♡ 502' },
                ].map((m) => (
                  <div
                    key={m.who}
                    className="mem"
                    style={m.accent ? { borderColor: 'var(--accent)', background: 'var(--accent-soft)' } : undefined}
                  >
                    <Avatar seed={m.who} />
                    <div>
                      <div className="who" style={m.accent ? { color: 'var(--accent)' } : undefined}>{m.who}</div>
                      <div className="said">{m.said}</div>
                    </div>
                    <div className="react" style={m.accent ? { color: 'var(--accent)' } : undefined}>{m.react}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="showcase-row reveal">
            <div className="showcase-copy">
              <div className="feat-num">FEATURE 09 — RHYTHM</div>
              <h3>One song a day.<br /><em>That's all.</em></h3>
              <p>A quiet daily streak. A nudge in the morning, a
                week of small entries — and a year later, a record
                of who you were, song by song.</p>
              <div className="feat-meta">
                <div><strong>Reminder</strong>Push at user-chosen time</div>
                <div><strong>Free tier</strong>1 memory / day · Pro unlimited</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="streak-card">
                <div>
                  <div className="streak-label">CURRENT STREAK</div>
                  <div className="streak-num">142</div>
                  <div style={{ fontFamily: 'var(--f-sans)', fontSize: 12, color: 'var(--ink-50)' }}>days of memories</div>
                </div>
                <div className="week">
                  <div className="on"></div><div className="on"></div><div className="on"></div><div className="on"></div><div className="on"></div><div className="on"></div><div className="today"></div>
                </div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-50)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 18 }}>M T W T F S S</div>
              </div>
            </div>
          </div>

          <div className="showcase-row flip reveal">
            <div className="showcase-copy">
              <div className="feat-num">FEATURE 10 — VISIBILITY</div>
              <h3>Public or<br /><em>just for you.</em></h3>
              <p>Every memory has a switch. Most people keep theirs
                private — but the ones you share help build the
                community archive of how songs live in people's lives.</p>
              <div className="feat-meta">
                <div><strong>Default</strong>Private · opt-in to public</div>
                <div><strong>Per-memory</strong>Toggle at create or anytime after</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="toggle-vis">
                <div className="tile active">
                  <div>
                    <div className="name">Private</div>
                    <div className="sub">Visible only to you · default</div>
                  </div>
                  <div className="pill">SELECTED</div>
                </div>
                <div className="tile">
                  <div>
                    <div className="name">Public</div>
                    <div className="sub">Visible on this song's memory feed</div>
                  </div>
                  <div className="pill">TAP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 05 EDITORIAL TYPOGRAPHY */}
      <section className="reveal" data-screen-label="05 Editorial Typography">
        <div className="edit-wf">
          <div className="quotes">
            <div className="quote">
              Every song<br />
              remembers<br />
              <em>something.</em>
            </div>
            <div className="quote">
              Some playlists are<br />
              entire <span className="accent">chapters</span> of<br />
              your life.
            </div>
            <div className="quote">
              Music<br />
              <em>outlives</em><br />
              memory.
            </div>
            <div className="quote">
              Where were you<br />
              when you <em>first</em><br />
              heard it?
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 06 SOCIAL PROOF */}
      <section className="reveal" data-screen-label="07 Social Proof" id="community">
        <div className="proof-wf">
          <div className="counter">
            <div className="eyebrow" style={{ marginBottom: 20 }}>◉ THE ARCHIVE</div>
            <div className="big">
              <span className="ticker">{(100000).toLocaleString('en-US')}</span>+
              <br />
              <span className="unit">memories</span>
            </div>
            <div className="small">preserved in Music Memory · since 2026</div>
          </div>

          <div className="masonry">
            <div className="mem-card">
              <div className="row"><div className="cv"></div><div><div className="song">{song()}</div><div className="ar">{artist()}</div></div></div>
              <div className="body">"Played at every bus stop in Seoul, summer 2018. The way the speakers crackled is the way I remember the city."</div>
              <div className="meta"><span>JUL 2018</span><span className="pin">SEOUL</span><span>@m.k</span></div>
              <div className="react"><span>♡ 312</span><span>↩ 24</span></div>
            </div>

            <div className="mem-card">
              <div className="row"><div className="cv"></div><div><div className="song">{song()}</div><div className="ar">{artist()}</div></div></div>
              <div className="body">"Mom played this the morning we moved. I was eleven. I still cry at the bridge."</div>
              <div className="meta"><span>2007</span><span className="pin">QUEENS</span><span>@l.alvarez</span></div>
              <div className="react"><span>♡ 502</span><span>↩ 71</span></div>
            </div>

            <div className="mem-card">
              <div className="row"><div className="cv"></div><div><div className="song">{song()}</div><div className="ar">{artist()}</div></div></div>
              <div className="body">"The first slow dance of my life was off-tempo and perfect."</div>
              <div className="meta"><span>MAY 2014</span><span className="pin">DURHAM</span><span>@anon</span></div>
              <div className="react"><span>♡ 884</span><span>↩ 102</span></div>
            </div>

            <div className="mem-card">
              <div className="row"><div className="cv"></div><div><div className="song">{song()}</div><div className="ar">{artist()}</div></div></div>
              <div className="body">"Skipping class in the parking lot. The windows down even though it was cold. I knew it was going to matter."</div>
              <div className="meta"><span>OCT 2019</span><span className="pin">PORTLAND</span><span>@noahw</span></div>
              <div className="react"><span>♡ 188</span><span>↩ 12</span></div>
            </div>

            <div className="mem-card">
              <div className="row"><div className="cv"></div><div><div className="song">{song()}</div><div className="ar">{artist()}</div></div></div>
              <div className="body">"My dad's funeral. I wasn't ready, but the song was."</div>
              <div className="meta"><span>MAR 2022</span><span>@anon</span></div>
              <div className="react"><span>♡ 1,402</span><span>↩ 188</span></div>
            </div>

            <div className="mem-card">
              <div className="row"><div className="cv"></div><div><div className="song">{song()}</div><div className="ar">{artist()}</div></div></div>
              <div className="body">"Walked home in the rain on purpose, just so it could keep playing."</div>
              <div className="meta"><span>JUN 2019</span><span className="pin">TOKYO</span><span>@you</span></div>
              <div className="react"><span>♡ 47</span><span>↩ 6</span></div>
            </div>

            <div className="mem-card">
              <div className="row"><div className="cv"></div><div><div className="song">{song()}</div><div className="ar">{artist()}</div></div></div>
              <div className="body">"My grandmother's kitchen. The kettle and the chorus arrived at the same time."</div>
              <div className="meta"><span>1998</span><span className="pin">LISBON</span><span>@joanaf</span></div>
              <div className="react"><span>♡ 623</span><span>↩ 54</span></div>
            </div>

            <div className="mem-card">
              <div className="row"><div className="cv"></div><div><div className="song">{song()}</div><div className="ar">{artist()}</div></div></div>
              <div className="body">"Drove the long way home just so it would finish."</div>
              <div className="meta"><span>NOV 2021</span><span className="pin">AUSTIN</span><span>@thom</span></div>
              <div className="react"><span>♡ 91</span><span>↩ 3</span></div>
            </div>

            <div className="mem-card">
              <div className="row"><div className="cv"></div><div><div className="song">{song()}</div><div className="ar">{artist()}</div></div></div>
              <div className="body">"The summer I learned to be alone. This song was company."</div>
              <div className="meta"><span>JUL 2020</span><span className="pin">BERLIN</span><span>@iwrite</span></div>
              <div className="react"><span>♡ 1,108</span><span>↩ 140</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 07 PRICING */}
      <section className="reveal" data-screen-label="08 Pricing" id="pricing">
        <div className="pricing-wf">
          <div className="pricing-head">
            <div className="eyebrow">◉ PRICING</div>
            <h2 className="h-section" style={{ marginTop: 18 }}>
              Free to keep.<br /><em>Pro</em> to go further.
            </h2>
            <p className="subcopy" style={{ marginTop: 24 }}>
              Start free — one memory a day, forever. Upgrade when you want
              location, photos, video, and a public voice on the song's feed.
            </p>

            <div className="billing-toggle" role="tablist" aria-label="Billing period">
              <button
                role="tab"
                aria-selected={billing === 'annual'}
                className={billing === 'annual' ? 'on' : ''}
                onClick={() => setBilling('annual')}
              >
                Annual
                <span className="save">Save 50%</span>
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

          <div className="pricing-grid">
            <div className="plan plan-free">
              <div className="plan-head">
                <div className="plan-name">Free</div>
                <div className="plan-price">
                  <span className="amount">$0</span>
                  <span className="per">forever</span>
                </div>
                <div className="plan-tag">Get the daily habit</div>
              </div>

              <ul className="plan-list">
                <li className="yes"><span className="ic"><CheckIcon /></span>1 memory per day</li>
                <li className="yes"><span className="ic"><CheckIcon /></span>Write what the song means to you &amp; when you first heard it</li>
                <li className="yes"><span className="ic"><CheckIcon /></span>Add custom songs not on Apple Music</li>
                <li className="yes"><span className="ic"><CheckIcon /></span>Organise memories into collections</li>
                <li className="yes"><span className="ic"><CheckIcon /></span>Daily streak tracking</li>
                <li className="yes"><span className="ic"><CheckIcon /></span>Export your journal (CSV / JSON)</li>
                <li className="no"><span className="ic"><CrossIcon /></span>Attach photos &amp; videos</li>
                <li className="no"><span className="ic"><CrossIcon /></span>Read other people's memories for the same song</li>
                <li className="no"><span className="ic"><CrossIcon /></span>Tag where you were when you heard it</li>
                <li className="no"><span className="ic"><CrossIcon /></span>Share your memory to the song's public feed</li>
              </ul>

              <a
                className="plan-cta secondary"
                href="#download"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSelector('#download')
                }}
              >
                Get the app
              </a>
            </div>

            <div className="plan plan-pro">
              <div className="plan-ribbon">Most chosen</div>
              <div className="plan-head">
                <div className="plan-name">
                  Pro <span className="mark">◉</span>
                </div>
                <div className="plan-price">
                  {billing === 'annual' ? (
                    <>
                      <span className="amount">$29.99</span>
                      <span className="per">/year · ~$2.50/mo</span>
                    </>
                  ) : (
                    <>
                      <span className="amount">$4.99</span>
                      <span className="per">/month</span>
                    </>
                  )}
                </div>
                <div className="plan-tag">
                  {billing === 'annual'
                    ? '3-day free trial · cancel anytime'
                    : 'No trial · cancel anytime'}
                </div>
              </div>

              <ul className="plan-list">
                <li className="yes"><span className="ic"><CheckIcon /></span>Everything in Free</li>
                <li className="yes hl"><span className="ic"><CheckIcon /></span>Unlimited memories per day</li>
                <li className="yes hl"><span className="ic"><CheckIcon /></span>Attach photos &amp; videos to any memory</li>
                <li className="yes hl"><span className="ic"><CheckIcon /></span>Tag the place where you first heard it</li>
                <li className="yes hl"><span className="ic"><CheckIcon /></span>Share your memory to the song's public feed</li>
                <li className="yes hl"><span className="ic"><CheckIcon /></span>Read how others remember the same song</li>
              </ul>

              <a
                className="plan-cta primary"
                href="#download"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSelector('#download')
                }}
              >
                {billing === 'annual' ? 'Start 3-day free trial' : 'Go Pro · $4.99/mo'}
              </a>

              <div className="plan-fine">
                Billed through the App Store / Google Play
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 08 FINAL CTA */}
      <section className="reveal" data-screen-label="09 Final CTA" id="download">
        <div className="cta-wf">
          <div className="eyebrow">◉ THE FINAL FRAME</div>
          <h2 className="h-final" style={{ marginTop: 36 }}>
            Your songs<br />already <em>remember</em>.<br />
            Start <span className="accent">writing it</span><br />down.
          </h2>

          <div className="cta-row">
            <a className="store-badge sb-ios sb-lg" href="#" aria-label="Download on the App Store">
              <img src="/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg" alt="Download on the App Store" />
            </a>
            <a className="store-badge sb-android sb-lg" href="#" aria-label="Get it on Google Play">
              <img src="/GetItOnGooglePlay_Badge_Web_color_English.svg" alt="Get it on Google Play" />
            </a>
          </div>

          <div className="trial">3-day free trial · annual plan</div>

          <div className="recap">
            <div className="item">
              <div className="k">PRO</div>
              <div className="v">Unlimited<br />memories</div>
            </div>
            <div className="item">
              <div className="k">PRO</div>
              <div className="v">Photos<br />&amp; videos</div>
            </div>
            <div className="item">
              <div className="k">PRO</div>
              <div className="v">Location<br />tagging</div>
            </div>
            <div className="item">
              <div className="k">PRO</div>
              <div className="v">Public<br />community</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
