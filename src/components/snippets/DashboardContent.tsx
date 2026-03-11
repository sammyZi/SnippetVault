'use client'

import { useState } from 'react'
import { CreateSnippetButton } from './CreateSnippetButton'
import { SnippetList } from './SnippetList'
import { SnippetEditor } from './SnippetEditor'
import { SearchBar } from './SearchBar'
import { FilterPanel } from './FilterPanel'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

export function DashboardContent() {
  const [editingSnippet, setEditingSnippet] = useState<SnippetWithTags | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const { data: snippets, isLoading } = useSnippets()
  const { searchQuery, languageFilter, tagFilter, visibilityFilter } = useUIStore()
  const updateSnippet = useUpdateSnippet()
  const deleteSnippet = useDeleteSnippet()
  const activeFilterCount = (languageFilter ? 1 : 0) + tagFilter.length + (visibilityFilter !== 'all' ? 1 : 0)

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">My Snippets</h2>
          <p className="text-sm text-neutral-500 mt-1">
            {snippets?.length || 0} snippet{snippets?.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>
        <CreateSnippetButton />
      </div>

      {/* Search & Filter Section */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
          <Button
            variant={showFilters ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="h-9 rounded-lg gap-2 shrink-0"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant={showFilters ? 'secondary' : 'default'} className="h-5 px-1.5 text-xs ml-0.5">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>
        {showFilters && <FilterPanel />}
      </div>

      <SnippetList
        snippets={snippets || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        hasActiveSearch={!!searchQuery}
      />

      <Dialog open={!!editingSnippet} onOpenChange={(open) => !open && setEditingSnippet(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>Edit Snippet</DialogTitle>
            <DialogDescription>
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
