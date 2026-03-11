import { createClient } from '../supabase/client'
import { Database } from '../database.types'

type Tag = Database['public']['Tables']['tags']['Row']

/**
 * Get or create tags by name. Reuses existing tags and creates new ones as needed.
 * Validates: Requirements 20.2, 20.3
 */
export async function getOrCreateTags(tagNames: string[]): Promise<Tag[]> {
  if (tagNames.length === 0) return []

  const supabase = createClient()
  const normalizedNames = tagNames
    .map(name => name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9_-]/g, ''))
    .filter(name => name.length > 0)

  // First, try to get existing tags
  const { data: existingTags, error: fetchError } = await supabase
    .from('tags')
    .select('*')
    .in('name', normalizedNames)

  if (fetchError) {
    console.error('Error fetching tags:', fetchError)
    throw new Error(`Failed to fetch tags: ${fetchError.message}`)
  }

  const existingTagNames = new Set(existingTags?.map(tag => tag.name) || [])
  const newTagNames = normalizedNames.filter(name => !existingTagNames.has(name))

  // Create new tags if needed
  if (newTagNames.length > 0) {
    const { data: newTags, error: insertError } = await supabase
      .from('tags')
      .insert(newTagNames.map(name => ({ name })))
      .select()

    if (insertError) {
      console.error('Error inserting tags:', insertError)
      throw new Error(`Failed to create tags: ${insertError.message}`)
    }

    return [...(existingTags || []), ...(newTags || [])]
  }

  return existingTags || []
}

/**
 * Assign tags to a snippet. Removes existing tag associations and creates new ones.
 * Validates: Requirements 20.1, 20.4
 */
export async function assignTags(snippetId: string, tagIds: string[]): Promise<void> {
  const supabase = createClient()

  // Remove existing tag associations
  const { error: deleteError } = await supabase
    .from('snippet_tags')
    .delete()
    .eq('snippet_id', snippetId)

  if (deleteError) {
    console.error('Error deleting snippet_tags:', deleteError)
    throw new Error(`Failed to remove existing tags: ${deleteError.message}`)
  }

  // Create new tag associations
  if (tagIds.length > 0) {
    const { error: insertError } = await supabase
      .from('snippet_tags')
      .insert(tagIds.map(tagId => ({ snippet_id: snippetId, tag_id: tagId })))

    if (insertError) {
      console.error('Error inserting snippet_tags:', insertError)
      throw new Error(`Failed to assign tags: ${insertError.message}`)
    }
  }
}

/**
 * Get all tags for a specific snippet
 */
export async function getSnippetTags(snippetId: string): Promise<Tag[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('snippet_tags')
    .select('tag:tags(*)')
    .eq('snippet_id', snippetId)

  if (error) throw error

  return data?.map((st: { tag: Tag }) => st.tag) || []
}

/**
 * Get all tags for autocomplete suggestions
 * Validates: Requirement 20.5
 */
export async function getAllTags(): Promise<Tag[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name')

  if (error) throw error

  return data || []
}
