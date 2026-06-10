import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community Guidelines',
  description: 'Community Guidelines for Music Memory — rules for participating in our community features.',
  alternates: { canonical: '/community-guidelines' },
}

export default function CommunityGuidelinesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24" style={{ color: 'var(--ink-90)' }}>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8" style={{ color: 'var(--ink)' }}>Community Guidelines</h1>

      <div className="space-y-8 glass p-8 rounded-3xl">
        <p className="leading-relaxed text-sm" style={{ color: 'var(--ink-90)' }}>
          <strong>Effective Date:</strong> June 10, 2026
        </p>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>1. Purpose and Scope</h2>
          <p className="leading-relaxed">
            These Community Guidelines (&ldquo;Guidelines&rdquo;) govern your participation in the community features of the Music Memory application. Community features include, but are not limited to: public journal entries, reactions (likes and dislikes), comments, replies, and feature requests. By using any community feature, you agree to abide by these Guidelines. These Guidelines supplement our Terms of Service and should be read in conjunction therewith.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>2. Community Principles</h2>
          <p className="leading-relaxed mb-4">
            Music Memory is a platform for sharing the personal stories and emotions behind the music that shapes our lives. Our community is built upon the following principles:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li><strong>Authenticity:</strong> Share genuine memories and experiences connected to music.</li>
            <li><strong>Respect:</strong> Treat all community members with dignity and courtesy, regardless of their background, identity, or musical taste.</li>
            <li><strong>Safety:</strong> Maintain an environment where users feel comfortable sharing personal stories.</li>
            <li><strong>Privacy:</strong> Respect the personal nature of others&apos; memories and do not share or screenshot others&apos; content without consent.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>3. Content Standards</h2>
          <p className="leading-relaxed mb-4">
            All publicly shared content must comply with the following standards:
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--ink)' }}>3.1 Permitted Content</h3>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>Personal memories, stories, and reflections associated with songs</li>
            <li>Photographs and videos that relate to your musical memories</li>
            <li>Constructive comments and reactions to others&apos; shared memories</li>
            <li>Location information relevant to where a musical memory took place</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--ink)' }}>3.2 Prohibited Content</h3>
          <p className="leading-relaxed mb-4">
            The following content is strictly prohibited and will result in enforcement action:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li><strong>Hate Speech:</strong> Content that promotes hatred, discrimination, or violence against individuals or groups based on race, ethnicity, national origin, religion, gender, gender identity, sexual orientation, disability, or any other protected characteristic.</li>
            <li><strong>Harassment and Bullying:</strong> Content intended to intimidate, threaten, demean, or target another individual, including repeated unwanted contact, personal attacks, or doxxing.</li>
            <li><strong>Sexually Explicit Material:</strong> Pornographic content, sexually explicit imagery, or content depicting sexual acts.</li>
            <li><strong>Violence and Graphic Content:</strong> Content that glorifies, promotes, or depicts gratuitous violence, gore, or self-harm.</li>
            <li><strong>Spam and Misleading Content:</strong> Repetitive, irrelevant, or deceptive content, including promotional material, phishing attempts, or content designed to manipulate engagement.</li>
            <li><strong>Illegal Activity:</strong> Content that promotes, facilitates, or depicts illegal activities, including drug use, theft, or fraud.</li>
            <li><strong>Intellectual Property Infringement:</strong> Content that infringes upon the copyrights, trademarks, or other intellectual property rights of third parties.</li>
            <li><strong>Personal Information:</strong> Sharing another person&apos;s private information (address, phone number, financial information) without their explicit consent.</li>
            <li><strong>Impersonation:</strong> Pretending to be another person, brand, or entity in a manner intended to deceive.</li>
            <li><strong>Misinformation:</strong> Deliberately false or misleading content that could cause harm.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>4. Interaction Standards</h2>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--ink)' }}>4.1 Comments and Replies</h3>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>Comments must be relevant to the memory or conversation</li>
            <li>Comments are limited to five hundred (500) characters</li>
            <li>Constructive feedback and genuine engagement are encouraged</li>
            <li>Personal attacks, insults, and derogatory language are prohibited</li>
            <li>Excessive commenting or spamming is prohibited</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--ink)' }}>4.2 Reactions</h3>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>Reactions (likes and dislikes) should reflect genuine sentiment</li>
            <li>Coordinated campaigns to mass-dislike a user&apos;s content are prohibited</li>
            <li>Using multiple accounts to manipulate reaction counts is prohibited</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--ink)' }}>4.3 Usernames and Profiles</h3>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>Usernames must not contain offensive, discriminatory, or misleading terms</li>
            <li>Usernames must not impersonate other individuals or entities</li>
            <li>Profile pictures must comply with the content standards outlined in Section 3</li>
            <li>Username changes are subject to a cooldown period to prevent abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>5. Reporting and Moderation</h2>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--ink)' }}>5.1 Reporting Violations</h3>
          <p className="leading-relaxed mb-4">
            If you encounter content or conduct that violates these Guidelines, you may report it using the flag icon. You can report a public entry, an individual comment, or another user&apos;s profile. When submitting a report, you will be asked to select a reason from the following categories:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>Inappropriate content</li>
            <li>Harassment or bullying</li>
            <li>Spam or misleading content</li>
            <li>Hate speech</li>
            <li>Other (with description)</li>
          </ul>
          <p className="leading-relaxed mt-4">
            Each user may submit one (1) report per entry, per comment, or per user. False or malicious reporting is itself a violation of these Guidelines and may result in enforcement action against the reporter.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--ink)' }}>5.2 Moderation Process</h3>
          <p className="leading-relaxed mb-4">
            Our moderation system is automated and operates as follows. To make it resistant to coordinated or repeated reporting, thresholds are measured by the number of <strong>distinct users</strong> who report an entry within a rolling ninety (90) day window — multiple reports from the same person count once, and older reports age out over time.
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li><strong>Flagging:</strong> Content reported by a small number of distinct users is flagged for review. Flagged content remains public and visible.</li>
            <li><strong>Forced Private:</strong> Content reported by a substantial number of distinct users is removed from public visibility. A forced-private entry cannot be made public again by its author; if you believe this was in error, you may appeal (Section 10).</li>
            <li><strong>Strikes:</strong> When an entry is first forced private due to reports, its author&apos;s account receives one (1) strike. Repeated reports on the same already-restricted entry do not add further strikes.</li>
            <li><strong>Suspension:</strong> An account that accumulates three (3) strikes is suspended. A suspended account cannot make any entries public while the suspension is in effect.</li>
            <li><strong>Recovery:</strong> Suspensions are not permanent. A suspension is automatically lifted after thirty (30) days, at which point the account&apos;s strike count is reset to zero, giving you a clean slate. Because reports also age out of the ninety-day window, content and accounts are not penalized indefinitely for past reports.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--ink)' }}>5.3 Profanity Filter</h3>
          <p className="leading-relaxed">
            The Service employs automated profanity detection. Content flagged by the profanity filter may be subject to additional review or automatic restriction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>6. Visibility and Access</h2>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>You control whether each of your entries is public or private. Public entries appear in the community for the relevant song; private entries are visible only to you.</li>
            <li>Entries you have made public — and the media attached to them — remain public and accessible to the community. We do not retroactively hide or privatize your shared memories.</li>
            <li>Community entries for a given song are only visible to users who also have their own entry for that same song.</li>
            <li>You may revert any of your public entries to private at any time.</li>
            <li>An entry that has been forced private through moderation cannot be made public again by its author, subject to appeal (Section 10).</li>
            <li>Suspended users cannot make any entries public while a suspension is in effect. Suspensions lift automatically after thirty (30) days.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>7. Notifications</h2>
          <p className="leading-relaxed">
            When you share content publicly, other users may interact with it. You will receive in-app notifications when someone likes your memory, comments on your entry, or replies to your comment. You may manage notification preferences through your device settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>8. Feature Requests</h2>
          <p className="leading-relaxed mb-4">
            The feature request system allows users to suggest improvements and vote on others&apos; suggestions. When participating:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>Feature requests must be constructive and relevant to the Service</li>
            <li>Duplicate requests should be avoided; vote on existing requests instead</li>
            <li>Feature requests that violate these Guidelines will be removed</li>
            <li>Submission of a feature request does not guarantee implementation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>9. Consequences of Violations</h2>
          <p className="leading-relaxed mb-4">
            Violations of these Guidelines may result in one or more of the following actions, at our sole discretion:
          </p>
          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--ink-90)' }}>
            <li>Removal or restriction of specific content</li>
            <li>Issuance of a warning</li>
            <li>Issuance of a strike against your account</li>
            <li>Suspension of community privileges (automated suspensions lift after thirty (30) days; we may also impose suspensions manually in cases of severe or repeated violations)</li>
            <li>Termination of your account</li>
          </ul>
          <p className="leading-relaxed mt-4">
            The severity of enforcement action will be proportional to the nature and frequency of the violation. We reserve the right to take immediate action without prior warning in cases of severe violations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>10. Appeals</h2>
          <p className="leading-relaxed">
            If you believe that enforcement action was taken against your account or content in error, you may contact us at <a href="mailto:support@musicmemory.app" className="hover:underline" style={{ color: 'var(--accent)' }}>support@musicmemory.app</a> to request a review. Please include your username, a description of the content or action in question, and the reason you believe the action was taken in error. We will review appeals in good faith but are not obligated to reverse any enforcement decision.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>11. Changes to These Guidelines</h2>
          <p className="leading-relaxed">
            We may update these Community Guidelines from time to time to reflect changes in our community standards or Service features. We will notify users of material changes by updating the &ldquo;Effective Date&rdquo; and, where practicable, by providing in-app notification. Your continued use of community features after changes are posted constitutes acceptance of the revised Guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>12. Contact</h2>
          <p className="leading-relaxed">
            For questions about these Community Guidelines, to report violations, or to appeal enforcement actions, please contact us at:
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
