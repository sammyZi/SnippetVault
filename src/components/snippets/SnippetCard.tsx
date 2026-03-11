'use client'

import { useState } from 'react'
import { Pencil, Trash2, MoreVertical, Users, Maximize2, Share2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SnippetWithTags } from '@/lib/services/snippets'
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(snippet.id)
    } catch (error) {
      console.error('Failed to delete snippet:', error)
      setIsDeleting(false)
    }
    setShowDeleteConfirm(false)
  }

  // Truncate code preview to first 3 lines
  const codePreview = snippet.code.split('\n').slice(0, 3).join('\n')
  const hasMoreLines = snippet.code.split('\n').length > 3
  const lineCount = snippet.code.split('\n').length

  // Debug: Log snippet data to verify tags
  if (process.env.NODE_ENV === 'development') {
    console.log('Snippet card data:', {
      id: snippet.id,
      title: snippet.title,
      is_public: snippet.is_public,
      tags: snippet.tags,
      tagsCount: snippet.tags?.length || 0
    })
  }

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
                <ShareDialog
                  snippetId={snippet.id}
                  snippetTitle={snippet.title}
                  snippetCode={snippet.code}
                  snippetLanguage={snippet.language}
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                  }
                />
                <DropdownMenuItem
                  onClick={() => setShowDeleteConfirm(true)}
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
          {/* Display tags prominently in header */}
          {snippet.tags && snippet.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {snippet.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="text-xs rounded-full px-2.5 py-0.5 bg-blue-50 border-blue-200 text-blue-700">
                  #{tag.name}
                </Badge>
              ))}
            </div>
          )}
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
          <div className="mt-3 flex justify-end gap-2">
            <ExportButton
              snippetTitle={snippet.title}
              code={snippet.code}
              language={snippet.language}
            />
            <ShareDialog
              snippetId={snippet.id}
              trigger={
                <Button variant="outline" size="sm" className="rounded-full gap-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              }
            />
          </div>
        </CardContent>
      </Card>

      <SnippetDetailDialog
        snippet={snippet}
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
      />

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Snippet</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{snippet.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
