import Link from 'next/link'
import { ShieldAlert, LogIn, Home } from 'lucide-react'

interface ForbiddenProps {
  message?: string
  showLoginButton?: boolean
}

export function Forbidden({ 
  message = 'You don\'t have permission to access this resource.',
  showLoginButton = true 
}: ForbiddenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--editorial-bg)' }}>
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-6 h-px" style={{ backgroundColor: 'var(--editorial-accent)' }} />
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--editorial-accent)' }}>
            Access Denied
          </span>
          <div className="w-6 h-px" style={{ backgroundColor: 'var(--editorial-accent)' }} />
        </div>
        
        <div className="w-16 h-16 rounded-full border-2 border-[var(--editorial-accent)]/30 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(192,69,42,0.06)' }}>
          <ShieldAlert className="w-8 h-8" style={{ color: 'var(--editorial-accent)' }} />
        </div>
        
        <h1 className="text-7xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>403</h1>
        <h2 className="text-lg font-medium mb-3" style={{ color: 'var(--editorial-ink)' }}>Access Denied</h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--editorial-muted)' }}>
          {message}
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          {showLoginButton && (
            <Link
              href="/login"
              className="h-10 px-5 flex items-center gap-2 text-sm font-semibold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: 'var(--editorial-ink)', color: 'var(--editorial-bg)' }}
            >
              <LogIn className="w-4 h-4" />
              Log In
            </Link>
          )}
          <Link
            href="/dashboard"
            className="h-10 px-5 flex items-center gap-2 text-sm font-medium rounded-full border border-[var(--editorial-rule)] transition-all hover:bg-[var(--editorial-bg-alt)]"
            style={{ color: 'var(--editorial-ink)' }}
          >
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
