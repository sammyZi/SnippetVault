import { useQuery } from '@tanstack/react-query'
import { getAllTags } from '../services/tags'

export const tagQueryKeys = {
  tags: {
    all: ['tags'] as const,
  },
}

/**
 * Hook to fetch all tags for autocomplete suggestions
 * Validates: Requirement 20.5
 */
export function useTags() {
  return useQuery({
    queryKey: tagQueryKeys.tags.all,
    queryFn: getAllTags,
    staleTime: 5 * 60 * 1000, // 5 minutes - tags don't change frequently
  })
}
