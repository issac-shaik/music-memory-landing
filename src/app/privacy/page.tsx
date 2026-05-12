import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Music Memory — learn how we collect, use, and protect your data.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-gray-300">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Privacy Policy</h1>

      <div className="space-y-8 glass p-8 rounded-3xl">
        <p className="leading-relaxed text-sm text-gray-400">
          <strong>Effective Date:</strong> May 10, 2026
        </p>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
          <p className="leading-relaxed">
            Moonveil Labs (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the Music Memory mobile application (the &ldquo;Service&rdquo;). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our Service. By accessing or using the Service, you consent to the data practices described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>

          <h3 className="text-lg font-semibold text-white mt-6 mb-3">2.1 Information You Provide Directly</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li><strong>Account Information:</strong> Email address, username, and password (for email registration); or authentication tokens provided by Apple Sign-In or Google Sign-In.</li>
            <li><strong>Profile Information:</strong> Username, profile picture (avatar), and card color preference.</li>
            <li><strong>Journal Entries:</strong> Song name, artist name, journal text (up to 500 words), date first heard, and optional location data (place name, latitude, longitude).</li>
            <li><strong>Media Uploads:</strong> Photographs and videos you attach to journal entries (images up to 10MB, videos up to 50MB, maximum 5 files per entry).</li>
            <li><strong>Comments:</strong> Text content you post on community entries (up to 500 characters).</li>
            <li><strong>Feature Requests:</strong> Titles and descriptions of feature suggestions you submit.</li>
            <li><strong>Onboarding Survey Responses:</strong> Answers to optional questions about your music listening habits and journaling interests.</li>
            <li><strong>Support Communications:</strong> Any information you provide when contacting us for support.</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-6 mb-3">2.2 Information Collected Automatically</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li><strong>Analytics Data:</strong> We use PostHog to collect usage analytics, including screen views, feature interactions, onboarding progress, and error events. You are identified by your Supabase user ID and email address.</li>
            <li><strong>Device Information:</strong> Device model, operating system version, and application version (collected for diagnostics and support purposes).</li>
            <li><strong>Subscription Status:</strong> Information about your subscription tier and entitlements, processed through RevenueCat.</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-6 mb-3">2.3 Information We Do Not Collect</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li><strong>Precise GPS Location:</strong> We do not access your device&apos;s GPS or collect location data automatically. Location information is only stored when you manually search for and select a place using the in-app location picker.</li>
            <li><strong>Contacts or Address Book:</strong> We do not access your device contacts.</li>
            <li><strong>Microphone or Camera (passively):</strong> Camera and photo library access is only used when you actively choose to upload media.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
          <p className="leading-relaxed mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li>To provide, maintain, and improve the Service</li>
            <li>To authenticate your identity and manage your account</li>
            <li>To process and manage your subscription</li>
            <li>To display your public entries to other community members</li>
            <li>To deliver notifications about interactions with your content (likes, comments, replies)</li>
            <li>To enforce our Terms of Service and Community Guidelines</li>
            <li>To detect, prevent, and address fraud, abuse, and security issues</li>
            <li>To analyze usage patterns and improve user experience</li>
            <li>To respond to your support requests and communications</li>
            <li>To send push notifications (with your consent) related to streaks and account activity</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Data Storage and Security</h2>

          <h3 className="text-lg font-semibold text-white mt-6 mb-3">4.1 Storage Infrastructure</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li><strong>Supabase (PostgreSQL):</strong> All structured data including account information, journal entries, profiles, reactions, comments, and notifications.</li>
            <li><strong>Cloudflare R2:</strong> Media files (images, videos, avatars, and collection covers) stored as encrypted objects.</li>
            <li><strong>Cloudflare KV:</strong> Temporary caching of Apple Music API tokens.</li>
            <li><strong>On-Device Storage:</strong> Authentication tokens are stored securely using expo-secure-store (iOS Keychain / Android Keystore). Local preferences are stored using MMKV.</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-6 mb-3">4.2 Security Measures</h3>
          <p className="leading-relaxed">
            We implement industry-standard security measures to protect your data, including: Row Level Security (RLS) policies ensuring users can only access their own data; JWT-based authentication with JWKS verification; secure token storage on-device; HTTPS encryption for all data in transit; and optional two-factor authentication (TOTP). However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
          <p className="leading-relaxed mb-4">
            We share information with the following third-party service providers, solely for the purposes of operating the Service:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li><strong>Supabase:</strong> Authentication, database hosting, and real-time data synchronization. <a href="https://supabase.com/privacy" className="text-blue-400 hover:underline">Privacy Policy</a></li>
            <li><strong>Cloudflare:</strong> Backend infrastructure (Workers), media storage (R2), and content delivery. <a href="https://www.cloudflare.com/privacypolicy/" className="text-blue-400 hover:underline">Privacy Policy</a></li>
            <li><strong>PostHog:</strong> Product analytics and event tracking. Your user ID and email are shared for identification purposes. <a href="https://posthog.com/privacy" className="text-blue-400 hover:underline">Privacy Policy</a></li>
            <li><strong>RevenueCat:</strong> Subscription management and payment processing. Your user ID is shared to manage entitlements. <a href="https://www.revenuecat.com/privacy" className="text-blue-400 hover:underline">Privacy Policy</a></li>
            <li><strong>Apple (Apple Music API, Apple Sign-In):</strong> Song catalog data retrieval and authentication. <a href="https://www.apple.com/legal/privacy/" className="text-blue-400 hover:underline">Privacy Policy</a></li>
            <li><strong>Google (Google Sign-In):</strong> Authentication services. <a href="https://policies.google.com/privacy" className="text-blue-400 hover:underline">Privacy Policy</a></li>
            <li><strong>OpenStreetMap/Nominatim:</strong> Location search queries. Only your search text is transmitted; no personal identifiers are sent. <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" className="text-blue-400 hover:underline">Privacy Policy</a></li>
            <li><strong>Expo (Push Notifications):</strong> Delivery of push notifications to your device. <a href="https://expo.dev/privacy" className="text-blue-400 hover:underline">Privacy Policy</a></li>
          </ul>
          <p className="leading-relaxed mt-4">
            We do not sell, rent, or trade your personal information to third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">6. Data Sharing and Visibility</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li><strong>Private Entries:</strong> By default, all journal entries are private and visible only to you.</li>
            <li><strong>Public Entries:</strong> If you choose to make an entry public (Pro subscription required), your username, avatar, journal text, date first heard, location name, and attached media will be visible to other users who also have an entry for the same song.</li>
            <li><strong>Profile Information:</strong> Your username and avatar are visible to other users when you interact with community features (public entries, comments, reactions).</li>
            <li><strong>Reactions and Comments:</strong> Your reactions (likes/dislikes) and comments on public entries are visible to other users.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
          <p className="leading-relaxed mb-4">
            We retain your personal information for as long as your account is active or as needed to provide the Service. Specifically:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li><strong>Active Accounts:</strong> Data is retained indefinitely while your account remains active.</li>
            <li><strong>Deleted Accounts:</strong> Upon requesting account deletion, your data enters a fourteen (14) day grace period. After this period, all data is permanently and irreversibly purged, including: journal entries, media files (from Cloudflare R2), reactions, reports, comments, survey answers, profile data, and authentication credentials.</li>
            <li><strong>Analytics Data:</strong> Anonymized analytics data may be retained for product improvement purposes after account deletion.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">8. Your Rights and Choices</h2>
          <p className="leading-relaxed mb-4">
            Depending on your jurisdiction, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li><strong>Access:</strong> You may request a copy of the personal data we hold about you.</li>
            <li><strong>Export:</strong> You may export all your journal entries in Markdown format at any time via the Settings screen.</li>
            <li><strong>Correction:</strong> You may update your profile information (username, avatar) through the application.</li>
            <li><strong>Deletion:</strong> You may request complete account deletion through the Settings screen, which initiates a 14-day grace period followed by permanent data purge.</li>
            <li><strong>Withdrawal of Consent:</strong> You may revoke push notification permissions through your device settings at any time.</li>
            <li><strong>Visibility Control:</strong> You may toggle any public entry back to private at any time.</li>
          </ul>
          <p className="leading-relaxed mt-4">
            To exercise any of these rights, please contact us at <a href="mailto:issac.shaik@hotmail.com" className="text-blue-400 hover:underline">issac.shaik@hotmail.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">9. Children&apos;s Privacy</h2>
          <p className="leading-relaxed">
            The Service is not directed to children under the age of thirteen (13). We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child under 13 without parental consent, we will take steps to delete that information promptly. If you believe we have inadvertently collected information from a child under 13, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
          <p className="leading-relaxed">
            Your information may be transferred to and processed in countries other than your country of residence. Our service providers (Supabase, Cloudflare, PostHog, RevenueCat) operate globally. By using the Service, you consent to the transfer of your information to these jurisdictions, which may have data protection laws that differ from those in your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Privacy Policy</h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of material changes by updating the &ldquo;Effective Date&rdquo; at the top of this policy and, where practicable, by providing in-app notification. Your continued use of the Service after any changes constitutes your acceptance of the revised Privacy Policy. We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
          </p>
          <p className="leading-relaxed mt-2">
            <strong className="text-white">Moonveil Labs</strong><br />
            Email: <a href="mailto:issac.shaik@hotmail.com" className="text-blue-400 hover:underline">issac.shaik@hotmail.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}
