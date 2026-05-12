'use client'

import { useState } from 'react'
import { Pencil, Trash2, MoreVertical, Maximize2, Share2, Globe, Lock, Code2 } from 'lucide-react'
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
      <div 
        className="group relative flex flex-col h-full overflow-hidden border border-[var(--editorial-rule)] hover:border-[var(--editorial-ink)]/30 transition-all duration-300 cursor-pointer rounded-sm"
        style={{ backgroundColor: 'var(--editorial-bg-alt)' }}
        onClick={() => setShowDetailDialog(true)}
      >
        {/* Top accent line */}
        <div className="h-px w-full opacity-60 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'var(--editorial-accent)' }} />

        {/* Header section */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold truncate group-hover:text-[var(--editorial-accent)] transition-colors" style={{ color: 'var(--editorial-ink)' }}>
                {snippet.title}
              </h3>
              {snippet.description && (
                <p className="text-sm mt-1 line-clamp-1" style={{ color: 'var(--editorial-muted)' }}>
                  {snippet.description}
                </p>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 rounded-sm border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg)' }}>
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
                  className="text-[var(--editorial-accent)] focus:text-[var(--editorial-accent)]"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Badges row */}
          <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
            <span className="text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 font-mono border border-[var(--editorial-rule)] rounded-sm flex items-center gap-1" style={{ color: 'var(--editorial-ink)', backgroundColor: 'var(--editorial-ink)', }}>
              <Code2 className="h-3 w-3" style={{ color: 'var(--editorial-bg)' }} />
              <span style={{ color: 'var(--editorial-bg)' }}>{snippet.language}</span>
            </span>
            <span className={`text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 font-mono border rounded-sm flex items-center gap-1 ${
              snippet.is_public
                ? 'border-green-600/30 text-green-700'
                : 'border-amber-600/30 text-amber-700'
            }`} style={{ backgroundColor: snippet.is_public ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)' }}>
              {snippet.is_public ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
              {snippet.is_public ? 'Public' : 'Private'}
            </span>
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

        {/* Share button */}
        <div className="px-4 pt-2" onClick={(e) => e.stopPropagation()}>
          <ShareDialog
            snippetId={snippet.id}
            snippetTitle={snippet.title}
            snippetCode={snippet.code}
            snippetLanguage={snippet.language}
            trigger={
              <button className="w-full h-8 flex items-center justify-center gap-2 text-[11px] tracking-wide font-medium rounded-full border border-[var(--editorial-rule)] transition-all hover:bg-[var(--editorial-bg)]" style={{ color: 'var(--editorial-muted)' }}>
                <Share2 className="h-3.5 w-3.5" />
                Share with Users
              </button>
            }
          />
        </div>

        {/* Tags section */}
        <div className="px-4 pt-2 pb-4 mt-auto">
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
      </div>

      <SnippetDetailDialog
        snippet={snippet}
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
      />

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-sm rounded-sm border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg)' }}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>Delete Snippet</DialogTitle>
            <DialogDescription style={{ color: 'var(--editorial-muted)' }}>
              Are you sure you want to delete &quot;{snippet.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting} className="rounded-full border-[var(--editorial-rule)]">
              Cancel
            </Button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-10 px-5 text-sm font-semibold rounded-full transition-all disabled:opacity-50"
              style={{ backgroundColor: 'var(--editorial-accent)', color: 'var(--editorial-bg)' }}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
