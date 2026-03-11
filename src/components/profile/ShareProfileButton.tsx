'use client'

import { useState } from 'react'
import { Copy, Check, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareProfileButtonProps {
  username: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showLabel?: boolean
}

export function ShareProfileButton({ 
  username, 
  variant = 'outline', 
  size = 'sm',
  showLabel = true 
}: ShareProfileButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyProfileLink = async () => {
    try {
      const profileUrl = `${window.location.origin}/u/${username}`
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy profile link:', error)
    }
  }

  return (
    <Button
      onClick={handleCopyProfileLink}
      variant={copied ? "default" : variant}
      size={size}
      className={`rounded-full ${copied ? 'bg-green-50 border-green-200 hover:bg-green-100 text-green-600' : ''}`}
      aria-label="Copy profile link to clipboard"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          {showLabel && <span className="ml-2">Copied!</span>}
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          {showLabel && <span className="ml-2">Share Profile</span>}
        </>
      )}
    </Button>
  )
}
