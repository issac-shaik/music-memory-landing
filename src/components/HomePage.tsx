import { ClientEffects, HeroBadges, StoryProgress, BillingToggle } from './HomeClient'

const SONGS = [
  "Stay close, stay quiet", "Window seat", "Five o'clock light",
  "All the way home", "Late at the corner", "Mid August",
  "Long way around", "Three blocks east", "Halfway there yet",
  "The kind of rain", "Last train, first light", "Holding pattern",
  "Soft month", "Pier 14", "Sun loop", "Until we forget",
  "Empty apartment", "Salt air", "Marker on the wall", "Half a cigarette",
]

const ARTISTS = [
  "K. Vermillion", "Sun Choir", "Page Forty", "Atlas Mode",
  "Distant Sons", "Lake Theory", "Coriander", "Quiet Ferry",
  "Lower Sky", "Sand Hours", "Auburn Park", "Otter & Eel",
  "Two Field", "Slow Carbon", "Lyra Mae", "Verra",
  "Outlanding", "Halsey Park", "Nine Coast", "Plain Air",
]

let _si = 0, _ai = 0
function song() { return SONGS[_si++ % SONGS.length] }
function artist() { return ARTISTS[_ai++ % ARTISTS.length] }
function resetCounters() { _si = 0; _ai = 0 }

const STORY_STEPS = [
  '01 — Hear the song again',
  '02 — Attach the date you first heard it',
  '03 — Drop the place it belongs to',
  '04 — Write what you felt',
  '05 — Add the photos that go with it',
]

