'use client'

import { ProfileHeader } from './ProfileHeader'
import { PublicSnippetList } from './PublicSnippetList'
import { Database } from '@/lib/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']
type Snippet = Database['public']['Tables']['snippets']['Row']

interface SnippetWithTags extends Snippet {
  tags?: Array<{ id: string; name: string }>
}

interface ProfileWithSnippets extends Profile {
  snippets: SnippetWithTags[]
}

interface PublicProfileProps {
  profile: ProfileWithSnippets
}

export function PublicProfile({ profile }: PublicProfileProps) {
  return (
    <div>
      <ProfileHeader profile={profile} snippetCount={profile.snippets.length} />
      
      <div className="mb-4 flex items-center gap-3">
        <div className="w-6 h-px" style={{ backgroundColor: 'var(--editorial-accent)' }} />
        <span className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--editorial-accent)' }}>
          Collection
        </span>
      </div>
      <h2 className="text-xl mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>Public Snippets</h2>
      
      <PublicSnippetList snippets={profile.snippets} />
    </div>
  )
}
