'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SnippetEditor } from './SnippetEditor'
import { useCreateSnippet } from '@/lib/hooks/useSnippets'
import { CreateSnippetInput } from '@/lib/services/snippets'

export function CreateSnippetButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const createSnippet = useCreateSnippet()

  const handleSubmit = async (data: CreateSnippetInput) => {
    setError(null)
    try {
      await createSnippet.mutateAsync(data)
      setIsOpen(false)
    } catch (error) {
      console.error('Failed to create snippet:', error)
      // Show more detailed error information
      if (error && typeof error === 'object') {
        console.error('Error details:', JSON.stringify(error, null, 2))
      }
      
      // Set user-friendly error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to create snippet. Please check your database connection and try again.'
      setError(errorMessage)
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
    setError(null)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setError(null)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-10 px-5 flex items-center gap-2 text-sm font-semibold rounded-full transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
        style={{ backgroundColor: 'var(--editorial-ink)', color: 'var(--editorial-bg)' }}
      >
        <Plus className="h-4 w-4" />
        Create Snippet
      </button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-sm border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg)' }}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>Create New Snippet</DialogTitle>
            <DialogDescription style={{ color: 'var(--editorial-muted)' }}>
              Add a new code snippet to your collection
            </DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="p-3 rounded-sm border text-sm" style={{ backgroundColor: 'rgba(192,69,42,0.06)', borderColor: 'rgba(192,69,42,0.2)', color: 'var(--editorial-accent)' }}>
              <p className="font-medium">Error creating snippet</p>
              <p className="mt-1">{error}</p>
            </div>
          )}
          
          <SnippetEditor
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={createSnippet.isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
