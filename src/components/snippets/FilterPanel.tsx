'use client'

import { useUIStore } from '@/lib/store/uiStore'
import { useTags } from '@/lib/hooks/useTags'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

// Common programming languages
const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Go',
  'Rust',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'HTML',
  'CSS',
  'SQL',
  'Shell',
  'Other',
]

export function FilterPanel() {
  const {
    languageFilter,
    setLanguageFilter,
    tagFilter,
    setTagFilter,
    visibilityFilter,
    setVisibilityFilter,
  } = useUIStore()

  const { data: allTags } = useTags()

  const handleTagToggle = (tagName: string) => {
    if (tagFilter.includes(tagName)) {
      setTagFilter(tagFilter.filter((t) => t !== tagName))
    } else {
      setTagFilter([...tagFilter, tagName])
    }
  }

  const handleClearFilters = () => {
    setLanguageFilter(null)
    setTagFilter([])
    setVisibilityFilter('all')
  }

  const hasActiveFilters = languageFilter || tagFilter.length > 0 || visibilityFilter !== 'all'

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-neutral-200">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-8 text-xs"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Language Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-700">Language</label>
        <Select
          value={languageFilter || 'all'}
          onValueChange={(value) => setLanguageFilter(value === 'all' ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Visibility Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-700">Visibility</label>
        <Select
          value={visibilityFilter}
          onValueChange={(value) =>
            setVisibilityFilter(value as 'all' | 'public' | 'private')
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All snippets</SelectItem>
            <SelectItem value="public">Public only</SelectItem>
            <SelectItem value="private">Private only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tag Filter */}
      {allTags && allTags.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-700">Tags</label>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const isSelected = tagFilter.includes(tag.name)
              return (
                <Badge
                  key={tag.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-neutral-100"
                  onClick={() => handleTagToggle(tag.name)}
                >
                  {tag.name}
                  {isSelected && <X className="ml-1 h-3 w-3" />}
                </Badge>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
