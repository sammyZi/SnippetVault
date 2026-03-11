'use client'

import { Database } from '@/lib/database.types'
import { User } from 'lucide-react'

type Profile = Database['public']['Tables']['profiles']['Row']

interface ProfileHeaderProps {
  profile: Profile
  snippetCount: number
}

export function ProfileHeader({ profile, snippetCount }: ProfileHeaderProps) {
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
          <h1 className="text-2xl font-bold text-neutral-900 mb-1">
            {profile.display_name || profile.username}
          </h1>
          <p className="text-neutral-600 mb-3">@{profile.username}</p>
          
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
