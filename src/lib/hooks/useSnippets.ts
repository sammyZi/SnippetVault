import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createSnippet,
  updateSnippet,
  deleteSnippet,
  getSnippet,
  getUserSnippets,
  UpdateSnippetInput,
  SnippetFilters,
  SnippetWithTags,
} from '../services/snippets'
import { useUIStore } from '../store/uiStore'

export const queryKeys = {
  snippets: {
    all: ['snippets'] as const,
    lists: () => [...queryKeys.snippets.all, 'list'] as const,
    list: (filters?: SnippetFilters) => [...queryKeys.snippets.lists(), filters] as const,
    details: () => [...queryKeys.snippets.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.snippets.details(), id] as const,
  },
}

export function useSnippets(filters?: SnippetFilters) {
  const { searchQuery, languageFilter, tagFilter, visibilityFilter } = useUIStore()

  // Merge store filters with any passed filters
  const mergedFilters: SnippetFilters = {
    ...filters,
    searchQuery: searchQuery || filters?.searchQuery,
    language: languageFilter || filters?.language,
    tags: tagFilter.length > 0 ? tagFilter : filters?.tags,
    visibility: visibilityFilter !== 'all' ? visibilityFilter : filters?.visibility,
  }

  return useQuery({
    queryKey: queryKeys.snippets.list(mergedFilters),
    queryFn: () => getUserSnippets(mergedFilters),
    initialData: [], // Start with empty array to prevent loading skeleton flash
    staleTime: 0, // Always refetch to get latest data
  })
}

export function useSnippet(id: string) {
  return useQuery({
    queryKey: queryKeys.snippets.detail(id),
    queryFn: () => getSnippet(id),
    enabled: !!id,
  })
}

export function useCreateSnippet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSnippet,
    onMutate: async (newSnippet) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.snippets.lists() })

      const previousSnippets = queryClient.getQueriesData({ queryKey: queryKeys.snippets.lists() })

      queryClient.setQueriesData<SnippetWithTags[]>(
        { queryKey: queryKeys.snippets.lists() },
        (old) => {
          if (!old) return old
          const optimisticSnippet: SnippetWithTags = {
            id: `temp-${Date.now()}`,
            user_id: '',
            title: newSnippet.title,
            description: newSnippet.description || null,
            code: newSnippet.code,
            language: newSnippet.language,
            is_public: newSnippet.is_public,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            tags: [],
          }
          return [optimisticSnippet, ...old]
        }
      )

      return { previousSnippets }
    },
    onError: (err, newSnippet, context) => {
      if (context?.previousSnippets) {
        context.previousSnippets.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.snippets.lists() })
    },
  })
}

export function useUpdateSnippet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSnippetInput }) =>
      updateSnippet(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.snippets.detail(id) })
      await queryClient.cancelQueries({ queryKey: queryKeys.snippets.lists() })

      const previousSnippet = queryClient.getQueryData(queryKeys.snippets.detail(id))
      const previousLists = queryClient.getQueriesData({ queryKey: queryKeys.snippets.lists() })

      queryClient.setQueryData<SnippetWithTags>(
        queryKeys.snippets.detail(id),
        (old) => {
          if (!old) return old
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { tags, ...updateData } = data
          return {
            ...old,
            ...updateData,
            updated_at: new Date().toISOString(),
          }
        }
      )

      queryClient.setQueriesData<SnippetWithTags[]>(
        { queryKey: queryKeys.snippets.lists() },
        (old) => {
          if (!old) return old
          return old.map((snippet) => {
            if (snippet.id === id) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { tags, ...updateData } = data
              return { ...snippet, ...updateData, updated_at: new Date().toISOString() }
            }
            return snippet
          })
        }
      )

      return { previousSnippet, previousLists }
    },
    onError: (err, { id }, context) => {
      if (context?.previousSnippet) {
        queryClient.setQueryData(queryKeys.snippets.detail(id), context.previousSnippet)
      }
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSettled: (data, error, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.snippets.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.snippets.lists() })
    },
  })
}

export function useDeleteSnippet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSnippet,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.snippets.lists() })

      const previousLists = queryClient.getQueriesData({ queryKey: queryKeys.snippets.lists() })

      queryClient.setQueriesData<SnippetWithTags[]>(
        { queryKey: queryKeys.snippets.lists() },
        (old) => {
          if (!old) return old
          return old.filter((snippet) => snippet.id !== id)
        }
      )

      return { previousLists }
    },
    onError: (err, id, context) => {
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.snippets.lists() })
    },
  })
}
