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
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-neutral-900">Public Snippets</h2>
      </div>
      
      <PublicSnippetList snippets={profile.snippets} />
    </div>
  )
}
