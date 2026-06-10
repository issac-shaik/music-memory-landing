// Single source of truth for the FAQ: rendered on the home page section and
// the /faq page, and embedded as FAQPage JSON-LD. Keep answerHtml (visible
// markup) and answerText (structured data) saying the same thing — Google
// requires the JSON-LD to match the visible content.

export interface FaqEntry {
  question: string
  /** Rich markup rendered inside the <details> answer. */
  answerHtml: string
  /** Plain-text version embedded in the FAQPage JSON-LD. */
  answerText: string
  /** When true, the visible answer is the live regional-pricing React island. */
  pricing?: boolean
}

export const FAQ: FaqEntry[] = [
  {
    question: 'What is Music Memory?',
    answerHtml:
      '<p>Music Memory is a <strong>music journal and song diary app</strong> for tracking the songs of your life. You log songs, tag the date and place you first heard each one, write down what you felt, and attach photos — building a private archive of your music memories over time. Think of it as a diary, but the entries are songs.</p>',
    answerText:
      'Music Memory is a music journal and song diary app for tracking the songs of your life. You can log songs, tag the date and place you first heard each one, write down what you felt, and attach photos — building a private archive of your music memories over time.',
  },
  {
    question: 'Is Music Memory a music journal app?',
    answerHtml:
      '<p>Yes. Music Memory is a music journal app — also called a <em>song diary</em>, <em>music diary</em>, or <em>music memory tracker</em>. It is designed for people who want to remember the songs that scored their life: every entry links one song to a moment, a place, and a feeling.</p>',
    answerText:
      'Yes. Music Memory is a music journal app (also called a song diary or music diary) designed for people who want to remember the songs that scored their life. Every entry links a song to a moment, a place, and a feeling.',
  },
  {
    question: 'How is Music Memory different from a playlist?',
    answerHtml:
      '<p>A playlist is a list of songs. Music Memory is a <strong>journal of memories attached to songs</strong>. Each entry includes when and where you first heard the track, what you were doing, and how it made you feel — so your listening history reads like a story instead of a queue.</p>',
    answerText:
      'A playlist is a list of songs. Music Memory is a journal of memories attached to songs. Each entry includes when and where you first heard the track, what you were doing, and how it made you feel — turning your listening history into a story.',
  },
  {
    question: 'Can I track songs I have listened to over the years?',
    answerHtml:
      '<p>Yes. You can <strong>backfill memories</strong> for songs you heard years ago — pin a date (even just a year or a season), add a place, and write a short memory. The app organises your songs into a chronological timeline of months and chapters.</p>',
    answerText:
      'Yes. Music Memory lets you backfill memories for songs you heard years ago — pin a date (even just a year or season), add a place, and write a short memory. The app organises your songs into a chronological timeline.',
  },
  {
    question: 'Does Music Memory work with Apple Music and Spotify?',
    answerHtml:
      '<p>Music Memory pulls songs directly from the <strong>Apple Music catalogue</strong> so the real cover art and metadata attach to your entries, and you can play tracks from the app. You can also <strong>export a Music Memory collection back to Apple Music</strong> as a real playlist. Spotify support will be coming in the future.</p>',
    answerText:
      'Music Memory pulls songs directly from the Apple Music catalogue so the real cover art and metadata attach to your entries, and you can export a collection back to Apple Music as a real playlist. Spotify support is coming in the future.',
  },
  {
    question: 'Is Music Memory free?',
    pricing: true,
    answerHtml:
      '<p>No — Music Memory is a subscription. You get a <strong>3-day free trial</strong>, then Pro is $9.99/month or $49.99/year (prices vary by region). Pro includes unlimited memories, photos and videos, location tagging, and access to the public song memory feed.</p>',
    answerText:
      'Music Memory is a subscription with a 3-day free trial. Music Memory Pro unlocks unlimited entries, photos and videos, location tagging, and access to the public song memory feed. Pro is $49.99/year or $9.99/month (prices vary by region and are shown in your local currency where available).',
  },
  {
    question: 'Is Music Memory available on iPhone and Android?',
    answerHtml:
      '<p>Music Memory is <strong>coming soon</strong> to the iOS App Store and the Google Play Store. Join the waitlist to be notified on launch day.</p>',
    answerText:
      'Music Memory is coming soon to the iOS App Store and the Google Play Store. Join the waitlist on musicmemory.app to be notified on launch day.',
  },
  {
    question: 'Is my music journal private?',
    answerHtml:
      '<p>Every memory is <strong>private by default</strong>. You can choose to share an individual memory to a song’s public feed, but nothing is public unless you opt in per memory.</p>',
    answerText:
      'Yes. Every memory is private by default. You can choose to share an individual memory to a song’s public feed, but nothing is public unless you opt in.',
  },
]

export function faqJsonLd(site = 'https://musicmemory.app') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${site}/#faq`,
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answerText },
    })),
  }
}
