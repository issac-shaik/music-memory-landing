import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LayoutShell } from '@/components/LayoutShell'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-mono',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: {
    default: 'Music Memory — Your Music Journal',
    template: '%s | Music Memory',
  },
  description:
    'Capture the moments, emotions, and memories behind every song you love. Your music is more than a playlist — it\'s your autobiography.',
  metadataBase: new URL('https://musicmemory.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Music Memory',
    title: 'Music Memory — Your Music Journal',
    description:
      'Capture the moments, emotions, and memories behind every song you love. Your music is more than a playlist — it\'s your autobiography.',
    images: [
      {
        url: '/image.png',
        width: 1200,
        height: 630,
        alt: 'Music Memory App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music Memory — Your Music Journal',
    description:
      'Capture the moments, emotions, and memories behind every song you love.',
    images: ['/image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Music Memory',
    description:
      'Capture the moments, emotions, and memories behind every song you love. Your music is more than a playlist — it\'s your autobiography.',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '49.99',
      priceCurrency: 'USD',
      description: 'Annual subscription with a 3-day free trial. Monthly available at 9.99 USD.',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '120',
      bestRating: '5',
    },
  }

  return (
    <html lang="en" className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="preload"
          href="/screenshot-journal.webp"
          as="image"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="v2 prod">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
