import { useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'

function useMousePosition() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
}

export default function Layout() {
  useMousePosition()

  return (
    <div className="min-h-screen bg-black spotlight grid-bg flex flex-col">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/adaptive-icon.png" alt="Music Memory Logo" className="w-8 h-8 rounded-lg object-cover" />
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
        <Outlet />
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/adaptive-icon.png" alt="Music Memory Logo" className="w-6 h-6 rounded-md object-cover" />
            <span className="font-bold text-white">Music Memory</span>
          </Link>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/community-guidelines" className="hover:text-white transition-colors">Community Guidelines</Link>
            <Link to="/delete-account" className="hover:text-white transition-colors text-red-500/80 hover:text-red-400">Delete Account</Link>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-sm text-gray-600">© 2026 Music Memory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
