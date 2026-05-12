'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function useMousePosition() {
  const rafId = useRef(0)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
      })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handler)
      cancelAnimationFrame(rafId.current)
    }
  }, [])
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
  useMousePosition()

  return (
    <div className="min-h-screen bg-black spotlight grid-bg flex flex-col">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/adaptive-icon.png" alt="Music Memory Logo" className="w-8 h-8 rounded-lg object-cover" width={32} height={32} />
            <span className="font-bold text-lg text-white">Music Memory</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="/#features" className="hover:text-white transition-colors">Features</a>
            <a href="/#testimonials" className="hover:text-white transition-colors">Reviews</a>
            <a href="/#download" className="hover:text-white transition-colors">Download</a>
          </div>
          <a
            href="/#download"
            className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[var(--color-accent-dark)] transition-colors"
          >
            Get the App
          </a>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/adaptive-icon.png" alt="Music Memory Logo" className="w-6 h-6 rounded-md object-cover" width={24} height={24} />
            <span className="font-bold text-white">Music Memory</span>
          </Link>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/community-guidelines" className="hover:text-white transition-colors">Community Guidelines</Link>
            <Link href="/delete-account" className="hover:text-white transition-colors text-red-500/80 hover:text-red-400">Delete Account</Link>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-sm text-gray-600">© 2026 Music Memory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
