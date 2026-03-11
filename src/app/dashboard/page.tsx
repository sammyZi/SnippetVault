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
    <div className="min-h-screen bg-neutral-50 custom-scrollbar">
      <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200/60 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-md shadow-primary-200">
                <Braces className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900 tracking-tight">SnippetVault</h1>
                <p className="text-xs text-neutral-500">
                  Welcome back, <span className="font-semibold text-neutral-700">{profile?.display_name || profile?.username || user.email}</span>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DashboardContent />
      </main>
    </div>
  )
}
