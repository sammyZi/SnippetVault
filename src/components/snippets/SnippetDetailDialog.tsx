'use client'

import { useState } from 'react'
import { X, Copy, Check, Maximize2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
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
  const [copyState, setCopyState] = useState<'idle' | 'success'>('idle')

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code)
      setCopyState('success')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

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
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          <div className="relative">
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopyCode}
                className="shadow-sm"
              >
                {copyState === 'success' ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
            <SyntaxHighlighter code={snippet.code} language={snippet.language} />
          </div>
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