export function HomePage() {
  resetCounters()

  return (
    <main className="page">
      <ClientEffects />

      {/* 02 HERO */}
      <section className="reveal in" data-screen-label="02 Hero">
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
                <HeroBadges />
              </div>
            </div>

            <div className="hero-stage">
              <div className="phone-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/screenshot-journal.webp"
                  alt="Music Memory journal screen"
                  width="860"
                  height="1582"
                  fetchPriority="high"
                />
              </div>

              <div className="float-card fc-1">
                <div className="top">
                  <div className="cover"></div>
                  <div>
                    <div className="song">{song()}</div>
                    <div className="artist">{artist()}</div>
                  </div>
                </div>
                <div className="body">&ldquo;It was raining the night I first heard this.&rdquo;</div>
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
                <div className="body">&ldquo;Drove the long way home just so it would finish.&rdquo;</div>
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
                <div className="body">&ldquo;Mom&apos;s kitchen, Sunday afternoon.&rdquo;</div>
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
              <StoryProgress steps={STORY_STEPS} />
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
                  <p>&ldquo;First heard, June 2019.&rdquo; That&apos;s all it takes for a song
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
                    <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.45, color: 'var(--ink-90)' }}>&ldquo;Walked home in the rain on purpose, just so it could keep playing.&rdquo;</div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 14, fontFamily: 'var(--f-mono)', fontSize: 9.5, color: 'var(--ink-35)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
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
          <div className="showcase-row bare reveal">
            <div className="showcase-copy">
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/screenshot-journal.webp" alt="Music Memory journal grid" width="860" height="1582" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="showcase-row flip bare reveal">
            <div className="showcase-copy">
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/screenshot-entry.webp" alt="Music Memory entry detail screen" width="938" height="1677" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="showcase-row reveal">
            <div className="showcase-copy">
              <h3>Pull songs <em>directly</em><br />from Apple Music.</h3>
              <p>Search the catalogue, attach the real cover, link out
                to the track. Don&apos;t see it? Create a custom entry —
                even mixtapes belong here.</p>
              <div className="feat-meta">
                <div><strong>Integrations</strong>Apple Music API</div>
                <div><strong>Fallback</strong>Custom entry · upload cover · text</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="phone-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Search_Songs.webp" alt="Search Apple Music for a song" width="860" height="1582" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="showcase-row flip reveal">
            <div className="showcase-copy">
              <h3>Where you<br /><em>first</em> heard it.</h3>
              <p>A train platform in Berlin. The bathroom at a party.
                Locations live with the memory — and you can see every
                song you tagged in a city you&apos;ve been to.</p>
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
              <h3>Up to <em>five</em> media.</h3>
              <p>The polaroid, the screenshot, the blurry concert clip.
                Songs aren&apos;t sound alone — they&apos;re everything you saw
                while they were playing.</p>
              <div className="feat-meta">
                <div><strong>Limits</strong>5 photos or 5 videos · Pro only</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="media-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Media_selector.webp" alt="Photo and video selector" width="860" height="1582" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="showcase-row flip reveal">
            <div className="showcase-copy">
              <h3>Group the songs<br />that go <em>together</em>.</h3>
              <p>Playlists of moments. &ldquo;First year of grad school.&rdquo;
                &ldquo;The summer everything changed.&rdquo; Curate, name, cover —
                and keep them private or share them.</p>
              <div className="feat-meta">
                <div><strong>Cover</strong>Upload Cover Art for each Collection</div>
                <div><strong>Sort</strong>Manual drag · or chronological</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="phone-shot rounded">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Collections.webp" alt="Collections list view" width="860" height="1582" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="showcase-row reveal">
            <div className="showcase-copy">
              <h3>Send a collection<br />back to <em>Apple Music</em>.</h3>
              <p>One tap turns any collection into a real playlist
                in your music library. Listen end-to-end and you&apos;ve
                just played a chapter of your life.</p>
              <div className="feat-meta">
                <div><strong>Format</strong>Apple Music playlist · ordered · public/private</div>
                <div><strong>Sync</strong>One-way · re-export to overwrite</div>
              </div>
            </div>
            <div className="showcase-vis">
              <div className="phone-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Export_Apple_Music.webp" alt="Export collection to Apple Music" width="878" height="1608" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="showcase-row flip reveal">
            <div className="showcase-copy">
              <h3>See how others<br />remember the<br /><em>same</em> song.</h3>
              <p>Make a memory public and you&apos;ll see everyone else
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
                    <div className="av" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ink-12)' }}></div>
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
              <h3>One song a day.<br /><em>That&apos;s all.</em></h3>
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
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-50)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginTop: 18 }}>M T W T F S S</div>
              </div>
            </div>
          </div>

          <div className="showcase-row flip reveal">
            <div className="showcase-copy">
              <h3>Public or<br /><em>just for you.</em></h3>
              <p>Every memory has a switch. Most people keep theirs
                private — but the ones you share help build the
                community archive of how songs live in people&apos;s lives.</p>
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
                    <div className="sub">Visible on this song&apos;s memory feed</div>
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
            {[
              { body: '"Played at every bus stop in Seoul, summer 2018. The way the speakers crackled is the way I remember the city."', meta: ['JUL 2018', 'SEOUL', '@m.k'], react: ['♡ 312', '↩ 24'] },
              { body: '"Mom played this the morning we moved. I was eleven. I still cry at the bridge."', meta: ['2007', 'QUEENS', '@l.alvarez'], react: ['♡ 502', '↩ 71'] },
              { body: '"The first slow dance of my life was off-tempo and perfect."', meta: ['MAY 2014', 'DURHAM', '@anon'], react: ['♡ 884', '↩ 102'] },
              { body: '"Skipping class in the parking lot. The windows down even though it was cold. I knew it was going to matter."', meta: ['OCT 2019', 'PORTLAND', '@noahw'], react: ['♡ 188', '↩ 12'] },
              { body: '"My dad\'s funeral. I wasn\'t ready, but the song was."', meta: ['MAR 2022', '@anon'], react: ['♡ 1,402', '↩ 188'] },
              { body: '"Walked home in the rain on purpose, just so it could keep playing."', meta: ['JUN 2019', 'TOKYO', '@you'], react: ['♡ 47', '↩ 6'] },
              { body: '"My grandmother\'s kitchen. The kettle and the chorus arrived at the same time."', meta: ['1998', 'LISBON', '@joanaf'], react: ['♡ 623', '↩ 54'] },
              { body: '"Drove the long way home just so it would finish."', meta: ['NOV 2021', 'AUSTIN', '@thom'], react: ['♡ 91', '↩ 3'] },
              { body: '"The summer I learned to be alone. This song was company."', meta: ['JUL 2020', 'BERLIN', '@iwrite'], react: ['♡ 1,108', '↩ 140'] },
            ].map((card, i) => (
              <div key={i} className="mem-card">
                <div className="row"><div className="cv"></div><div><div className="song">{song()}</div><div className="ar">{artist()}</div></div></div>
                <div className="body">{card.body}</div>
                <div className="meta">{card.meta.map((m, j) => <span key={j} className={m.includes('@') ? '' : j === card.meta.length - 2 ? 'pin' : ''}>{m}</span>)}</div>
                <div className="react">{card.react.map((r, j) => <span key={j}>{r}</span>)}</div>
              </div>
            ))}
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
              location, photos, video, and a public voice on the song&apos;s feed.
            </p>
          </div>

          <BillingToggle />
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg" alt="Download on the App Store" width="168" height="56" />
            </a>
            <a className="store-badge sb-android sb-lg" href="#" aria-label="Get it on Google Play">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/GetItOnGooglePlay_Badge_Web_color_English.svg" alt="Get it on Google Play" width="190" height="56" />
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
