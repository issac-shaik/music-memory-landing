import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Music Memory — the rules governing your use of our service.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24" style={{ color: 'var(--ink-90)' }}>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8" style={{ color: 'var(--ink)' }}>Terms of Service</h1>

      <div className="space-y-8 glass p-8 rounded-3xl">
        <p className="leading-relaxed text-sm" style={{ color: 'var(--ink-90)' }}>
          <strong>Effective Date:</strong> May 10, 2026
        </p>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and Moonveil Labs (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), governing your access to and use of the Music Memory mobile application and related services (collectively, the &ldquo;Service&rdquo;). By downloading, installing, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must immediately cease all use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>2. Description of Service</h2>
          <p className="leading-relaxed mb-4">
            Music Memory is a personal music journaling application that enables users to create, store, and optionally share memories associated with songs. The Service includes, but is not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>Creating journal entries linked to songs via Apple Music integration</li>
            <li>Uploading media attachments (photographs and videos) to accompany entries</li>
            <li>Associating location data with entries</li>
            <li>Organizing entries into collections</li>
            <li>Sharing entries publicly with the community</li>
            <li>Interacting with other users&apos; public entries through reactions and comments</li>
            <li>Submitting and voting on feature requests</li>
            <li>Maintaining journaling streaks</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>3. Eligibility</h2>
          <p className="leading-relaxed">
            You must be at least thirteen (13) years of age to use the Service. If you are between the ages of thirteen (13) and eighteen (18), you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf. By using the Service, you represent and warrant that you meet the foregoing eligibility requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>4. Account Registration and Security</h2>
          <p className="leading-relaxed mb-4">
            To access certain features of the Service, you must create an account using one of the following authentication methods: email and password, Apple Sign-In, or Google Sign-In. You agree to:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain the security and confidentiality of your login credentials</li>
            <li>Promptly notify us of any unauthorized access to or use of your account</li>
            <li>Accept responsibility for all activities that occur under your account</li>
          </ul>
          <p className="leading-relaxed mt-4">
            We offer optional two-factor authentication (TOTP) with recovery codes. While not mandatory, we strongly recommend enabling this feature for enhanced account security. You are solely responsible for safeguarding your recovery codes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>5. Subscription and Payment</h2>
          <p className="leading-relaxed mb-4">
            The Service operates on a freemium model:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li><strong>Free Tier:</strong> Users may create up to one (1) journal entry per calendar day. Entries remain private.</li>
            <li><strong>Pro Tier:</strong> Subscribers receive unlimited journal entries and the ability to make entries publicly visible to the community.</li>
          </ul>
          <p className="leading-relaxed mt-4">
            Subscriptions are managed through RevenueCat and processed via the Apple App Store or Google Play Store, as applicable. All billing, renewal, and cancellation are governed by the respective platform&apos;s terms. Upon expiration or cancellation of a Pro subscription, all public entries will be automatically reverted to private status.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>6. User Content</h2>
          <p className="leading-relaxed mb-4">
            &ldquo;User Content&rdquo; means any text, images, videos, location data, or other materials that you submit, upload, or otherwise make available through the Service. You retain all ownership rights in your User Content. By submitting User Content, you grant Moonveil Labs a non-exclusive, worldwide, royalty-free, sublicensable license to use, store, display, reproduce, and distribute your User Content solely for the purpose of operating and providing the Service.
          </p>
          <p className="leading-relaxed mb-4">
            You represent and warrant that:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>You own or have the necessary rights and permissions to submit your User Content</li>
            <li>Your User Content does not infringe upon the intellectual property rights, privacy rights, or any other rights of any third party</li>
            <li>Your User Content complies with these Terms and our Community Guidelines</li>
          </ul>
          <p className="leading-relaxed mt-4">
            Journal entries are limited to five hundred (500) words. Media uploads are limited to five (5) files per entry, with individual file size limits of ten (10) megabytes for images and fifty (50) megabytes for videos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>7. Prohibited Conduct</h2>
          <p className="leading-relaxed mb-4">
            You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>Use the Service for any unlawful purpose or in violation of any applicable law or regulation</li>
            <li>Post content that is defamatory, obscene, pornographic, abusive, threatening, or otherwise objectionable</li>
            <li>Harass, bully, intimidate, or threaten other users</li>
            <li>Impersonate any person or entity, or falsely represent your affiliation with any person or entity</li>
            <li>Upload malicious software, viruses, or any code of a destructive nature</li>
            <li>Attempt to gain unauthorized access to the Service, other user accounts, or our systems</li>
            <li>Circumvent, disable, or otherwise interfere with security-related features of the Service</li>
            <li>Use automated means (bots, scrapers, crawlers) to access or collect data from the Service</li>
            <li>Engage in any activity that disrupts or interferes with the Service</li>
            <li>Submit false or malicious reports against other users</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>8. Content Moderation and Enforcement</h2>
          <p className="leading-relaxed mb-4">
            We employ automated and community-driven moderation systems to maintain the integrity of the Service. Entries that receive reports from the community may be flagged for review. Entries that accumulate a significant number of reports may be permanently restricted from public visibility, and the associated account may receive a strike.
          </p>
          <p className="leading-relaxed mb-4">
            Our enforcement actions include, but are not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>Flagging content for review</li>
            <li>Forcing content to private status (irreversible)</li>
            <li>Issuing strikes against user accounts</li>
            <li>Suspending accounts upon accumulation of three (3) strikes</li>
          </ul>
          <p className="leading-relaxed mt-4">
            Suspended users are prohibited from making entries public. We reserve the right to remove content and suspend or terminate accounts at our sole discretion, with or without notice, for conduct that we determine violates these Terms or is harmful to other users or the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>9. Third-Party Services</h2>
          <p className="leading-relaxed mb-4">
            The Service integrates with third-party services, including but not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li><strong>Apple Music:</strong> For song search and catalog data. Subject to Apple&apos;s terms of use.</li>
            <li><strong>RevenueCat:</strong> For subscription management and payment processing.</li>
            <li><strong>Supabase:</strong> For authentication and data storage.</li>
            <li><strong>OpenStreetMap/Nominatim:</strong> For location search functionality.</li>
          </ul>
          <p className="leading-relaxed mt-4">
            Your use of these third-party services is subject to their respective terms and privacy policies. We are not responsible for the practices or content of any third-party services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>10. Intellectual Property</h2>
          <p className="leading-relaxed">
            The Service, including its original content (excluding User Content), features, functionality, design, and underlying technology, is and shall remain the exclusive property of Moonveil Labs and its licensors. The Service is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of the Service without our prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>11. Account Termination and Deletion</h2>
          <p className="leading-relaxed mb-4">
            You may request deletion of your account at any time through the Settings screen within the application. Upon initiating account deletion:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>Your account will enter a fourteen (14) day grace period during which deletion may be cancelled by signing back in</li>
            <li>During the grace period, your profile and content will be hidden from public view</li>
            <li>After the grace period expires, all associated data will be permanently and irreversibly deleted, including journal entries, media files, reactions, reports, and authentication credentials</li>
          </ul>
          <p className="leading-relaxed mt-4">
            We reserve the right to terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>12. Data Export</h2>
          <p className="leading-relaxed">
            You may export your journal entries in Markdown format at any time through the Settings screen. We encourage users to maintain personal backups of their data. Exported data includes song names, artist names, journal text, dates, and location information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>13. Disclaimer of Warranties</h2>
          <p className="leading-relaxed">
            THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND COURSE OF DEALING. MOONVEIL LABS DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>14. Limitation of Liability</h2>
          <p className="leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MOONVEIL LABS, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (C) ANY CONTENT OBTAINED FROM THE SERVICE; OR (D) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>15. Indemnification</h2>
          <p className="leading-relaxed">
            You agree to defend, indemnify, and hold harmless Moonveil Labs and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys&apos; fees, arising out of or in any way connected with your access to or use of the Service, your User Content, or your violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>16. Modifications to Terms</h2>
          <p className="leading-relaxed">
            We reserve the right to modify these Terms at any time. We will provide notice of material changes by updating the &ldquo;Effective Date&rdquo; at the top of these Terms and, where practicable, by providing in-app notification. Your continued use of the Service following the posting of revised Terms constitutes your acceptance of such changes. If you do not agree to the modified Terms, you must discontinue use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>17. Governing Law</h2>
          <p className="leading-relaxed">
            These Terms shall be governed by and construed in accordance with applicable law, without regard to conflict of law principles. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>18. Severability</h2>
          <p className="leading-relaxed">
            If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it valid and enforceable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>19. Entire Agreement</h2>
          <p className="leading-relaxed">
            These Terms, together with our Privacy Policy and Community Guidelines, constitute the entire agreement between you and Moonveil Labs regarding the Service and supersede all prior agreements, understandings, and communications, whether written or oral.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>20. Contact Information</h2>
          <p className="leading-relaxed">
            For questions, concerns, or notices regarding these Terms, please contact us at:
          </p>
          <p className="leading-relaxed mt-2">
            <strong className="" style={{ color: 'var(--ink)' }}>Moonveil Labs</strong><br />
            Email: <a href="mailto:support@musicmemory.app" className="hover:underline" style={{ color: 'var(--accent)' }}>support@musicmemory.app</a>
          </p>
        </section>
      </div>
    </div>
  )
}
