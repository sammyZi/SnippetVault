'use client'

import { Maximize2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { SyntaxHighlighter } from './SyntaxHighlighter'
import { SnippetWithTags } from '@/lib/services/snippets'
import { ShareButton } from './ShareButton'

interface SnippetDetailDialogProps {
  snippet: SnippetWithTags
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SnippetDetailDialog({ snippet, open, onOpenChange }: SnippetDetailDialogProps) {
  const lineCount = snippet.code.split('\n').length
  const charCount = snippet.code.length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-neutral-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-bold mb-2">
                {snippet.title}
              </DialogTitle>
              {snippet.description && (
                <p className="text-sm text-neutral-600 mb-3">
                  {snippet.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {snippet.language}
                </Badge>
                {snippet.is_public && (
                  <Badge variant="secondary" className="text-xs">
                    Public
                  </Badge>
                )}
                {snippet.tags && snippet.tags.length > 0 && (
                  <>
                    {snippet.tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))}
                  </>
                )}
                <span className="text-xs text-neutral-500 ml-2">
                  {lineCount} lines · {charCount} characters
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          <SyntaxHighlighter 
            code={snippet.code} 
            language={snippet.language}
            showLineNumbers={true}
            showCopyButton={true}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="text-xs text-neutral-500">
            Created {new Date(snippet.created_at).toLocaleDateString()}
            {snippet.updated_at !== snippet.created_at && (
              <> · Updated {new Date(snippet.updated_at).toLocaleDateString()}</>
            )}
          </div>
          <ShareButton snippetId={snippet.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
