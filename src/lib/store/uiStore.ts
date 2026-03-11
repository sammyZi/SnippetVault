import { create } from 'zustand'

interface UIStore {
  // Search and filters
  searchQuery: string
  setSearchQuery: (query: string) => void
  languageFilter: string | null
  setLanguageFilter: (language: string | null) => void
  tagFilter: string[]
  setTagFilter: (tags: string[]) => void
  visibilityFilter: 'all' | 'public' | 'private'
  setVisibilityFilter: (visibility: 'all' | 'public' | 'private') => void
  
  // UI state
  isCreateDialogOpen: boolean
  setCreateDialogOpen: (open: boolean) => void
  editingSnippetId: string | null
  setEditingSnippetId: (id: string | null) => void
}

export const useUIStore = create<UIStore>((set) => ({
  // Search and filters
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  languageFilter: null,
  setLanguageFilter: (language) => set({ languageFilter: language }),
  tagFilter: [],
  setTagFilter: (tags) => set({ tagFilter: tags }),
  visibilityFilter: 'all',
  setVisibilityFilter: (visibility) => set({ visibilityFilter: visibility }),
  
  // UI state
  isCreateDialogOpen: false,
  setCreateDialogOpen: (open) => set({ isCreateDialogOpen: open }),
  editingSnippetId: null,
  setEditingSnippetId: (id) => set({ editingSnippetId: id }),
}))
