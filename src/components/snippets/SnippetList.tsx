'use client'

import { SnippetCard } from './SnippetCard'
import { SnippetWithTags } from '@/lib/services/snippets'

interface SnippetListProps {
  snippets: SnippetWithTags[]
  onEdit: (snippet: SnippetWithTags) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

export function SnippetList({ snippets, onEdit, onDelete, isLoading }: SnippetListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-neutral-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (snippets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">No snippets found. Create your first snippet to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {snippets.map((snippet) => (
        <SnippetCard
          key={snippet.id}
          snippet={snippet}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
