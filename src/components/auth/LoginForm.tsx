'use client'

import { useState } from 'react'
import { signIn } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Braces, Mail, Lock, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="w-full max-w-md rounded-2xl border-2 border-white/40 bg-white shadow-2xl">
        <CardHeader className="text-center pb-2 pt-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 border border-primary-200 mx-auto mb-4">
            <Braces className="w-7 h-7 text-primary-600" strokeWidth={2.5} />
          </div>
          <CardTitle className="text-2xl font-bold text-neutral-900 mb-2">Welcome back</CardTitle>
          <CardDescription className="text-base text-neutral-600 leading-relaxed">Sign in to your SnippetVault account</CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-5 px-8">
            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-error-700 bg-error-50/80 backdrop-blur-sm border border-error-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-neutral-900">Email</Label>
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
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold text-neutral-900">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  disabled={loading}
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
            <div className="pt-2 space-y-4">
              <Button type="submit" className="w-full h-9 text-sm font-bold rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-600/40 transition-all" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : 'Sign in'}
              </Button>
              <p className="text-sm text-center text-neutral-700">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-primary-600 hover:text-primary-700 font-bold transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
