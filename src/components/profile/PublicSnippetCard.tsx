'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
  // Truncate code preview to first 5 lines
  const codePreview = snippet.code.split('\n').slice(0, 5).join('\n')
  const hasMoreLines = snippet.code.split('\n').length > 5

  return (
    <Link href={`/s/${snippet.id}`}>
      <Card className="group hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-bold truncate">
                {snippet.title}
              </CardTitle>
              {snippet.description && (
                <CardDescription className="mt-1 line-clamp-2">
                  {snippet.description}
                </CardDescription>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              {snippet.language}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="text-xs bg-neutral-50 rounded-md p-3 overflow-x-auto border border-neutral-200">
              <code className="font-mono">{codePreview}</code>
            </pre>
            {hasMoreLines && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-neutral-50 to-transparent pointer-events-none" />
            )}
          </div>
          {snippet.tags && snippet.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {snippet.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="text-xs">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
          <div className="mt-3 flex justify-end" onClick={(e) => e.preventDefault()}>
            <ShareButton snippetId={snippet.id} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
