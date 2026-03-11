'use client'

import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useTags } from '@/lib/hooks/useTags'

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}

/**
 * TagInput component with autocomplete suggestions
 * Validates: Requirements 20.1, 20.4, 20.5
 */
export function TagInput({ value, onChange, placeholder = 'Add tags...' }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const { data: allTags = [] } = useTags()

  // Filter suggestions based on input and exclude already selected tags
  const suggestions = inputValue.trim()
    ? allTags
        .filter(tag => 
          tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
          !value.includes(tag.name)
        )
        .slice(0, 5) // Limit to 5 suggestions
    : []

  useEffect(() => {
    setSelectedIndex(0)
  }, [inputValue])

  const addTag = (tagName: string) => {
    const trimmedTag = tagName.trim().toLowerCase()
    console.log('🏷️ TagInput - Adding tag:', trimmedTag)
    console.log('🏷️ TagInput - Current value:', value)
    if (trimmedTag && !value.includes(trimmedTag)) {
      const newTags = [...value, trimmedTag]
      console.log('🏷️ TagInput - Calling onChange with:', newTags)
      onChange(newTags)
      setInputValue('')
      setShowSuggestions(false)
      inputRef.current?.focus()
    } else {
      console.log('🏷️ TagInput - Tag not added (empty or duplicate)')
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (showSuggestions && suggestions.length > 0) {
        addTag(suggestions[selectedIndex].name)
      } else if (inputValue.trim()) {
        addTag(inputValue)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      removeTag(value[value.length - 1])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setShowSuggestions(newValue.trim().length > 0)
  }

  const handleBlur = () => {
    // Delay to allow click on suggestion
    setTimeout(() => {
      setShowSuggestions(false)
    }, 200)
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue.trim() && setShowSuggestions(true)}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="w-full pr-20"
          />
          {inputValue.trim() && (
            <button
              type="button"
              onClick={() => addTag(inputValue)}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-md transition-colors"
            >
              Add
            </button>
          )}
        </div>
        <p className="text-xs text-neutral-500 mt-1">Press Enter or click Add to create tag</p>
        
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-md shadow-lg max-h-40 overflow-y-auto"
          >
            {suggestions.map((tag, index) => (
              <button
                key={tag.id}
                type="button"
                className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 ${
                  index === selectedIndex ? 'bg-neutral-100' : ''
                }`}
                onClick={() => addTag(tag.name)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-neutral-300 transition-colors"
              onClick={() => removeTag(tag)}
            >
              {tag}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
