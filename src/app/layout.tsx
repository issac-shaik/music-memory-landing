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
    default: 'Music Memory — Music Journal, Song Diary & Memory Tracker App',
    template: '%s | Music Memory — Music Journal App',
  },
  description:
    'Music Memory is the music journal and song diary app for tracking the songs of your life. Log songs, tag where you first heard them, write what you felt, and build a private archive of your music memories. Free on iOS and Android.',
  applicationName: 'Music Memory',
  authors: [{ name: 'Moonveil Labs' }],
  creator: 'Moonveil Labs',
  publisher: 'Moonveil Labs',
  category: 'Lifestyle',
  keywords: [
    'music journal',
    'music journal app',
    'song tracker',
    'song tracker app',
    'music diary',
    'music diary app',
    'song diary',
    'music memory',
    'music memory app',
    'track songs',
    'track songs you listened to',
    'music memories',
    'song journal',
    'music log',
    'listening journal',
    'log songs',
    'remember songs',
    'songs of my life',
    'music timeline',
    'music memory tracker',
    'apple music journal',
    'spotify journal',
  ],
  metadataBase: new URL('https://musicmemory.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': 'https://musicmemory.app',
      'x-default': 'https://musicmemory.app',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Music Memory',
    url: 'https://musicmemory.app',
    title: 'Music Memory — Music Journal, Song Diary & Memory Tracker App',
    description:
      'Track the songs of your life. A music journal and song diary to log songs, tag the moments you first heard them, and build an archive of your music memories. iOS & Android.',
    images: [
      {
        url: '/image.png',
        width: 1200,
        height: 630,
        alt: 'Music Memory — the music journal and song diary app',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music Memory — Music Journal & Song Diary App',
    description:
      'The music journal and song diary app for tracking the songs of your life. Log songs, places, dates and memories. iOS & Android.',
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
  appleWebApp: {
    title: 'Music Memory',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  other: {
    'apple-itunes-app': 'app-id=PLACEHOLDER_APPLE_APP_ID',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    '@id': 'https://musicmemory.app/#app',
    name: 'Music Memory',
    alternateName: ['Music Memory App', 'Music Memory — Music Journal', 'Music Diary'],
    description:
      'Music Memory is a music journal and song diary app for tracking the songs of your life. Log songs, tag the dates and places you first heard them, write what you felt, and build a private archive of your music memories.',
    applicationCategory: 'LifestyleApplication',
    applicationSubCategory: 'Music Journal',
    operatingSystem: 'iOS, Android',
    url: 'https://musicmemory.app',
    image: 'https://musicmemory.app/image.png',
    screenshot: [
      'https://musicmemory.app/screenshot-journal.png',
      'https://musicmemory.app/screenshot-entry.png',
      'https://musicmemory.app/Search_Songs.png',
      'https://musicmemory.app/Collections.png',
      'https://musicmemory.app/Export_Apple_Music.png',
    ],
    featureList: [
      'Music journal',
      'Song diary',
      'Track songs you listened to',
      'Tag dates and places',
      'Attach photos and videos to songs',
      'Group songs into collections',
      'Export collections to Apple Music',
      'Daily song streak',
      'Public song memory feed',
    ],
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
    author: {
      '@id': 'https://musicmemory.app/#org',
    },
  }

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://musicmemory.app/#software',
    name: 'Music Memory',
    description:
      'Music journal and song diary app to track the songs of your life — when you first heard them, where you were, and what you felt.',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'iOS, Android',
    url: 'https://musicmemory.app',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://musicmemory.app/#org',
    name: 'Moonveil Labs',
    url: 'https://musicmemory.app',
    logo: 'https://musicmemory.app/adaptive-icon.png',
    sameAs: [],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://musicmemory.app/#website',
    url: 'https://musicmemory.app',
    name: 'Music Memory',
    description:
      'The music journal and song diary app for tracking the songs of your life.',
    inLanguage: 'en-US',
    publisher: { '@id': 'https://musicmemory.app/#org' },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Music Memory?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Music Memory is a music journal and song diary app for tracking the songs of your life. You can log songs, tag the date and place you first heard each one, write down what you felt, and attach photos — building a private archive of your music memories over time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Music Memory a music journal app?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Music Memory is a music journal app (also called a song diary or music diary) designed for people who want to remember the songs that scored their life. Every entry links a song to a moment, a place, and a feeling.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is Music Memory different from a playlist?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A playlist is a list of songs. Music Memory is a journal of memories attached to songs. Each entry includes when and where you first heard the track, what you were doing, and how it made you feel — turning your listening history into a story.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I track songs I have listened to over the years?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Music Memory lets you backfill memories for songs you heard years ago — pin a date (even just a year or season), add a place, and write a short memory. The app organises your songs into a chronological timeline.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Music Memory work with Apple Music and Spotify?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Music Memory pulls songs directly from the Apple Music catalogue so you can attach the real cover art and link out to play the track. You can also export a collection back to Apple Music as a playlist. Spotify deep-links are supported on song entries.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Music Memory free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The free tier lets you log one music memory per day, forever. Music Memory Pro unlocks unlimited entries, photos and videos, location tagging, and access to the public song memory feed. Pro is $29.99/year or $4.99/month with a 3-day free trial.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Music Memory available on iPhone and Android?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Music Memory is available on the iOS App Store and the Google Play Store.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my music journal private?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every memory is private by default. You can choose to share an individual memory to a song’s public feed, but nothing is public unless you opt in.',
        },
      },
    ],
  }

  return (
    <html lang="en" className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="canonical" href="https://musicmemory.app/" />
        <link
          rel="preload"
          href="/screenshot-journal.webp"
          as="image"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="v2 prod">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
