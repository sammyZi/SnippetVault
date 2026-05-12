'use client'

import { useState } from 'react'
import { signIn } from '@/app/actions/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Mail, Lock, Loader2, AlertCircle, Eye, EyeOff, ArrowRight } from 'lucide-react'

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    const result = await signIn(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="animate-fadeInUp">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-px" style={{ backgroundColor: 'var(--editorial-accent)' }} />
        <span className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--editorial-accent)' }}>
          Authentication
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl tracking-tight mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>
        Welcome back
      </h1>
      <p className="text-sm mb-10" style={{ color: 'var(--editorial-muted)' }}>
        Sign in to your SnippetVault account
      </p>

      {/* Divider */}
      <div className="h-px w-full mb-8" style={{ backgroundColor: 'var(--editorial-rule)' }} />

      <form action={handleSubmit} className="space-y-6">
        {error && (
          <div
            className="flex items-center gap-2 p-3 text-sm rounded-sm border animate-fadeInUp"
            style={{
              color: 'var(--editorial-accent)',
              backgroundColor: 'rgba(192, 69, 42, 0.06)',
              borderColor: 'rgba(192, 69, 42, 0.2)',
            }}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-[11px] tracking-[0.15em] uppercase font-semibold"
            style={{ color: 'var(--editorial-ink)' }}
          >
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--editorial-muted)' }} />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={loading}
              className="pl-10 h-11 text-sm rounded-sm border-[var(--editorial-rule)] focus:border-[var(--editorial-ink)] transition-all"
              style={{ backgroundColor: 'var(--editorial-bg-alt)', color: 'var(--editorial-ink)' }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-[11px] tracking-[0.15em] uppercase font-semibold"
            style={{ color: 'var(--editorial-ink)' }}
          >
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--editorial-muted)' }} />
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              required
              disabled={loading}
              className="pl-10 pr-10 h-11 text-sm rounded-sm border-[var(--editorial-rule)] focus:border-[var(--editorial-ink)] transition-all"
              style={{ backgroundColor: 'var(--editorial-bg-alt)', color: 'var(--editorial-ink)' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: 'var(--editorial-muted)' }}
              disabled={loading}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="pt-2 space-y-5">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 flex items-center justify-center gap-2 text-sm font-semibold rounded-full transition-all hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] disabled:opacity-50"
            style={{
              backgroundColor: 'var(--editorial-ink)',
              color: 'var(--editorial-bg)',
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="h-px w-full" style={{ backgroundColor: 'var(--editorial-rule)' }} />

          <p className="text-sm text-center" style={{ color: 'var(--editorial-muted)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold transition-colors hover:underline" style={{ color: 'var(--editorial-ink)' }}>
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
