import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Music, BookOpen, Camera, Users, MapPin, Star, ChevronDown, Smartphone } from 'lucide-react'
import './index.css'

// ─── Spotlight mouse tracker ───
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

// ─── Animated counter ───
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {

          const duration = 2000
          const startTime = performance.now()
          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─── Phone Mockup ───
function PhoneMockup({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`phone-frame ${className}`}>
      <div className="phone-screen aspect-[9/19.5] w-[280px] relative">
        {children}
      </div>
    </div>
  )
}

// ─── App Store Buttons ───
function StoreButtons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {/* TODO: Replace # with actual App Store URL */}
      <a
        href="#"
        className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] leading-none opacity-70">Download on the</div>
          <div className="text-base font-semibold leading-tight">App Store</div>
        </div>
      </a>
      {/* TODO: Replace # with actual Play Store URL */}
      <a
        href="#"
        className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.396 13l2.302-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] leading-none opacity-70">Get it on</div>
          <div className="text-base font-semibold leading-tight">Google Play</div>
        </div>
      </a>
    </div>
  )
}

// ─── Feature Card ───
function FeatureCard({ icon: Icon, title, description, delay = 0 }: {
  icon: any; title: string; description: string; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className="glass rounded-2xl p-6 hover:border-[var(--color-accent)]/20 transition-colors group"
    >
      <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-accent)]/20 transition-colors">
        <Icon className="w-6 h-6 text-[var(--color-accent)]" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

// ─── Testimonial Card ───
function TestimonialCard({ name, persona, text, delay = 0 }: {
  name: string; persona: string; text: string; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-6 flex flex-col"
    >
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1 italic">"{text}"</p>
      <div>
        <p className="text-white font-semibold text-sm">{name}</p>
        <p className="text-[var(--color-accent)] text-xs">{persona}</p>
      </div>
    </motion.div>
  )
}

// ─── Main App ───
export default function App() {
  useMousePosition()
  const { scrollYProgress } = useScroll()

  // Screenshot slideshow
  const [currentImage, setCurrentImage] = useState(0)
  const screenshots = ['/screenshot-journal.png', '/screenshot-auth.png']

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % screenshots.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Phone rotation based on scroll
  const phoneRotateY = useTransform(scrollYProgress, [0, 0.15, 0.3], [15, 0, -10])
  const phoneRotateX = useTransform(scrollYProgress, [0, 0.15, 0.3], [5, 0, 5])
  const smoothRotateY = useSpring(phoneRotateY, { stiffness: 100, damping: 30 })
  const smoothRotateX = useSpring(phoneRotateX, { stiffness: 100, damping: 30 })

  return (
    <div className="min-h-screen bg-black spotlight grid-bg">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-6 h-6 text-[var(--color-accent)]" />
            <span className="font-bold text-lg">Music Memory</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
            <a href="#download" className="hover:text-white transition-colors">Download</a>
          </div>
          <a
            href="#download"
            className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[var(--color-accent-dark)] transition-colors"
          >
            Get the App
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="min-h-screen flex items-center justify-center pt-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full px-4 py-1.5 mb-6">
              <Music className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="text-sm text-[var(--color-accent)] font-medium">Your music journal</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
              Never forget the story behind{' '}
              <span className="gradient-text">a song</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
              Capture the moments, emotions, and memories behind every song you love. 
              Your music is more than a playlist — it's your autobiography.
            </p>
            <StoreButtons className="mb-8" />
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-semibold">4.9</span> on App Store
              </div>
              <div className="text-gray-600">|</div>
              <div><Counter target={8400} suffix="+" /> memories preserved</div>
            </div>
          </motion.div>

          {/* Right — 3D Phone */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
            style={{ perspective: 1000 }}
          >
            <motion.div
              style={{
                rotateY: smoothRotateY,
                rotateX: smoothRotateX,
                transformStyle: 'preserve-3d',
              }}
            >
              <PhoneMockup>
                {/* Real app screenshots with crossfade */}
                <div className="w-full h-full relative bg-black overflow-hidden rounded-[2.5rem]">
                  {screenshots.map((src, idx) => (
                    <img
                      key={src}
                      src={src}
                      alt={`App screenshot ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                      style={{ opacity: currentImage === idx ? 1 : 0 }}
                    />
                  ))}
                </div>
              </PhoneMockup>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-600" />
        </motion.div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white"><Counter target={8400} suffix="+" /></div>
            <div className="text-sm text-gray-500 mt-1">Memories preserved</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white"><Counter target={4} suffix=".9★" /></div>
            <div className="text-sm text-gray-500 mt-1">App Store rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white"><Counter target={50} suffix="+" /></div>
            <div className="text-sm text-gray-500 mt-1">Countries</div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Everything you need to{' '}
              <span className="gradient-text">remember</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              More than a playlist. A living journal of your life through music.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={BookOpen}
              title="Music Journal"
              description="Write the story behind every song. When you first heard it, where you were, what you were feeling."
              delay={0}
            />
            <FeatureCard
              icon={Camera}
              title="Photos & Videos"
              description="Attach photos and videos to your memories. The concert clip, the sunset, the road trip selfie."
              delay={0.1}
            />
            <FeatureCard
              icon={MapPin}
              title="Location Tagging"
              description="Pin where you were when a song first hit you. Build a map of your musical life."
              delay={0.2}
            />
            <FeatureCard
              icon={Users}
              title="Community"
              description="See how strangers around the world experienced the same song. Their stories, photos, and videos."
              delay={0.3}
            />
            <FeatureCard
              icon={Music}
              title="Apple Music Integration"
              description="Search millions of songs instantly. Album art, artist info, and metadata pulled automatically."
              delay={0.4}
            />
            <FeatureCard
              icon={Smartphone}
              title="Collections"
              description="Organise your memories into themed collections. Road trips, heartbreaks, summer anthems."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              How it <span className="gradient-text">works</span>
            </h2>
            <p className="text-gray-400 text-lg">Three steps. Less than a minute.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Search a song', desc: 'Find any song from the Apple Music catalog in seconds.' },
              { step: '02', title: 'Write your memory', desc: 'What were you doing? Where were you? How did it make you feel?' },
              { step: '03', title: 'Preserve forever', desc: 'Your memory is saved with the date, location, photos, and your words.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-6xl font-extrabold text-[var(--color-accent)]/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Loved by <span className="gradient-text">music lovers</span>
            </h2>
            <p className="text-gray-400 text-lg">Join thousands who are preserving their musical memories.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              name="Sarah Jenkins"
              persona="Playlist curator"
              text="I finally have a place to dump those 'where was I when I first heard this' thoughts. It's like a digital scrapbook for my ears."
              delay={0}
            />
            <TestimonialCard
              name="Tyler Brooks"
              persona="Concert-goer"
              text="Tagging my location and a quick journal entry changed everything. It's therapeutic to look back and see my life through songs."
              delay={0.1}
            />
            <TestimonialCard
              name="David Chen"
              persona="Late-night listener"
              text="I wrote a journal entry for my first listen of a Radiohead song at 3 AM. Looking back a year later felt like a total time machine."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ─── CTA / Download ─── */}
      <section id="download" className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
              Start preserving your{' '}
              <span className="gradient-text">music memories</span>{' '}
              today
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Free to download. Your first memory takes less than a minute.
            </p>
            <StoreButtons className="justify-center" />
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-[var(--color-accent)]" />
            <span className="font-bold">Music Memory</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-sm text-gray-600">© 2026 Music Memory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
