import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShieldAlert, LogIn, Home } from 'lucide-react'

interface ForbiddenProps {
  message?: string
  showLoginButton?: boolean
}

export function Forbidden({ 
  message = 'You don\'t have permission to access this resource.',
  showLoginButton = true 
}: ForbiddenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>
      
      <div className="text-center max-w-md relative z-10">
        <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
          <ShieldAlert className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">403</h1>
        <h2 className="text-2xl font-semibold mb-3 text-neutral-800">Access Denied</h2>
        <p className="text-neutral-600 mb-8 leading-relaxed">
          {message}
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          {showLoginButton && (
            <Link href="/login">
              <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <LogIn className="w-4 h-4 mr-2" />
                Log In
              </Button>
            </Link>
          )}
          <Link href="/dashboard">
            <Button variant="outline" className="border-2 hover:bg-white/80">
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
