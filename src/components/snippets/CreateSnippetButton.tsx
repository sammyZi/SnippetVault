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
  const createSnippet = useCreateSnippet()

  const handleSubmit = async (data: CreateSnippetInput) => {
    try {
      await createSnippet.mutateAsync(data)
      setIsOpen(false)
    } catch (error) {
      console.error('Failed to create snippet:', error)
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="lg">
        <Plus className="mr-2 h-5 w-5" />
        Create Snippet
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Snippet</DialogTitle>
            <DialogDescription>
              Add a new code snippet to your collection
            </DialogDescription>
          </DialogHeader>
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
