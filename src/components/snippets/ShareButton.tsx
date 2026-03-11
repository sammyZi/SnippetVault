'use client'

import { useState } from 'react'
import { Share2, Check, X, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareButtonProps {
  snippetId: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showLabel?: boolean
}

type ShareState = 'idle' | 'success' | 'error'

export function ShareButton({ 
  snippetId, 
  variant = 'outline', 
  size = 'sm',
  showLabel = true 
}: ShareButtonProps) {
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
      size={size}
      variant={variant}
      className={`rounded-full px-4 ${shareState === 'success' ? 'bg-green-50 border-green-200 hover:bg-green-100' : shareState === 'error' ? 'bg-red-50 border-red-200 hover:bg-red-100' : 'hover:bg-neutral-100'}`}
      aria-label="Copy share link to clipboard"
    >
      {shareState === 'idle' && (
        <>
          <Copy className="h-4 w-4" />
          {showLabel && <span className="ml-2">Copy Link</span>}
        </>
      )}
      {shareState === 'success' && (
        <>
          <Check className="h-4 w-4 text-green-600" />
          {showLabel && <span className="ml-2 text-green-600">Copied!</span>}
        </>
      )}
      {shareState === 'error' && (
        <>
          <X className="h-4 w-4 text-red-600" />
          {showLabel && <span className="ml-2 text-red-600">Failed</span>}
        </>
      )}
    </Button>
  )
}
