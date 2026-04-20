import { Braces } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50 custom-scrollbar">
      <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200/60 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-200 animate-pulse shadow-md">
                <Braces className="w-5 h-5 text-neutral-400" strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-24 bg-neutral-200 rounded animate-pulse" />
                <div className="h-3 w-32 bg-neutral-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-neutral-200 animate-pulse" />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-8 w-40 bg-neutral-200 rounded" />
            <div className="h-4 w-52 bg-neutral-200 rounded" />
          </div>
          <div className="h-10 w-32 bg-neutral-200 rounded-lg" />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="h-10 w-full max-w-md bg-neutral-200 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-neutral-200/60 rounded-xl" />
          ))}
        </div>
      </main>
    </div>
  )
}

