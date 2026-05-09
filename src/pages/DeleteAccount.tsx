export default function DeleteAccount() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-gray-300">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Delete Account</h1>
        <p className="text-lg text-gray-400">
          We're sorry to see you go. If you wish to delete your Music Memory account and all associated data, follow the instructions below.
        </p>
      </div>
      
      <div className="space-y-8 glass p-8 rounded-3xl border border-red-500/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900" />
        
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to request account deletion</h2>
          <p className="leading-relaxed mb-4">
            [Provide instructions here. E.g., Contact us at support@musicmemory.com or use the delete button inside the app settings.]
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li>Open the Music Memory app</li>
            <li>Go to Settings</li>
            <li>Scroll down and tap "Delete Account"</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What happens when you delete your account?</h2>
          <p className="leading-relaxed">
            All your memories, journals, linked media, and account details will be permanently removed from our servers. This action cannot be undone.
          </p>
        </section>
      </div>
    </div>
  )
}
