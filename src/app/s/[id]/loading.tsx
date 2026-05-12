
import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4" style={{ backgroundColor: 'var(--editorial-bg)' }}>
      <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--editorial-accent)' }} />
      <p className="text-sm font-medium animate-pulse" style={{ color: 'var(--editorial-muted)' }}>Loading snippet...</p>
    </div>
  )
}
