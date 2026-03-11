import { createClient } from '../supabase/client'
import { Database } from '../database.types'

type SnippetShare = Database['public']['Tables']['snippet_shares']['Row']
type SnippetShareInsert = Database['public']['Tables']['snippet_shares']['Insert']
type Profile = Database['public']['Tables']['profiles']['Row']

export interface SharedUser extends Profile {
  share_id: string
  shared_at: string
}

/**
 * Share a snippet with a specific user by email address
 * Requirements: 7.2
 */
export async function shareWithUser(
  snippetId: string,
  email: string
): Promise<SnippetShare> {
  const supabase = createClient()

  // Verify user is authenticated
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  if (!currentUser) throw new Error('User not authenticated')

  // Look up the target user by email using the database function
  const { data: targetUserId, error: lookupError } = await supabase
    .rpc('get_user_id_by_email', { user_email: email })

  if (lookupError) {
    console.error('Email lookup error:', lookupError)
    throw new Error('Failed to look up user')
  }

  if (!targetUserId) {
    throw new Error('No account found with that email')
  }

  // Prevent sharing with yourself
  if (targetUserId === currentUser.id) {
    throw new Error('You cannot share a snippet with yourself')
  }

  // Create the share record
  const shareData: SnippetShareInsert = {
    snippet_id: snippetId,
    shared_with_user_id: targetUserId,
  }

  const { data: share, error } = await supabase
    .from('snippet_shares')
    .insert(shareData)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      throw new Error('Snippet is already shared with this user')
    }
    throw error
  }

  return share
}

/**
 * Revoke share permission for a specific user
 * Requirements: 7.4, 7.5
 */
export async function revokeShare(shareId: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from('snippet_shares')
    .delete()
    .eq('id', shareId)

  if (error) throw error
}

/**
 * Get list of users who have access to a snippet
 * Requirements: 7.4
 */
export async function getSharedUsers(snippetId: string): Promise<SharedUser[]> {
  const supabase = createClient()

  const { data: shares, error } = await supabase
    .from('snippet_shares')
    .select(`
      id,
      created_at,
      profile:profiles(*)
    `)
    .eq('snippet_id', snippetId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return shares.map((share: any) => ({
    ...share.profile,
    share_id: share.id,
    shared_at: share.created_at,
  }))
}

/**
 * Get snippets that have been shared with the current user
 * Requirements: 7.3
 */
export async function getSnippetsSharedWithMe() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  const { data: shares, error } = await supabase
    .from('snippet_shares')
    .select(`
      snippet:snippets(
        *,
        profile:profiles(*),
        tags:snippet_tags(tag:tags(*))
      )
    `)
    .eq('shared_with_user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error

  return shares.map((share: any) => ({
    ...share.snippet,
    tags: share.snippet.tags?.map((st: { tag: { id: string; name: string } }) => st.tag) || [],
  }))
}
