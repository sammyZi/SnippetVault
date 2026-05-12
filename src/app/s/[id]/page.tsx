import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SnippetView } from '@/components/snippets/SnippetView'
import { Forbidden } from '@/components/ui/forbidden'
import { Database } from '@/lib/database.types'
import { Braces } from 'lucide-react'
import Link from 'next/link'

type Snippet = Database['public']['Tables']['snippets']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

interface SnippetWithProfile extends Snippet {
  profile: Profile
  tags?: Array<{ id: string; name: string }>
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PublicSnippetPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch snippet with profile and tags
  const { data: snippet, error } = await supabase
    .from('snippets')
    .select(`
      *,
      profile:profiles(*),
      tags:snippet_tags(tag:tags(*))
    `)
    .eq('id', id)
    .single()

  // Handle non-existent snippet
  if (error || !snippet) {
    notFound()
  }

  // Check if snippet is accessible
  const { data: { user } } = await supabase.auth.getUser()
  
  // If snippet is private, check access permissions
  if (!snippet.is_public) {
    // Not authenticated - show 403
    if (!user) {
      return <Forbidden message="This snippet is private. You need permission to view it." />
    }

    // Check if user owns the snippet or has share permission
    const isOwner = user.id === snippet.user_id
    
    if (!isOwner) {
      // Check for share permission
      const { data: sharePermission } = await supabase
        .from('snippet_shares')
        .select('id')
        .eq('snippet_id', id)
        .eq('shared_with_user_id', user.id)
        .single()

      if (!sharePermission) {
        return <Forbidden message="This snippet is private. You need permission to view it." showLoginButton={false} />
      }
    }
  }

  // Transform tags data
  const snippetWithTags: SnippetWithProfile = {
    ...snippet,
    tags: snippet.tags?.map((st: { tag: { id: string; name: string } }) => st.tag) || [],
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--editorial-bg)' }}>
      {/* Top bar */}
      <div className="w-full border-b border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
        <div className="max-w-4xl mx-auto px-4 flex items-center h-8">
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--editorial-muted)' }}>
            SV / 2026 · SNIPPET · PUBLIC VIEW
          </span>
        </div>
      </div>
      {/* Nav */}
      <nav className="w-full border-b border-[var(--editorial-rule)]">
        <div className="max-w-4xl mx-auto px-4 flex items-center h-14">
          <Link href="/" className="flex items-center gap-2">
            <Braces className="w-4 h-4" style={{ color: 'var(--editorial-accent)' }} strokeWidth={2.5} />
            <span className="text-lg" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>
              SnippetVault
            </span>
          </Link>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <SnippetView snippet={snippetWithTags} />
      </div>
    </div>
  )
}
