import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  shareWithUser,
  revokeShare,
  getSharedUsers,
  getSnippetsSharedWithMe,
} from '../services/sharing'

export const sharingQueryKeys = {
  sharedUsers: (snippetId: string) => ['snippet-shares', snippetId] as const,
  sharedWithMe: ['snippets-shared-with-me'] as const,
}

/**
 * Hook to get users who have access to a snippet
 */
export function useSharedUsers(snippetId: string) {
  return useQuery({
    queryKey: sharingQueryKeys.sharedUsers(snippetId),
    queryFn: () => getSharedUsers(snippetId),
    enabled: !!snippetId,
  })
}

/**
 * Hook to get snippets shared with the current user
 */
export function useSnippetsSharedWithMe() {
  return useQuery({
    queryKey: sharingQueryKeys.sharedWithMe,
    queryFn: getSnippetsSharedWithMe,
  })
}

/**
 * Hook to share a snippet with a user
 */
export function useShareSnippet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ snippetId, usernameOrEmail }: { snippetId: string; usernameOrEmail: string }) =>
      shareWithUser(snippetId, usernameOrEmail),
    onSuccess: (data, variables) => {
      // Invalidate the shared users list for this snippet
      queryClient.invalidateQueries({
        queryKey: sharingQueryKeys.sharedUsers(variables.snippetId),
      })
    },
  })
}

/**
 * Hook to revoke share permission
 */
export function useRevokeShare() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ shareId, snippetId }: { shareId: string; snippetId: string }) =>
      revokeShare(shareId),
    onSuccess: (data, variables) => {
      // Invalidate the shared users list for this snippet
      queryClient.invalidateQueries({
        queryKey: sharingQueryKeys.sharedUsers(variables.snippetId),
      })
    },
  })
}
