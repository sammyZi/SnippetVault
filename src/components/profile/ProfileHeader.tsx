'use client'

import { useState } from 'react'
import { Database } from '@/lib/database.types'
import { User, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Profile = Database['public']['Tables']['profiles']['Row']

interface ProfileHeaderProps {
  profile: Profile
  snippetCount: number
}

export function ProfileHeader({ profile, snippetCount }: ProfileHeaderProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyProfileLink = async () => {
    try {
      const profileUrl = `${window.location.origin}/u/${profile.username}`
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy profile link:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.display_name || profile.username}
              className="w-20 h-20 rounded-full object-cover border-2 border-neutral-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-neutral-100 border-2 border-neutral-200 flex items-center justify-center">
              <User className="w-10 h-10 text-neutral-400" />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-neutral-900 mb-1">
                {profile.display_name || profile.username}
              </h1>
              <p className="text-neutral-600 mb-3">@{profile.username}</p>
            </div>
            
            {/* Copy Profile Link Button */}
            <Button
              onClick={handleCopyProfileLink}
              variant={copied ? "default" : "outline"}
              size="sm"
              className={`rounded-full shrink-0 ${copied ? 'bg-green-50 border-green-200 hover:bg-green-100' : ''}`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Share Profile
                </>
              )}
            </Button>
          </div>
          
          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <div>
              <span className="font-semibold text-neutral-900">{snippetCount}</span>{' '}
              {snippetCount === 1 ? 'snippet' : 'snippets'}
            </div>
            <div>
              Joined {new Date(profile.created_at).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
