import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getUser } from './actions/auth'
import { redirect } from 'next/navigation'
import { Code2, Search, Share2, ArrowRight, Braces, Tag, Globe, Copy } from 'lucide-react'
import { HeroSection } from '@/components/ui/hero-section-with-smooth-bg-shader'
import { GlassCard, GlassButton } from '@/components/ui/glass-card'

const CODE_DEMO = `// Debounce utility
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`

export default async function Home() {
  const user = await getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <HeroSection className="text-neutral-900">
      <div className="max-w-5xl w-full mx-auto px-4 py-12 flex flex-col lg:flex-row items-center gap-12 min-h-screen">

        {/* ── Left: hero copy ── */}
        <div className="flex-1 space-y-7 text-center lg:text-left relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-md shadow-md border border-white/60">
              <Braces className="w-6 h-6 text-primary-600" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Snippet<span className="text-primary-600">Vault</span>
            </h1>
          </div>

          <p className="text-lg text-neutral-700 font-medium max-w-md mx-auto lg:mx-0 leading-relaxed">
            Capture every clever snippet. Find it in seconds. Share it with the world — or keep it just for you.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {[
              { icon: <Code2 className="w-3.5 h-3.5" />, label: 'Syntax highlighting' },
              { icon: <Search className="w-3.5 h-3.5" />, label: 'Instant search' },
              { icon: <Tag className="w-3.5 h-3.5" />, label: 'Tags & filters' },
              { icon: <Share2 className="w-3.5 h-3.5" />, label: 'Easy sharing' },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 backdrop-blur-sm border border-white/50 text-xs font-semibold text-neutral-700">
                {icon}{label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Button asChild size="lg" className="h-auto px-7 py-3 text-base font-bold rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl hover:-translate-y-0.5">
              <Link href="/signup">
                Start for free <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
            <Link href="/login">
              <GlassButton className="px-7 py-3 text-base w-full">Sign in</GlassButton>
            </Link>
          </div>
        </div>

        {/* ── Right: code preview card ── */}
        <div className="flex-1 relative z-10 w-full max-w-lg">
          <GlassCard className="overflow-hidden" hover={false}>
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/20 bg-white/10">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-3 text-xs font-mono font-semibold text-neutral-600">debounce.js</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-md bg-neutral-900/80 text-neutral-200 font-mono font-medium">JavaScript</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-700 font-semibold border border-emerald-300/60 inline-flex items-center gap-1">
                  <Globe className="w-3 h-3" />Public
                </span>
              </div>
            </div>
            {/* Code */}
            <div className="bg-neutral-950/90 px-5 py-4">
              <pre className="text-sm font-mono text-neutral-200 leading-relaxed whitespace-pre">
                <code>{CODE_DEMO}</code>
              </pre>
            </div>
            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/20 bg-white/10">
              <div className="flex gap-1.5">
                {['utility', 'js', 'performance'].map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-violet-100/80 text-violet-700 border border-violet-300/60 font-medium">#{t}</span>
                ))}
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition-colors">
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
          </GlassCard>
          {/* Decorative glow */}
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary-400/20 blur-2xl" />
        </div>

      </div>
    </HeroSection>
  )
}
