import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PublicProfile } from '@/components/profile/PublicProfile'
import { Database } from '@/lib/database.types'
import { Braces } from 'lucide-react'
import Link from 'next/link'

type Profile = Database['public']['Tables']['profiles']['Row']
type Snippet = Database['public']['Tables']['snippets']['Row']

interface SnippetWithTags extends Snippet {
  tags?: Array<{ id: string; name: string }>
}

interface ProfileWithSnippets extends Profile {
  snippets: SnippetWithTags[]
}

interface PageProps {
  params: Promise<{ username: string }>
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params
  const supabase = await createClient()

  // Fetch user profile by username
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  // Handle non-existent username - display 404
  if (profileError || !profile) {
    notFound()
  }

  // Fetch public snippets for this user
  const { data: snippets, error: snippetsError } = await supabase
    .from('snippets')
    .select(`
      *,
      tags:snippet_tags(tag:tags(*))
    `)
    .eq('user_id', profile.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  // If error fetching snippets, return empty array
  const publicSnippets: SnippetWithTags[] = snippetsError
    ? []
    : snippets.map(snippet => ({
        ...snippet,
        tags: snippet.tags?.map((st: { tag: { id: string; name: string } }) => st.tag) || [],
      }))

  const profileWithSnippets: ProfileWithSnippets = {
    ...profile,
    snippets: publicSnippets,
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--editorial-bg)' }}>
      {/* Top bar */}
      <div className="w-full border-b border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center h-8">
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--editorial-muted)' }}>
            SV / 2026 · PROFILE · @{username}
          </span>
        </div>
      </div>
      {/* Nav */}
      <nav className="w-full border-b border-[var(--editorial-rule)]">
        <div className="max-w-6xl mx-auto px-4 flex items-center h-14">
          <Link href="/" className="flex items-center gap-2">
            <Braces className="w-4 h-4" style={{ color: 'var(--editorial-accent)' }} strokeWidth={2.5} />
            <span className="text-lg" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>
              SnippetVault
            </span>
          </Link>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PublicProfile profile={profileWithSnippets} />
      </div>
    </div>
  )
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60
