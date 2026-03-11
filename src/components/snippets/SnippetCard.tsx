'use client'

import { useState } from 'react'
import { Pencil, Trash2, MoreVertical, Users, Maximize2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SnippetWithTags } from '@/lib/services/snippets'
import { ShareButton } from '@/components/snippets/ShareButton'
import { ShareDialog } from '@/components/snippets/ShareDialog'
import { SnippetDetailDialog } from '@/components/snippets/SnippetDetailDialog'
import { ExportButton } from '@/components/snippets/ExportButton'

interface SnippetCardProps {
  snippet: SnippetWithTags
  onEdit: (snippet: SnippetWithTags) => void
  onDelete: (id: string) => void
}

export function SnippetCard({ snippet, onEdit, onDelete }: SnippetCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this snippet?')) {
      setIsDeleting(true)
      try {
        await onDelete(snippet.id)
      } catch (error) {
        console.error('Failed to delete snippet:', error)
        setIsDeleting(false)
      }
    }
  }

  // Truncate code preview to first 5 lines
  const codePreview = snippet.code.split('\n').slice(0, 5).join('\n')
  const hasMoreLines = snippet.code.split('\n').length > 5
  const lineCount = snippet.code.split('\n').length

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-200 border-neutral-200">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowDetailDialog(true)}>
                  <Maximize2 className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(snippet)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                {!snippet.is_public && (
                  <ShareDialog
                    snippetId={snippet.id}
                    trigger={
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Users className="mr-2 h-4 w-4" />
                        Share with users
                      </DropdownMenuItem>
                    }
                  />
                )}
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs rounded-full px-3 py-0.5 bg-neutral-100 border-neutral-300 font-semibold">
              {snippet.language}
            </Badge>
            {snippet.is_public && (
              <Badge variant="secondary" className="text-xs rounded-full px-3 py-0.5">
                Public
              </Badge>
            )}
            <span className="text-xs text-neutral-500">
              {lineCount} lines
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            className="relative cursor-pointer" 
            onClick={() => setShowDetailDialog(true)}
          >
            <pre className="text-xs bg-neutral-50 rounded-md p-3 overflow-x-auto border border-neutral-200 hover:border-neutral-300 transition-colors [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <code className="font-mono">{codePreview}</code>
            </pre>
            {hasMoreLines && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-neutral-50 via-neutral-50/80 to-transparent pointer-events-none flex items-end justify-center pb-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="pointer-events-auto shadow-sm text-xs h-7 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDetailDialog(true)
                  }}
                >
                  <Maximize2 className="h-3 w-3 mr-1.5" />
                  View Full Code
                </Button>
              </div>
            )}
          </div>
          {snippet.tags && snippet.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {snippet.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="text-xs rounded-full px-3 py-0.5">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
          <div className="mt-3 flex justify-end gap-2">
            <ExportButton
              snippetTitle={snippet.title}
              code={snippet.code}
              language={snippet.language}
            />
            <ShareButton snippetId={snippet.id} />
          </div>
        </CardContent>
      </Card>

      <SnippetDetailDialog
        snippet={snippet}
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
      />
    </>
  )
}
