'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV_MAP: Record<string, string> = {
  Memories: '#memories',
  Features: '#features',
  Community: '#community',
  FAQ: '#faq',
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    let last = window.scrollY > 40
    setScrolled(last)
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const next = window.scrollY > 40
        if (next !== last) {
          last = next
          setScrolled(next)
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Honor hash on home navigation
  useEffect(() => {
    if (pathname === '/' && typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.slice(1)
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [pathname])

  const goToSection = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const id = hash.slice(1)
    if (pathname !== '/') {
      router.push('/' + hash)
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className="nav-shell">
        <div className="page">
          <nav
            className="nav-wf nav-floating"
            aria-label="Main navigation"
            style={
              scrolled
                ? {
                    background: 'rgba(15, 15, 17, 0.92)',
                  }
                : undefined
            }
          >
            <div className="nav-inner">
              <Link href="/" className="logo-block" style={{ textDecoration: 'none' }}>
                <img src="/adaptive-icon.png" alt="" className="logo-mark" width="28" height="28" />
                Music Memory
              </Link>
              <div className="nav-links">
                {Object.entries(NAV_MAP).map(([label, hash]) => (
                  <a key={label} href={hash} onClick={goToSection(hash)}>
                    {label}
                  </a>
                ))}
              </div>
              <div className="nav-cta">
                <a href="#download" onClick={goToSection('#download')} className="cta">
                  Start journaling
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {children}

      <footer className="reveal" data-screen-label="10 Footer">
        <div className="page">
          <div className="foot-wf foot-slim">
            <div className="top">
              <div className="brand">
                Music <em style={{ fontStyle: 'italic', color: 'var(--ink-50)' }}>Memory.</em>
              </div>
              <ul className="legal-links">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/community-guidelines">Community Guidelines</Link></li>
                <li><Link href="/delete-account">Delete Account</Link></li>
              </ul>
            </div>

            <div className="bottom">
              <span>© 2026 Moonveil Labs</span>
              <span className="center">Made with care for the songs you can&apos;t forget.</span>
              <span className="right">v1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
