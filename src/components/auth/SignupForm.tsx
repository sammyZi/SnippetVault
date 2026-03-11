'use client'

import { useState } from 'react'
import { signUp } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Link from 'next/link'
import { Braces, User, Mail, Lock, Loader2, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { theme } from '@/lib/theme'

export function SignupForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null)
  
  const authTheme = theme.pages.auth

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

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
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
      <Card className={authTheme.card.container}>
        <CardHeader className={authTheme.card.header}>
          <div className={`${authTheme.card.iconContainer} bg-success-100`}>
            <CheckCircle className="w-8 h-8 text-success-600" strokeWidth={2.5} />
          </div>
          <CardTitle className={authTheme.card.title}>Check your email</CardTitle>
          <CardDescription className={authTheme.card.description}>
            We sent a confirmation link to your inbox
          </CardDescription>
        </CardHeader>
        <CardContent className={authTheme.card.content}>
          <div className="flex items-start gap-3 p-4 bg-success-50 border-2 border-success-200 rounded-xl">
            <Mail className="w-5 h-5 text-success-600 shrink-0 mt-0.5" />
            <div className="space-y-1 min-w-0 flex-1">
              <p className="text-sm font-bold text-success-900">Confirmation email sent to:</p>
              <p className="text-base text-success-700 font-medium break-all">{email}</p>
            </div>
          </div>
          <div className="space-y-4 text-base text-neutral-700 leading-relaxed">
            <p className="font-medium">
              Please check your email and click the confirmation link to activate your account.
            </p>
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-xl">
              <p className="text-sm text-warning-900">
                <span className="font-bold">Didn&apos;t receive the email?</span>
                <br />
                <span className="text-warning-800">Check your spam folder or contact support if you need help.</span>
              </p>
            </div>
          </div>
          <div className="pt-2">
            <Link href="/login" className="block w-full">
              <Button className={authTheme.button.primary}>
                Go to login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="w-full max-w-md rounded-2xl border-2 border-white/40 bg-white shadow-2xl">
        <CardHeader className={authTheme.card.header}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 border border-primary-200 mx-auto mb-4">
            <Braces className="w-8 h-8 text-primary-600" strokeWidth={2.5} />
          </div>
          <CardTitle className={authTheme.card.title}>Create an account</CardTitle>
          <CardDescription className={authTheme.card.description}>
            Sign up to start saving your code snippets
          </CardDescription>
        </CardHeader>
      <form onSubmit={handleFormSubmit}>
        <CardContent className={authTheme.card.content}>
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-error-700 bg-error-50/80 backdrop-blur-sm border border-error-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <div className={authTheme.form.field}>
            <Label htmlFor="username" className={authTheme.form.label}>Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
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
                className="pl-10 h-9 text-sm rounded-xl bg-neutral-50 border-neutral-300 focus:bg-white transition-all"
              />
            </div>
            <p className={authTheme.form.helper}>
              3-30 characters, letters, numbers, hyphens, and underscores only
            </p>
          </div>
          <div className={authTheme.form.field}>
            <Label htmlFor="email" className={authTheme.form.label}>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                disabled={loading}
                className="pl-10 h-9 text-sm rounded-xl bg-neutral-50 border-neutral-300 focus:bg-white transition-all"
              />
            </div>
          </div>
          <div className={authTheme.form.field}>
            <Label htmlFor="password" className={authTheme.form.label}>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                disabled={loading}
                minLength={6}
                className="pl-10 pr-10 h-9 text-sm rounded-xl bg-neutral-50 border-neutral-300 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div className={authTheme.form.field}>
            <Label htmlFor="confirmPassword" className={authTheme.form.label}>Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                disabled={loading}
                minLength={6}
                className="pl-10 pr-10 h-9 text-sm rounded-xl bg-neutral-50 border-neutral-300 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div className="pt-2 space-y-4">
            <Button 
              type="submit" 
              className="w-full h-9 text-sm font-bold rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-600/40 transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : 'Sign up'}
            </Button>
            <p className="text-sm text-center text-neutral-700">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-600 hover:text-primary-700 font-bold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </form>
      </Card>
    </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Confirm account creation</DialogTitle>
            <DialogDescription className="text-sm">
              Are you sure you want to create an account with these details?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="flex items-start gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
              <User className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
              <div className="space-y-1 min-w-0 flex-1">
                <p className="text-sm font-bold text-neutral-900">Username</p>
                <p className="text-sm text-neutral-600 break-all">
                  {pendingFormData?.get('username') as string}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
              <Mail className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
              <div className="space-y-1 min-w-0 flex-1">
                <p className="text-sm font-bold text-neutral-900">Email</p>
                <p className="text-sm text-neutral-600 break-all">
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
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={confirmSignup}
              className="rounded-xl bg-primary-600 hover:bg-primary-700 text-white"
            >
              Confirm & Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
