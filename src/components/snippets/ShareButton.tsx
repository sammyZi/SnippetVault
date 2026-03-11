'use client'

import { useState } from 'react'
import { Share2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareButtonProps {
  snippetId: string
}

type ShareState = 'idle' | 'success' | 'error'

export function ShareButton({ snippetId }: ShareButtonProps) {
  const [shareState, setShareState] = useState<ShareState>('idle')

  const handleShare = async () => {
    try {
      // Generate full absolute URL for snippet
      const shareUrl = `${window.location.origin}/s/${snippetId}`

      // Check if Clipboard API is available
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not available')
      }

      // Copy share URL to clipboard
      await navigator.clipboard.writeText(shareUrl)

      // Display confirmation message
      setShareState('success')

      // Reset after 2 seconds
      setTimeout(() => {
        setShareState('idle')
      }, 2000)
    } catch (error) {
      // Display error message on failure
      console.error('Failed to copy share link:', error)
      setShareState('error')

      // Reset after 2 seconds
      setTimeout(() => {
        setShareState('idle')
      }, 2000)
    }
  }

  return (
    <Button
      onClick={handleShare}
      size="sm"
      variant="outline"
      className="h-8"
      aria-label="Copy share link to clipboard"
    >
      {shareState === 'idle' && (
        <>
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </>
      )}
      {shareState === 'success' && (
        <>
          <Check className="h-4 w-4 mr-1 text-green-500" />
          Link Copied!
        </>
      )}
      {shareState === 'error' && (
        <>
          <X className="h-4 w-4 mr-1 text-red-500" />
          Failed
        </>
      )}
    </Button>
  )
}
