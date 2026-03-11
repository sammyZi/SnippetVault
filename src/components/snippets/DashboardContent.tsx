'use client'

import { useState } from 'react'
import { CreateSnippetButton } from './CreateSnippetButton'
import { SnippetList } from './SnippetList'
import { SnippetEditor } from './SnippetEditor'
import { SearchBar } from './SearchBar'
import { FilterPanel } from './FilterPanel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSnippets, useUpdateSnippet, useDeleteSnippet } from '@/lib/hooks/useSnippets'
import { SnippetWithTags, UpdateSnippetInput, CreateSnippetInput } from '@/lib/services/snippets'

export function DashboardContent() {
  const [editingSnippet, setEditingSnippet] = useState<SnippetWithTags | null>(null)
  const { data: snippets, isLoading } = useSnippets()
  const updateSnippet = useUpdateSnippet()
  const deleteSnippet = useDeleteSnippet()

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

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <SearchBar />
        </div>
        <div className="lg:col-span-1">
          <FilterPanel />
        </div>
      </div>

      <SnippetList
        snippets={snippets || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={!!editingSnippet} onOpenChange={(open) => !open && setEditingSnippet(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
