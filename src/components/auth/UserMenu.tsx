'use client'

import { useState } from 'react'
import { LogOut, User, Link2, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface UserMenuProps {
  profile: {
    username: string
    display_name: string | null
    avatar_url: string | null
  } | null
  email: string
}

export function UserMenu({ profile, email }: UserMenuProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleCopyProfileLink = async () => {
    if (!profile?.username) return
    
    try {
      const profileUrl = `${window.location.origin}/u/${profile.username}`
      await navigator.clipboard.writeText(profileUrl)
      toast.success('Profile link copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy profile link')
    }
  }

  const handleLogout = () => {
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = '/api/auth/logout'
    document.body.appendChild(form)
    form.submit()
  }

  const displayName = profile?.display_name || profile?.username || email
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover border border-neutral-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-100 border border-primary-200 flex items-center justify-center text-sm font-bold text-primary-700">
                {initial}
              </div>
            )}
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-sm font-medium text-neutral-700">
                {displayName}
              </span>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-neutral-900">
                {displayName}
              </p>
              <p className="text-xs text-neutral-500">{email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profile?.username && (
            <>
              <DropdownMenuItem onClick={handleCopyProfileLink}>
                <Link2 className="mr-2 h-4 w-4" />
                <span>Share Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem 
            onClick={() => setShowLogoutConfirm(true)}
            className="text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Sign out</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
