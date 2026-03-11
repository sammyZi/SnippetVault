import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getUser } from './actions/auth'
import { redirect } from 'next/navigation'
import { Code2, Search, Share2, ArrowRight, Braces } from 'lucide-react'
import { HeroSection } from '@/components/ui/hero-section-with-smooth-bg-shader'
import { GlassCard, GlassButton } from '@/components/ui/glass-card'

export default async function Home() {
  const user = await getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <HeroSection className="text-neutral-900">
      <div className="max-w-3xl w-full mx-auto px-4 py-16 text-center space-y-12">
        {/* Logo & Headline */}
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-md shadow-sm mb-2">
            <Braces className="w-7 h-7 text-primary-600" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight drop-shadow-sm">
            Snippet<span className="text-primary-600">Vault</span>
          </h1>
          <p className="text-lg text-neutral-800 font-medium max-w-xl mx-auto leading-relaxed drop-shadow-sm">
            Save, organize, and share your code snippets with ease
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Button asChild size="lg" className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl hover:shadow-primary-600/40">
              <Link href="/signup">
                Get Started
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
            <Link href="/login" className="w-full sm:w-auto">
              <GlassButton className="w-full">
                Sign In
              </GlassButton>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 relative z-10">
          <GlassCard className="p-6">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/40 backdrop-blur-sm mb-4 shadow-lg border border-white/40">
              <Code2 className="w-5 h-5 text-accent-600" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mb-2">Save Snippets</h3>
            <p className="text-sm text-neutral-700 font-medium leading-relaxed">
              Store your code snippets with syntax highlighting and metadata
            </p>
          </GlassCard>
          
          <GlassCard className="p-6">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/40 backdrop-blur-sm mb-4 shadow-lg border border-white/40">
              <Search className="w-5 h-5 text-secondary-600" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mb-2">Search & Filter</h3>
            <p className="text-sm text-neutral-700 font-medium leading-relaxed">
              Quickly find snippets by title, language, or tags
            </p>
          </GlassCard>
          
          <GlassCard className="p-6">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/40 backdrop-blur-sm mb-4 shadow-lg border border-white/40">
              <Share2 className="w-5 h-5 text-primary-600" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mb-2">Share Easily</h3>
            <p className="text-sm text-neutral-700 font-medium leading-relaxed">
              Share snippets publicly or with specific users
            </p>
          </GlassCard>
        </div>
      </div>
    </HeroSection>
  )
}
