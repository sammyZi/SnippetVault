'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
      <Button onClick={() => setIsOpen(true)} size="lg">
        <Plus className="mr-2 h-5 w-5" />
        Create Snippet
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>Create New Snippet</DialogTitle>
            <DialogDescription>
              Add a new code snippet to your collection
            </DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
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
