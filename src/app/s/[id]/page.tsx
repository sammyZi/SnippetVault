import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SnippetView } from '@/components/snippets/SnippetView'
import { Database } from '@/lib/database.types'

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
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4">403</h1>
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-neutral-600">
              This snippet is private. You need permission to view it.
            </p>
          </div>
        </div>
      )
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
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <h1 className="text-4xl font-bold mb-4">403</h1>
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-neutral-600">
                This snippet is private. You need permission to view it.
              </p>
            </div>
          </div>
        )
      }
    }
  }

  // Transform tags data
  const snippetWithTags: SnippetWithProfile = {
    ...snippet,
    tags: snippet.tags?.map((st: { tag: { id: string; name: string } }) => st.tag) || [],
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <SnippetView snippet={snippetWithTags} />
      </div>
    </div>
  )
}
