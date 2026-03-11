'use client'

import { PublicSnippetCard } from './PublicSnippetCard'
import { Database } from '@/lib/database.types'

type Snippet = Database['public']['Tables']['snippets']['Row']

interface SnippetWithTags extends Snippet {
  tags?: Array<{ id: string; name: string }>
}

interface PublicSnippetListProps {
  snippets: SnippetWithTags[]
}

export function PublicSnippetList({ snippets }: PublicSnippetListProps) {
  if (snippets.length === 0) {
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
            No public snippets yet
          </h3>
          <p className="text-neutral-500 text-sm">
            This user hasn't shared any public snippets.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {snippets.map((snippet) => (
        <PublicSnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  )
}
