'use client'

import { Code2, Globe, User, Calendar } from 'lucide-react'
import { SyntaxHighlighter } from '@/components/snippets/SyntaxHighlighter'
import { Database } from '@/lib/database.types'

type Snippet = Database['public']['Tables']['snippets']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

interface SnippetWithProfile extends Snippet {
  profile: Profile
  tags?: Array<{ id: string; name: string }>
}

interface SnippetViewProps {
  snippet: SnippetWithProfile
}

export function SnippetView({ snippet }: SnippetViewProps) {
  const formattedDate = new Date(snippet.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="border border-[var(--editorial-rule)] rounded-sm overflow-hidden" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
      {/* Top accent */}
      <div className="h-px w-full" style={{ backgroundColor: 'var(--editorial-accent)' }} />

      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-[var(--editorial-rule)]">
        <h1 className="text-2xl tracking-tight mb-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>
          {snippet.title}
        </h1>
        {snippet.description && (
          <p className="text-base mt-1 mb-3" style={{ color: 'var(--editorial-muted)' }}>
            {snippet.description}
          </p>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-sm mb-4" style={{ color: 'var(--editorial-muted)' }}>
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            <span className="font-medium" style={{ color: 'var(--editorial-ink)' }}>{snippet.profile.display_name || snippet.profile.username}</span>
          </div>
          <span style={{ color: 'var(--editorial-rule)' }}>·</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 font-mono rounded-sm flex items-center gap-1" style={{ backgroundColor: 'var(--editorial-ink)', color: 'var(--editorial-bg)' }}>
            <Code2 className="h-3 w-3" />
            {snippet.language}
          </span>
          {snippet.is_public && (
            <span className="text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 font-mono border rounded-sm flex items-center gap-1 border-green-600/30 text-green-700" style={{ backgroundColor: 'rgba(34,197,94,0.08)' }}>
              <Globe className="h-3 w-3" />
              Public
            </span>
          )}
          {snippet.tags && snippet.tags.length > 0 && (
            snippet.tags.map((tag) => (
              <span key={tag.id} className="text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 font-mono border border-[var(--editorial-rule)] rounded-sm" style={{ color: 'var(--editorial-muted)' }}>
                #{tag.name}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Code */}
      <div className="px-6 py-5">
        <SyntaxHighlighter
          code={snippet.code}
          language={snippet.language}
          showLineNumbers={true}
          showCopyButton={true}
        />
      </div>
    </div>
  )
}
