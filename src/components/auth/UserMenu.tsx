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
          <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[var(--editorial-bg-alt)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--editorial-accent)] focus:ring-offset-2" style={{ borderColor: 'var(--editorial-rule)' }}>
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover border border-[var(--editorial-rule)]"
              />
            ) : (
              <div className="w-8 h-8 rounded-full border border-[var(--editorial-rule)] flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'var(--editorial-bg-alt)', color: 'var(--editorial-ink)' }}>
                {initial}
              </div>
            )}
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-sm font-medium" style={{ color: 'var(--editorial-ink)' }}>
                {displayName}
              </span>
              <ChevronDown className="w-4 h-4" style={{ color: 'var(--editorial-muted)' }} />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 rounded-sm border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg)' }}>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium" style={{ color: 'var(--editorial-ink)' }}>
                {displayName}
              </p>
              <p className="text-xs" style={{ color: 'var(--editorial-muted)' }}>{email}</p>
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
            className="text-[var(--editorial-accent)] focus:text-[var(--editorial-accent)]"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-[400px] rounded-sm border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg)' }}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>Sign out</DialogTitle>
            <DialogDescription style={{ color: 'var(--editorial-muted)' }}>
              Are you sure you want to sign out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)} className="rounded-full border-[var(--editorial-rule)]">
              Cancel
            </Button>
            <button
              onClick={handleLogout}
              className="h-10 px-5 text-sm font-semibold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: 'var(--editorial-accent)', color: 'var(--editorial-bg)' }}
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Sign out
              </span>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
