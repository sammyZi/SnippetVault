import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border-neutral-100">
        <CardHeader className="text-center pb-2 pt-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-error-100 mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-error-600" strokeWidth={2.5} />
          </div>
          <CardTitle className="text-xl font-bold">Verification failed</CardTitle>
          <CardDescription className="text-sm mt-1">
            There was a problem verifying your email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-8 pb-8">
          <div className="space-y-3 text-sm text-neutral-600">
            <p>The verification link may have expired or already been used.</p>
            <p className="font-bold">What you can do:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Try signing up again</li>
              <li>Check if you already verified your email and try logging in</li>
              <li>Contact support if the problem persists</li>
            </ul>
          </div>
          <div className="pt-2 space-y-3">
            <Link href="/signup" className="block w-full">
              <Button className="w-full h-9 text-sm font-bold rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-200 transition-all">
                Sign up again
              </Button>
            </Link>
            <Link href="/login" className="block w-full">
              <Button variant="outline" className="w-full h-9 text-sm font-bold rounded-xl">
                Go to login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
