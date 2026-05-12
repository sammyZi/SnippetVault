'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { CreateSnippetButton } from './CreateSnippetButton'
import { SnippetList } from './SnippetList'
import { SnippetEditor } from './SnippetEditor'
import { SearchBar } from './SearchBar'
import { FilterPanel } from './FilterPanel'
import { Filter } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSnippets, useUpdateSnippet, useDeleteSnippet } from '@/lib/hooks/useSnippets'
import { SnippetWithTags, UpdateSnippetInput, CreateSnippetInput } from '@/lib/services/snippets'
import { useUIStore } from '@/lib/store/uiStore'
import { useEffect } from 'react'

export function DashboardContent() {
  const [editingSnippet, setEditingSnippet] = useState<SnippetWithTags | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const searchParams = useSearchParams()
  const { data: snippets, isLoading } = useSnippets()
  const { searchQuery, languageFilter, tagFilter, visibilityFilter } = useUIStore()
  const updateSnippet = useUpdateSnippet()
  const deleteSnippet = useDeleteSnippet()
  const activeFilterCount = (languageFilter ? 1 : 0) + tagFilter.length + (visibilityFilter !== 'all' ? 1 : 0)

  useEffect(() => {
    if (searchParams.get('welcome') === 'true') {
      toast.success('Welcome to SnippetVault!', {
        description: 'Start by creating your first snippet.',
      })
      // Clean URL without reload
      window.history.replaceState({}, '', '/dashboard')
    }
  }, [searchParams])

  const handleEdit = (snippet: SnippetWithTags) => {
    setEditingSnippet(snippet)
  }

  const handleUpdate = async (data: CreateSnippetInput) => {
    if (!editingSnippet) return

    try {
      await updateSnippet.mutateAsync({
        id: editingSnippet.id,
        data: data as UpdateSnippetInput,
      })
      setEditingSnippet(null)
    } catch (error) {
      console.error('Failed to update snippet:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteSnippet.mutateAsync(id)
    } catch (error) {
      console.error('Failed to delete snippet:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingSnippet(null)
  }

  return (
    <>
      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px" style={{ backgroundColor: 'var(--editorial-accent)' }} />
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--editorial-accent)' }}>
              Collection
            </span>
          </div>
          <h2 className="text-3xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>My Snippets</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--editorial-muted)' }}>
            {snippets?.length || 0} snippet{snippets?.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>
        <CreateSnippetButton />
      </div>

      {/* Search & Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`h-10 px-4 flex items-center gap-2 text-sm font-medium rounded-full border transition-all ${
              showFilters
                ? 'border-[var(--editorial-ink)] bg-[var(--editorial-ink)] text-[var(--editorial-bg)]'
                : 'border-[var(--editorial-rule)] text-[var(--editorial-ink)] hover:bg-[var(--editorial-bg-alt)]'
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="h-5 px-1.5 text-xs rounded-full inline-flex items-center justify-center font-semibold" style={{
                backgroundColor: showFilters ? 'var(--editorial-bg)' : 'var(--editorial-ink)',
                color: showFilters ? 'var(--editorial-ink)' : 'var(--editorial-bg)',
              }}>
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
        {showFilters && <FilterPanel />}
      </div>

      {/* Divider */}
      <div className="h-px w-full mb-8" style={{ backgroundColor: 'var(--editorial-rule)' }} />

      <SnippetList
        snippets={snippets || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        hasActiveSearch={!!searchQuery}
      />

      <Dialog open={!!editingSnippet} onOpenChange={(open) => !open && setEditingSnippet(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-sm border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg)' }}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>Edit Snippet</DialogTitle>
            <DialogDescription style={{ color: 'var(--editorial-muted)' }}>
              Update your code snippet
            </DialogDescription>
          </DialogHeader>
          {editingSnippet && (
            <SnippetEditor
              initialData={{
                title: editingSnippet.title,
                description: editingSnippet.description || undefined,
                code: editingSnippet.code,
                language: editingSnippet.language,
                is_public: editingSnippet.is_public,
                tags: editingSnippet.tags?.map(tag => tag.name) || [],
              }}
              onSubmit={handleUpdate}
              onCancel={handleCancelEdit}
              isLoading={updateSnippet.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
