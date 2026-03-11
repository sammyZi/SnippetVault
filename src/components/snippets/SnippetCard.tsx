'use client'

import { useState } from 'react'
import { Pencil, Trash2, MoreVertical, Maximize2, Share2, Globe, Lock, Code2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SnippetWithTags } from '@/lib/services/snippets'
import { ShareDialog } from '@/components/snippets/ShareDialog'
import { SnippetDetailDialog } from '@/components/snippets/SnippetDetailDialog'

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

  const codePreview = snippet.code.split('\n').slice(0, 3).join('\n')
  const lineCount = snippet.code.split('\n').length

  return (
    <>
      <Card 
        className="group relative flex flex-col h-full overflow-hidden border-neutral-200/80 hover:border-primary-300 bg-white hover:shadow-xl hover:shadow-primary-100/40 transition-all duration-300 cursor-pointer"
        onClick={() => setShowDetailDialog(true)}
      >
        {/* Top color accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Header section - fixed height */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-neutral-900 truncate group-hover:text-primary-700 transition-colors">
                {snippet.title}
              </h3>
              {snippet.description && (
                <p className="text-sm text-neutral-500 mt-1 line-clamp-1">
                  {snippet.description}
                </p>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setShowDetailDialog(true) }}>
                  <Maximize2 className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(snippet) }}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <ShareDialog
                  snippetId={snippet.id}
                  snippetTitle={snippet.title}
                  snippetCode={snippet.code}
                  snippetLanguage={snippet.language}
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                  }
                />
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(true) }}
                  disabled={isDeleting}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Badges row */}
          <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
            <Badge variant="outline" className="text-xs rounded-md px-2.5 py-0.5 bg-neutral-900 text-neutral-100 border-transparent font-mono font-medium">
              <Code2 className="h-3.5 w-3.5 mr-1" />
              {snippet.language}
            </Badge>
            <Badge
              variant="outline"
              className={`text-xs rounded-md px-2.5 py-0.5 border-transparent font-medium ${
                snippet.is_public
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-amber-50 text-amber-700'
              }`}
            >
              {snippet.is_public ? <Globe className="h-3.5 w-3.5 mr-1" /> : <Lock className="h-3.5 w-3.5 mr-1" />}
              {snippet.is_public ? 'Public' : 'Private'}
            </Badge>
            <span className="text-xs text-neutral-400 font-medium ml-auto">
              {lineCount} lines
            </span>
          </div>
        </div>

        {/* Code preview - consistent height */}
        <div className="px-4 flex-1">
          <div className="relative rounded-lg overflow-hidden border border-neutral-200/80 bg-neutral-950">
            <pre className="text-xs p-3 overflow-hidden text-neutral-300 leading-relaxed h-[72px]">
              <code className="font-mono">{codePreview}</code>
            </pre>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-neutral-950 to-transparent" />
          </div>
        </div>

        {/* Share with users button */}
        <div className="px-4 pt-2" onClick={(e) => e.stopPropagation()}>
          <ShareDialog
            snippetId={snippet.id}
            snippetTitle={snippet.title}
            snippetCode={snippet.code}
            snippetLanguage={snippet.language}
            trigger={
              <Button variant="outline" size="sm" className="rounded-full px-4 w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share with Users
              </Button>
            }
          />
        </div>

        {/* Tags section - fixed bottom position */}
        <div className="px-4 pt-2.5 pb-4 mt-auto">
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
