'use client'

import { useState } from 'react'
import { Users, X, Loader2 } from 'lucide-react'
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
import { useSharedUsers, useShareSnippet, useRevokeShare } from '@/lib/hooks/useSharing'

interface ShareDialogProps {
  snippetId: string
  trigger?: React.ReactNode
}

/**
 * ShareDialog component for managing user-specific snippet sharing
 * Requirements: 7.1, 7.3, 7.4
 */
export function ShareDialog({ snippetId, trigger }: ShareDialogProps) {
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { data: sharedUsers = [], isLoading: isLoadingUsers } = useSharedUsers(snippetId)
  const shareSnippet = useShareSnippet()
  const revokeShare = useRevokeShare()

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!username.trim()) {
      setError('Please enter a username')
      return
    }

    try {
      await shareSnippet.mutateAsync({
        snippetId,
        usernameOrEmail: username.trim(),
      })
      setUsername('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share snippet')
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Snippet</DialogTitle>
          <DialogDescription>
            Share this private snippet with specific users by entering their username.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Share form */}
          <form onSubmit={handleShare} className="flex gap-2">
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={shareSnippet.isPending}
              className="flex-1"
            />
            <Button type="submit" disabled={shareSnippet.isPending}>
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
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}

          {/* Success message */}
          {shareSnippet.isSuccess && !error && (
            <div className="text-sm text-green-600 bg-green-50 p-2 rounded-md">
              Snippet shared successfully!
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
                    className="flex items-center justify-between p-2 rounded-md bg-neutral-50 border border-neutral-200"
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
