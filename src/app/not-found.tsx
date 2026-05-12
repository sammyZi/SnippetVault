import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--editorial-bg)' }}>
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-6 h-px" style={{ backgroundColor: 'var(--editorial-accent)' }} />
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--editorial-accent)' }}>
            Not Found
          </span>
          <div className="w-6 h-px" style={{ backgroundColor: 'var(--editorial-accent)' }} />
        </div>
        <h1 className="text-7xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>404</h1>
        <h2 className="text-lg font-medium mb-2" style={{ color: 'var(--editorial-ink)' }}>Page Not Found</h2>
        <p className="text-sm mb-8" style={{ color: 'var(--editorial-muted)' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 h-10 px-6 text-sm font-semibold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: 'var(--editorial-ink)', color: 'var(--editorial-bg)' }}
        >
          Go home →
        </Link>
      </div>
    </div>
  )
}
