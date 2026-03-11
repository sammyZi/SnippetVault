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
  // If we have snippets, show them (even if still loading for updates)
  if (snippets.length > 0) {
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

  // If loading and no snippets yet, show skeleton
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

  // Not loading and no snippets = empty state
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          No snippets yet
        </h3>
        <p className="text-neutral-500 text-sm">
          Create your first code snippet to get started with your collection!
        </p>
      </div>
    </div>
  )
}
