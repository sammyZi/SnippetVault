'use client'

import { useState } from 'react'
import { Users, X, Loader2, Copy, Check, Link2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ExportButton } from './ExportButton'
import { useSharedUsers, useShareSnippet, useRevokeShare } from '@/lib/hooks/useSharing'

interface ShareDialogProps {
  snippetId: string
  snippetTitle?: string
  snippetCode?: string
  snippetLanguage?: string
  trigger?: React.ReactNode
}

/**
 * ShareDialog component for managing user-specific snippet sharing
 * Requirements: 7.1, 7.3, 7.4
 */
export function ShareDialog({ 
  snippetId, 
  snippetTitle = 'snippet',
  snippetCode = '',
  snippetLanguage = 'javascript',
  trigger 
}: ShareDialogProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [linkCopied, setLinkCopied] = useState(false)

  const { data: sharedUsers = [], isLoading: isLoadingUsers } = useSharedUsers(snippetId)
  const shareSnippet = useShareSnippet()
  const revokeShare = useRevokeShare()

  // Copy public link to clipboard
  const handleCopyLink = async () => {
    try {
      const shareUrl = `${window.location.origin}/s/${snippetId}`
      await navigator.clipboard.writeText(shareUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      setError('Failed to copy link')
    }
  }

  // Clear error and success messages when user starts typing
  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (error) setError(null)
  }

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim()) {
      setError('Please enter an email address')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address')
      return
    }

    try {
      await shareSnippet.mutateAsync({
        snippetId,
        usernameOrEmail: email.trim(),
      })
      setEmail('')
      setError(null) // Clear any existing errors on success
    } catch (err) {
      // Error is already shown via toast in the hook
      // Just log it for debugging
      console.error('Share error:', err)
    }
  }

  const handleRevoke = async (shareId: string) => {
    try {
      await revokeShare.mutateAsync({ shareId, snippetId })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke access')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Share Snippet</DialogTitle>
          <DialogDescription>
            Copy the public link or share with specific users by email.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Copy public link section */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              Public Link
            </h4>
            <div className="flex gap-2">
              <Input
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/s/${snippetId}`}
                readOnly
                className="flex-1 text-sm rounded-xl"
              />
              <Button
                onClick={handleCopyLink}
                variant={linkCopied ? "default" : "outline"}
                className={`rounded-xl ${linkCopied ? 'bg-green-50 border-green-200 hover:bg-green-100' : ''}`}
              >
                {linkCopied ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-green-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Export as Image button */}
          {snippetCode && (
            <div className="space-y-2">
              <ExportButton
                snippetTitle={snippetTitle}
                code={snippetCode}
                language={snippetLanguage}
                variant="outline"
                size="default"
              />
            </div>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-neutral-500">Or share with users</span>
            </div>
          </div>

          {/* Share form */}
          <form onSubmit={handleShare} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              disabled={shareSnippet.isPending}
              className="flex-1 rounded-xl"
            />
            <Button type="submit" disabled={shareSnippet.isPending} className="rounded-xl">
              {shareSnippet.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sharing...
                </>
              ) : (
                'Share'
              )}
            </Button>
          </form>

          {/* Error message */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded-xl">
              {error}
            </div>
          )}

          {/* List of shared users */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Shared with</h4>
            {isLoadingUsers ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
              </div>
            ) : sharedUsers.length === 0 ? (
              <p className="text-sm text-neutral-500 py-2">
                Not shared with anyone yet
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {sharedUsers.map((user) => (
                  <div
                    key={user.share_id}
                    className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">
                          {user.display_name || user.username}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">
                          @{user.username}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        Can view
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 ml-2 shrink-0"
                      onClick={() => handleRevoke(user.share_id)}
                      disabled={revokeShare.isPending}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Revoke access</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
