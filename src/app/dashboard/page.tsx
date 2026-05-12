import { getUser, getProfile } from '../actions/auth'
import { redirect } from 'next/navigation'
import { Braces } from 'lucide-react'
import { DashboardContent } from '@/components/snippets/DashboardContent'
import { UserMenu } from '@/components/auth/UserMenu'

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await getProfile(user.id)

  return (
    <div className="min-h-screen custom-scrollbar" style={{ backgroundColor: 'var(--editorial-bg)' }}>
      {/* Top ticker bar */}
      <div className="w-full border-b border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-8">
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--editorial-muted)' }}>
            SV / 2026 · DASHBOARD · MY COLLECTION
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-[var(--editorial-rule)] sticky top-0 z-30" style={{ backgroundColor: 'var(--editorial-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
                <Braces className="w-4.5 h-4.5" style={{ color: 'var(--editorial-accent)' }} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-lg tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>SnippetVault</h1>
                <p className="text-[11px] tracking-wide" style={{ color: 'var(--editorial-muted)' }}>
                  Welcome back, <span className="font-semibold" style={{ color: 'var(--editorial-ink)' }}>{profile?.display_name || profile?.username || user.email}</span>
                </p>
              </div>
            </div>
            <UserMenu 
              profile={profile}
              email={user.email || ''}
            />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <DashboardContent />
      </main>
    </div>
  )
}
