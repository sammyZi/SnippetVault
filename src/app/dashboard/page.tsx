import { getUser, getProfile } from '../actions/auth'
import { redirect } from 'next/navigation'
import { Braces, LogOut } from 'lucide-react'
import { DashboardContent } from '@/components/snippets/DashboardContent'

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await getProfile(user.id)

  return (
    <div className="min-h-screen bg-neutral-50 custom-scrollbar">
      <header className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-100">
                <Braces className="w-6 h-6 text-primary-600" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900">SnippetVault</h1>
                <p className="text-sm text-neutral-500">
                  Welcome back, <span className="font-bold text-neutral-700">{profile?.display_name || profile?.username || user.email}</span>
                </p>
              </div>
            </div>
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DashboardContent />
      </main>
    </div>
  )
}
