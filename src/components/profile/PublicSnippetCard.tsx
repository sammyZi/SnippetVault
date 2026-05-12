'use client'

import Link from 'next/link'
import { Code2, Globe } from 'lucide-react'
import { Database } from '@/lib/database.types'
import { ShareButton } from '@/components/snippets/ShareButton'

type Snippet = Database['public']['Tables']['snippets']['Row']

interface SnippetWithTags extends Snippet {
  tags?: Array<{ id: string; name: string }>
}

interface PublicSnippetCardProps {
  snippet: SnippetWithTags
}

export function PublicSnippetCard({ snippet }: PublicSnippetCardProps) {
  const codePreview = snippet.code.split('\n').slice(0, 3).join('\n')
  const lineCount = snippet.code.split('\n').length

  return (
    <Link href={`/s/${snippet.id}`}>
      <div className="group relative flex flex-col h-full overflow-hidden border border-[var(--editorial-rule)] hover:border-[var(--editorial-ink)]/30 transition-all duration-300 cursor-pointer rounded-sm" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
        {/* Top accent */}
        <div className="h-px w-full opacity-60 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'var(--editorial-accent)' }} />

        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <h3 className="text-base font-semibold truncate group-hover:text-[var(--editorial-accent)] transition-colors" style={{ color: 'var(--editorial-ink)' }}>
            {snippet.title}
          </h3>
          {snippet.description && (
            <p className="text-sm mt-1 line-clamp-1" style={{ color: 'var(--editorial-muted)' }}>
              {snippet.description}
            </p>
          )}

          {/* Badges row */}
          <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
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
            <span className="text-[10px] font-mono ml-auto" style={{ color: 'var(--editorial-muted)' }}>
              {lineCount} lines
            </span>
          </div>
        </div>

        {/* Code preview */}
        <div className="px-4 flex-1">
          <div className="relative rounded-sm overflow-hidden border border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-ink)' }}>
            <pre className="text-xs p-3 overflow-hidden leading-relaxed h-[72px]" style={{ color: '#e8e0d4' }}>
              <code className="font-mono">{codePreview}</code>
            </pre>
            <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: `linear-gradient(to top, var(--editorial-ink), transparent)` }} />
          </div>
        </div>

        {/* Tags */}
        <div className="px-4 pt-2.5 pb-3 mt-auto">
          {snippet.tags && snippet.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {snippet.tags.slice(0, 4).map((tag) => (
                <span key={tag.id} className="text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 font-mono border border-[var(--editorial-rule)] rounded-sm" style={{ color: 'var(--editorial-muted)' }}>
                  #{tag.name}
                </span>
              ))}
              {snippet.tags.length > 4 && (
                <span className="text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 font-mono border border-[var(--editorial-rule)] rounded-sm" style={{ color: 'var(--editorial-muted)' }}>
                  +{snippet.tags.length - 4}
                </span>
              )}
            </div>
          ) : (
            <div className="h-5" />
          )}
        </div>

        {/* Share button */}
        <div className="px-4 pb-4" onClick={(e) => e.preventDefault()}>
          <ShareButton snippetId={snippet.id} />
        </div>
      </div>
    </Link>
  )
}
