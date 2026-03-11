'use client'

import { Code2, Globe, User, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
    <Card className="group relative overflow-hidden border-neutral-200/80 bg-white shadow-lg">
      {/* Top color accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />

      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-neutral-100">
        <h1 className="text-2xl font-bold text-neutral-900 mb-1">
          {snippet.title}
        </h1>
        {snippet.description && (
          <p className="text-base text-neutral-500 mt-1 mb-3">
            {snippet.description}
          </p>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 mb-4">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            <span className="font-medium text-neutral-700">{snippet.profile.display_name || snippet.profile.username}</span>
          </div>
          <span className="text-neutral-300">•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
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
          {snippet.tags && snippet.tags.length > 0 && (
            snippet.tags.map((tag) => (
              <Badge key={tag.id} className="text-xs rounded-md px-2.5 py-0.5 bg-violet-100 text-violet-700 border border-violet-300 hover:bg-violet-100 font-medium">
                #{tag.name}
              </Badge>
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
    </Card>
  )
}
