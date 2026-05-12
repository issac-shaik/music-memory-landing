import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LayoutShell } from '@/components/LayoutShell'

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
  icons: {
    icon: '/favicon.svg',
    apple: '/adaptive-icon.png',
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
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '120',
      bestRating: '5',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
