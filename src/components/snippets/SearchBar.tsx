'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { useUIStore } from '@/lib/store/uiStore'

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useUIStore()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  // Debounce search query updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, setSearchQuery])

  const handleClear = () => {
    setLocalQuery('')
    setSearchQuery('')
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--editorial-muted)' }} />
      <Input
        type="text"
        placeholder="Search snippets by title or description..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="pl-10 pr-9 h-10 rounded-sm border-[var(--editorial-rule)] focus:border-[var(--editorial-ink)] text-sm"
        style={{ backgroundColor: 'var(--editorial-bg-alt)', color: 'var(--editorial-ink)' }}
      />
      {localQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
          style={{ color: 'var(--editorial-muted)' }}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
