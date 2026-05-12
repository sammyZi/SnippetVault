'use client'

import { useState } from 'react'
import { signUp } from '@/app/actions/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { User, Mail, Lock, Loader2, AlertCircle, CheckCircle, Eye, EyeOff, ArrowRight } from 'lucide-react'

export function SignupForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null)

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    // Show confirmation dialog
    setPendingFormData(formData)
    setShowConfirmDialog(true)
  }

  async function confirmSignup() {
    if (!pendingFormData) return

    setShowConfirmDialog(false)
    setLoading(true)
    setError(null)

    const emailValue = pendingFormData.get('email') as string

    const result = await signUp(pendingFormData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else if (result?.requiresEmailConfirmation) {
      setEmail(emailValue)
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="animate-fadeInUp">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px" style={{ backgroundColor: '#3d8c40' }} />
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: '#3d8c40' }}>
            Confirmation
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6" style={{ color: '#3d8c40' }} strokeWidth={2} />
          <h1 className="text-3xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>
            Check your email
          </h1>
        </div>
        <p className="text-sm mb-8" style={{ color: 'var(--editorial-muted)' }}>
          We sent a confirmation link to your inbox
        </p>

        <div className="h-px w-full mb-8" style={{ backgroundColor: 'var(--editorial-rule)' }} />

        <div className="p-4 rounded-sm border mb-6" style={{ backgroundColor: 'rgba(61, 140, 64, 0.06)', borderColor: 'rgba(61, 140, 64, 0.2)' }}>
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#3d8c40' }} />
            <div className="space-y-1 min-w-0 flex-1">
              <p className="text-[11px] tracking-[0.1em] uppercase font-semibold" style={{ color: 'var(--editorial-ink)' }}>
                Confirmation sent to:
              </p>
              <p className="text-sm font-medium break-all" style={{ color: '#3d8c40' }}>{email}</p>
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--editorial-muted)' }}>
          Please check your email and click the confirmation link to activate your account.
        </p>

        <div className="p-3 rounded-sm border mb-8" style={{ backgroundColor: 'rgba(192, 150, 42, 0.06)', borderColor: 'rgba(192, 150, 42, 0.2)' }}>
          <p className="text-[12px]" style={{ color: 'var(--editorial-muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--editorial-ink)' }}>Didn&apos;t receive it?</span>{' '}
            Check your spam folder or contact support.
          </p>
        </div>

        <Link
          href="/login"
          className="w-full h-11 flex items-center justify-center gap-2 text-sm font-semibold rounded-full transition-all hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
          style={{
            backgroundColor: 'var(--editorial-ink)',
            color: 'var(--editorial-bg)',
          }}
        >
          Go to login <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  const inputStyles = {
    backgroundColor: 'var(--editorial-bg-alt)',
    color: 'var(--editorial-ink)',
  }

  return (
    <>
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
          Create an account
        </h1>
        <p className="text-sm mb-10" style={{ color: 'var(--editorial-muted)' }}>
          Sign up to start saving your code snippets
        </p>

        {/* Divider */}
        <div className="h-px w-full mb-8" style={{ backgroundColor: 'var(--editorial-rule)' }} />

        <form onSubmit={handleFormSubmit} className="space-y-5">
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
              htmlFor="username"
              className="text-[11px] tracking-[0.15em] uppercase font-semibold"
              style={{ color: 'var(--editorial-ink)' }}
            >
              Username
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--editorial-muted)' }} />
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="johndoe"
                required
                disabled={loading}
                minLength={3}
                maxLength={30}
                pattern="[a-zA-Z0-9_-]+"
                title="Username can only contain letters, numbers, hyphens, and underscores"
                className="pl-10 h-11 text-sm rounded-sm border-[var(--editorial-rule)] focus:border-[var(--editorial-ink)] transition-all"
                style={inputStyles}
              />
            </div>
          </div>

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
                style={inputStyles}
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
                minLength={8}
                className="pl-10 pr-10 h-11 text-sm rounded-sm border-[var(--editorial-rule)] focus:border-[var(--editorial-ink)] transition-all"
                style={inputStyles}
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

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-[11px] tracking-[0.15em] uppercase font-semibold"
              style={{ color: 'var(--editorial-ink)' }}
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--editorial-muted)' }} />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                disabled={loading}
                minLength={8}
                className="pl-10 pr-10 h-11 text-sm rounded-sm border-[var(--editorial-rule)] focus:border-[var(--editorial-ink)] transition-all"
                style={inputStyles}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'var(--editorial-muted)' }}
                disabled={loading}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                  Creating account...
                </>
              ) : (
                <>
                  Sign up <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="h-px w-full" style={{ backgroundColor: 'var(--editorial-rule)' }} />

            <p className="text-sm text-center" style={{ color: 'var(--editorial-muted)' }}>
              Already have an account?{' '}
              <Link href="/login" className="font-semibold transition-colors hover:underline" style={{ color: 'var(--editorial-ink)' }}>
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md rounded-sm border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg)' }}>
          <DialogHeader>
            <DialogTitle className="text-lg" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)' }}>
              Confirm account creation
            </DialogTitle>
            <DialogDescription className="text-sm" style={{ color: 'var(--editorial-muted)' }}>
              Are you sure you want to create an account with these details?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="flex items-start gap-3 p-3 rounded-sm border border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
              <User className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--editorial-muted)' }} />
              <div className="space-y-1 min-w-0 flex-1">
                <p className="text-[11px] tracking-[0.1em] uppercase font-semibold" style={{ color: 'var(--editorial-ink)' }}>Username</p>
                <p className="text-sm break-all" style={{ color: 'var(--editorial-muted)' }}>
                  {pendingFormData?.get('username') as string}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-sm border border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
              <Mail className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--editorial-muted)' }} />
              <div className="space-y-1 min-w-0 flex-1">
                <p className="text-[11px] tracking-[0.1em] uppercase font-semibold" style={{ color: 'var(--editorial-ink)' }}>Email</p>
                <p className="text-sm break-all" style={{ color: 'var(--editorial-muted)' }}>
                  {pendingFormData?.get('email') as string}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="rounded-full border-[var(--editorial-rule)] text-sm"
              style={{ color: 'var(--editorial-ink)' }}
            >
              Cancel
            </Button>
            <button
              type="button"
              onClick={confirmSignup}
              className="h-10 px-5 text-sm font-semibold rounded-full transition-all hover:scale-[1.01] active:scale-[0.99]"
              style={{
                backgroundColor: 'var(--editorial-ink)',
                color: 'var(--editorial-bg)',
              }}
            >
              Confirm & Create
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
