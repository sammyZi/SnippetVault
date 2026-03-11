'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { CreateSnippetInput } from '@/lib/services/snippets'
import { TagInput } from './TagInput'

const COMMON_LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'csharp',
  'cpp',
  'c',
  'go',
  'rust',
  'ruby',
  'php',
  'swift',
  'kotlin',
  'scala',
  'html',
  'css',
  'sql',
  'bash',
  'powershell',
  'json',
]

const snippetFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  code: z.string().min(1, 'Code is required'),
  language: z.string(),
  is_public: z.boolean(),
  tags: z.array(z.string()),
})

type SnippetFormValues = z.infer<typeof snippetFormSchema>

interface SnippetEditorProps {
  initialData?: {
    title: string
    description?: string
    code: string
    language: string
    is_public: boolean
    tags?: string[]
  }
  onSubmit: (data: CreateSnippetInput) => void | Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function SnippetEditor({ initialData, onSubmit, onCancel, isLoading }: SnippetEditorProps) {
  const form = useForm<SnippetFormValues>({
    resolver: zodResolver(snippetFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      code: initialData?.code || '',
      language: initialData?.language || 'javascript',
      is_public: initialData?.is_public || false,
      tags: initialData?.tags || [],
    },
  })

  // Update form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description || '',
        code: initialData.code,
        language: initialData.language,
        is_public: initialData.is_public,
        tags: initialData.tags || [],
      })
    }
  }, [initialData, form])

  const handleFormSubmit = (values: SnippetFormValues) => {
    onSubmit({
      title: values.title.trim(),
      description: values.description?.trim() || undefined,
      code: values.code.trim(),
      language: values.language,
      is_public: values.is_public,
      tags: values.tags,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter snippet title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter snippet description (optional)"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste your code here"
                  className="font-mono"
                  rows={12}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COMMON_LANGUAGES.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Add tags..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_public"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 space-y-0">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="!mt-0">Make snippet public</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Snippet'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
