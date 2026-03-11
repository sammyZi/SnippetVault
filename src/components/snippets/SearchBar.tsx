'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
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

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
      <Input
        type="text"
        placeholder="Search snippets by title or description..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
