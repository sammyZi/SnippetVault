import { createClient } from '../supabase/client'
import { Database } from '../database.types'
import { getOrCreateTags, assignTags } from './tags'

type Snippet = Database['public']['Tables']['snippets']['Row']
type SnippetInsert = Database['public']['Tables']['snippets']['Insert']
type SnippetUpdate = Database['public']['Tables']['snippets']['Update']

export interface CreateSnippetInput {
  title: string
  description?: string
  code: string
  language: string
  is_public: boolean
  tags?: string[]
}

export interface UpdateSnippetInput {
  title?: string
  description?: string
  code?: string
  language?: string
  is_public?: boolean
  tags?: string[]
}

export interface SnippetFilters {
  language?: string
  tags?: string[]
  visibility?: 'all' | 'public' | 'private'
  searchQuery?: string
}

export interface SnippetWithTags extends Snippet {
  tags?: Array<{ id: string; name: string }>
  profile?: Database['public']['Tables']['profiles']['Row']
}

export async function createSnippet(data: CreateSnippetInput): Promise<Snippet> {
  const supabase = createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError) {
    console.error('Auth error:', authError)
    throw new Error(`Authentication error: ${authError.message}`)
  }
  if (!user) throw new Error('User not authenticated')

  const snippetData: SnippetInsert = {
    user_id: user.id,
    title: data.title,
    description: data.description || null,
    code: data.code,
    language: data.language,
    is_public: data.is_public,
  }

  const { data: snippet, error } = await supabase
    .from('snippets')
    .insert(snippetData)
    .select()
    .single()

  if (error) {
    console.error('Snippet insert error:', error)
    throw new Error(`Failed to create snippet: ${error.message || JSON.stringify(error)}`)
  }

  // Handle tags if provided
  console.log('🏷️ createSnippet - Tags received:', data.tags)
  if (data.tags && data.tags.length > 0) {
    console.log('🏷️ createSnippet - Processing tags:', data.tags)
    const tags = await getOrCreateTags(data.tags)
    console.log('🏷️ createSnippet - Tags created/fetched:', tags)
    await assignTags(snippet.id, tags.map(tag => tag.id))
    console.log('🏷️ createSnippet - Tags assigned to snippet:', snippet.id)
  } else {
    console.log('🏷️ createSnippet - No tags provided or empty array')
  }

  return snippet
}

export async function updateSnippet(id: string, data: UpdateSnippetInput): Promise<Snippet> {
  const supabase = createClient()

  const snippetData: SnippetUpdate = {
    title: data.title,
    description: data.description,
    code: data.code,
    language: data.language,
    is_public: data.is_public,
    updated_at: new Date().toISOString(),
  }

  const { data: snippet, error } = await supabase
    .from('snippets')
    .update(snippetData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  // Handle tags if provided
  if (data.tags !== undefined) {
    if (data.tags.length > 0) {
      const tags = await getOrCreateTags(data.tags)
      await assignTags(id, tags.map(tag => tag.id))
    } else {
      // Remove all tags if empty array provided
      await assignTags(id, [])
    }
  }

  return snippet
}

export async function deleteSnippet(id: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from('snippets')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function getSnippet(id: string): Promise<SnippetWithTags | null> {
  const supabase = createClient()

  const { data: snippet, error } = await supabase
    .from('snippets')
    .select(`
      *,
      profile:profiles(*),
      tags:snippet_tags(tag:tags(*))
    `)
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return {
    ...snippet,
    tags: snippet.tags
      ?.map((st: { tag: { id: string; name: string } | null }) => st.tag)
      .filter((tag): tag is { id: string; name: string } => tag !== null) || [],
  }
}

export async function getUserSnippets(filters?: SnippetFilters): Promise<SnippetWithTags[]> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  let query = supabase
    .from('snippets')
    .select(`
      *,
      tags:snippet_tags(tag:tags(*))
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (filters?.language) {
    query = query.eq('language', filters.language)
  }

  if (filters?.visibility && filters.visibility !== 'all') {
    query = query.eq('is_public', filters.visibility === 'public')
  }

  if (filters?.searchQuery) {
    query = query.or(`title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`)
  }

  const { data: snippets, error } = await query

  if (error) throw error

  let results = snippets.map(snippet => ({
    ...snippet,
    tags: snippet.tags
      ?.map((st: { tag: { id: string; name: string } | null }) => st.tag)
      .filter((tag): tag is { id: string; name: string } => tag !== null) || [],
  }))

  if (filters?.tags && filters.tags.length > 0) {
    results = results.filter(snippet =>
      filters.tags!.some(filterTag =>
        snippet.tags?.some(tag => tag.name === filterTag)
      )
    )
  }

  return results
}
