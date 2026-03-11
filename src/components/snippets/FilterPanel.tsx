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
import { X, Filter, Eye, EyeOff, Code2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Common programming languages
const LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'csharp',
  'go',
  'rust',
  'ruby',
  'php',
  'swift',
  'kotlin',
  'html',
  'css',
  'sql',
  'bash',
  'powershell',
  'json',
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
  const activeFilterCount = (languageFilter ? 1 : 0) + tagFilter.length + (visibilityFilter !== 'all' ? 1 : 0)

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-neutral-600" />
            <CardTitle className="text-sm font-semibold">Filters</CardTitle>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="h-7 text-xs hover:bg-neutral-100 px-2"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Filter */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-700 flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5" />
            Language
          </label>
          <Select
            value={languageFilter || 'all'}
            onValueChange={(value) => setLanguageFilter(value === 'all' ? null : value)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All languages" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
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
          <label className="text-xs font-medium text-neutral-700 flex items-center gap-1.5">
            {visibilityFilter === 'public' ? (
              <Eye className="h-3.5 w-3.5" />
            ) : visibilityFilter === 'private' ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
            Visibility
          </label>
          <Select
            value={visibilityFilter}
            onValueChange={(value) =>
              setVisibilityFilter(value as 'all' | 'public' | 'private')
            }
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All snippets</SelectItem>
              <SelectItem value="public">
                <div className="flex items-center gap-2">
                  <Eye className="h-3.5 w-3.5" />
                  Public only
                </div>
              </SelectItem>
              <SelectItem value="private">
                <div className="flex items-center gap-2">
                  <EyeOff className="h-3.5 w-3.5" />
                  Private only
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tag Filter */}
        {allTags && allTags.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-700">
              Tags {tagFilter.length > 0 && `(${tagFilter.length} selected)`}
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-[200px] overflow-y-auto p-1">
              {allTags.map((tag) => {
                const isSelected = tagFilter.includes(tag.name)
                return (
                  <Badge
                    key={tag.id}
                    variant={isSelected ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-neutral-100 transition-colors text-xs py-1 px-2.5"
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
      </CardContent>
    </Card>
  )
}
