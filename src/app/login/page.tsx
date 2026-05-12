import { LoginForm } from '@/components/auth/LoginForm'
import { Braces } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--editorial-bg)' }}>
      {/* Top bar */}
      <div className="w-full border-b border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center h-8">
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--editorial-muted)' }}>
            SV / 2026 · AUTHENTICATION · SIGN IN
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="w-full border-b border-[var(--editorial-rule)]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <Braces className="w-4 h-4" style={{ color: 'var(--editorial-accent)' }} strokeWidth={2.5} />
            <span className="text-lg" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>
              SnippetVault
            </span>
          </Link>
          <Link
            href="/signup"
            className="text-[13px] font-medium transition-colors hover:text-[var(--editorial-ink)]"
            style={{ color: 'var(--editorial-muted)' }}
          >
            Create account →
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
