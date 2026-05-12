'use client'

import { useEffect } from 'react'
import { AlertCircle, Home, RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error boundary:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--editorial-bg)' }}>
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-6 h-px" style={{ backgroundColor: 'var(--editorial-accent)' }} />
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--editorial-accent)' }}>
            Error
          </span>
          <div className="w-6 h-px" style={{ backgroundColor: 'var(--editorial-accent)' }} />
        </div>
        
        <div className="w-16 h-16 rounded-full border-2 border-[var(--editorial-accent)]/30 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(192,69,42,0.06)' }}>
          <AlertCircle className="w-8 h-8" style={{ color: 'var(--editorial-accent)' }} />
        </div>
        
        <h1 className="text-5xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>Oops!</h1>
        <h2 className="text-lg font-medium mb-3" style={{ color: 'var(--editorial-ink)' }}>Something went wrong</h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--editorial-muted)' }}>
          An unexpected error occurred. Please try again.
        </p>
        {error.digest && (
          <p className="text-[10px] tracking-[0.1em] uppercase font-mono mb-6 px-3 py-2 rounded-sm border border-[var(--editorial-rule)]" style={{ color: 'var(--editorial-muted)', backgroundColor: 'var(--editorial-bg-alt)' }}>
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="h-10 px-5 flex items-center gap-2 text-sm font-semibold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: 'var(--editorial-ink)', color: 'var(--editorial-bg)' }}
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </button>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="h-10 px-5 flex items-center gap-2 text-sm font-medium rounded-full border border-[var(--editorial-rule)] transition-all hover:bg-[var(--editorial-bg-alt)]"
            style={{ color: 'var(--editorial-ink)' }}
          >
            <Home className="w-4 h-4" />
            Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
