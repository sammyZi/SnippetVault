import { Braces } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen custom-scrollbar" style={{ backgroundColor: 'var(--editorial-bg)' }}>
      {/* Top bar */}
      <div className="w-full border-b border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-8">
          <div className="h-3 w-48 rounded-sm animate-pulse" style={{ backgroundColor: 'var(--editorial-rule)' }} />
        </div>
      </div>

      {/* Header skeleton */}
      <header className="border-b border-[var(--editorial-rule)] sticky top-0 z-30" style={{ backgroundColor: 'var(--editorial-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border border-[var(--editorial-rule)] animate-pulse flex items-center justify-center" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
                <Braces className="w-4.5 h-4.5" style={{ color: 'var(--editorial-muted)' }} strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-24 rounded-sm animate-pulse" style={{ backgroundColor: 'var(--editorial-rule)' }} />
                <div className="h-3 w-32 rounded-sm animate-pulse" style={{ backgroundColor: 'var(--editorial-rule)' }} />
              </div>
            </div>
            <div className="h-9 w-9 rounded-full animate-pulse" style={{ backgroundColor: 'var(--editorial-rule)' }} />
          </div>
        </div>
      </header>

      {/* Content skeleton */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-7 w-40 rounded-sm" style={{ backgroundColor: 'var(--editorial-rule)' }} />
            <div className="h-4 w-52 rounded-sm" style={{ backgroundColor: 'var(--editorial-rule)' }} />
          </div>
          <div className="h-10 w-32 rounded-full" style={{ backgroundColor: 'var(--editorial-rule)' }} />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="h-10 w-full max-w-md rounded-sm" style={{ backgroundColor: 'var(--editorial-rule)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 rounded-sm border border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg-alt)' }} />
          ))}
        </div>
      </main>
    </div>
  )
}
