'use client'

import { useState } from 'react'
import { Database } from '@/lib/database.types'
import { User, Copy, Check } from 'lucide-react'

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
    <div className="border border-[var(--editorial-rule)] rounded-sm p-6 mb-8" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.display_name || profile.username}
              className="w-20 h-20 rounded-full object-cover border-2 border-[var(--editorial-rule)]"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border-2 border-[var(--editorial-rule)] flex items-center justify-center" style={{ backgroundColor: 'var(--editorial-bg)' }}>
              <User className="w-10 h-10" style={{ color: 'var(--editorial-muted)' }} />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl tracking-tight mb-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>
                {profile.display_name || profile.username}
              </h1>
              <p className="text-sm" style={{ color: 'var(--editorial-muted)' }}>@{profile.username}</p>
            </div>
            
            {/* Copy Profile Link Button */}
            <button
              onClick={handleCopyProfileLink}
              className={`h-9 px-4 flex items-center gap-2 text-sm font-medium rounded-full border transition-all shrink-0 ${
                copied
                  ? 'border-green-600/30 text-green-700'
                  : 'border-[var(--editorial-rule)] hover:bg-[var(--editorial-bg)]'
              }`}
              style={copied ? { backgroundColor: 'rgba(34,197,94,0.08)' } : { color: 'var(--editorial-ink)' }}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Share Profile
                </>
              )}
            </button>
          </div>
          
          {/* Metadata */}
          <div className="flex items-center gap-4 mt-3 text-sm" style={{ color: 'var(--editorial-muted)' }}>
            <div>
              <span className="font-semibold" style={{ color: 'var(--editorial-ink)' }}>{snippetCount}</span>{' '}
              {snippetCount === 1 ? 'snippet' : 'snippets'}
            </div>
            <span style={{ color: 'var(--editorial-rule)' }}>·</span>
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
