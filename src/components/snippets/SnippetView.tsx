'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
    <Card className="shadow-lg">
      <CardHeader className="space-y-4">
        <div>
          <CardTitle className="text-2xl font-bold mb-2">
            {snippet.title}
          </CardTitle>
          {snippet.description && (
            <CardDescription className="text-base">
              {snippet.description}
            </CardDescription>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">By:</span>
            <span>{snippet.profile.display_name || snippet.profile.username}</span>
          </div>
          <span className="text-neutral-400">•</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">Created:</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {snippet.language}
          </Badge>
          {snippet.is_public && (
            <Badge variant="secondary" className="text-sm">
              Public
            </Badge>
          )}
          {snippet.tags && snippet.tags.length > 0 && (
            <>
              {snippet.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="text-sm">
                  {tag.name}
                </Badge>
              ))}
            </>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <SyntaxHighlighter
          code={snippet.code}
          language={snippet.language}
          showLineNumbers={true}
          showCopyButton={true}
        />
      </CardContent>
    </Card>
  )
}
