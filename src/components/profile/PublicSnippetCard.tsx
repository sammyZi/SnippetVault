'use client'

import Link from 'next/link'
import { Code2, Globe } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
      <Card className="group relative flex flex-col h-full overflow-hidden border-neutral-200/80 hover:border-primary-300 bg-white hover:shadow-xl hover:shadow-primary-100/40 transition-all duration-300 cursor-pointer">
        {/* Top color accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <h3 className="text-base font-bold text-neutral-900 truncate group-hover:text-primary-700 transition-colors">
            {snippet.title}
          </h3>
          {snippet.description && (
            <p className="text-sm text-neutral-500 mt-1 line-clamp-1">
              {snippet.description}
            </p>
          )}

          {/* Badges row */}
          <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
            <Badge variant="outline" className="text-xs rounded-md px-2.5 py-0.5 bg-neutral-900 text-neutral-100 border-transparent font-mono font-medium">
              <Code2 className="h-3.5 w-3.5 mr-1" />
              {snippet.language}
            </Badge>
            {snippet.is_public && (
              <Badge variant="outline" className="text-xs rounded-md px-2.5 py-0.5 border-transparent font-medium bg-emerald-50 text-emerald-700">
                <Globe className="h-3.5 w-3.5 mr-1" />
                Public
              </Badge>
            )}
            <span className="text-xs text-neutral-400 font-medium ml-auto">
              {lineCount} lines
            </span>
          </div>
        </div>

        {/* Code preview */}
        <div className="px-4 flex-1">
          <div className="relative rounded-lg overflow-hidden border border-neutral-200/80 bg-neutral-950">
            <pre className="text-xs p-3 overflow-hidden text-neutral-300 leading-relaxed h-[72px]">
              <code className="font-mono">{codePreview}</code>
            </pre>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-neutral-950 to-transparent" />
          </div>
        </div>

        {/* Tags */}
        <div className="px-4 pt-2.5 pb-3 mt-auto">
          {snippet.tags && snippet.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {snippet.tags.slice(0, 4).map((tag) => (
                <Badge key={tag.id} className="text-xs rounded-md px-2.5 py-0.5 bg-violet-100 text-violet-700 border border-violet-300 hover:bg-violet-100 font-medium">
                  #{tag.name}
                </Badge>
              ))}
              {snippet.tags.length > 4 && (
                <Badge variant="secondary" className="text-xs rounded-md px-2.5 py-0.5 bg-neutral-100 text-neutral-500 font-medium">
                  +{snippet.tags.length - 4}
                </Badge>
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
      </Card>
    </Link>
  )
}
