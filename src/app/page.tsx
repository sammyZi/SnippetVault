import Link from 'next/link'
import { getUser } from './actions/auth'
import { redirect } from 'next/navigation'
import { Code2, Search, Share2, ArrowRight, Tag, Braces, Terminal, Layers, Zap } from 'lucide-react'

const CODE_DEMO = `// Debounce utility
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(
      () => fn(...args), delay
    );
  };
}`

const FEATURES = [
  {
    num: '01',
    title: 'CAPTURE',
    desc: 'Save any snippet with syntax highlighting for 50+ languages.',
    icon: Code2,
  },
  {
    num: '02',
    title: 'ORGANISE',
    desc: 'Tag, search, and filter your collection in milliseconds.',
    icon: Search,
  },
  {
    num: '03',
    title: 'SHARE',
    desc: 'Publish snippets publicly or keep them private — your call.',
    icon: Share2,
  },
  {
    num: '04',
    title: 'DELIVER',
    desc: 'Export, embed, or copy with a single click. Ship faster.',
    icon: Zap,
  },
]

export default async function Home() {
  const user = await getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--editorial-bg)' }}>

      {/* ── Top ticker bar ── */}
      <div className="w-full border-b border-[var(--editorial-rule)] overflow-hidden" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
        <div className="flex items-center h-8 text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--editorial-muted)' }}>
          <div className="flex items-center gap-8 px-6 whitespace-nowrap animate-ticker">
            <span>SV / 2026</span>
            <span className="opacity-40">·</span>
            <span>VOL. 01 / ISSUE Nº 01</span>
            <span className="opacity-40">·</span>
            <span>FILED UNDER: CODE · PRODUCTIVITY</span>
            <span className="opacity-40">·</span>
            <span>BUILT WITH NEXT.JS</span>
            <span className="opacity-40">·</span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              LIVE
            </span>
            <span className="opacity-40">·</span>
            <span>SV / 2026</span>
            <span className="opacity-40">·</span>
            <span>VOL. 01 / ISSUE Nº 01</span>
            <span className="opacity-40">·</span>
            <span>FILED UNDER: CODE · PRODUCTIVITY</span>
            <span className="opacity-40">·</span>
            <span>BUILT WITH NEXT.JS</span>
            <span className="opacity-40">·</span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="w-full border-b border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
              <Braces className="w-4.5 h-4.5" style={{ color: 'var(--editorial-accent)' }} strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-serif font-normal tracking-tight" style={{ color: 'var(--editorial-ink)', fontFamily: 'var(--font-serif)' }}>
                SnippetVault
              </span>
              <span className="hidden sm:inline-block text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border border-[var(--editorial-rule)] rounded" style={{ color: 'var(--editorial-muted)' }}>
                STUDIO Nº 01
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[13px] tracking-wide" style={{ color: 'var(--editorial-muted)' }}>
            <span className="hover:text-[var(--editorial-ink)] transition-colors cursor-default">Features</span>
            <span className="hover:text-[var(--editorial-ink)] transition-colors cursor-default">Snippets</span>
            <span className="hover:text-[var(--editorial-ink)] transition-colors cursor-default">About</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-[13px] font-medium px-4 py-2 transition-colors hover:text-[var(--editorial-ink)]"
              style={{ color: 'var(--editorial-muted)' }}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-[13px] font-semibold px-5 py-2 rounded-full border transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: 'var(--editorial-ink)',
                color: 'var(--editorial-bg)',
                borderColor: 'var(--editorial-ink)',
              }}
            >
              Get started →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero section ── */}
      <section className="relative w-full border-b border-[var(--editorial-rule)] editorial-noise">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-center">

            {/* Left: editorial copy */}
            <div className="py-10 lg:py-14 lg:border-r lg:border-[var(--editorial-rule)] lg:pr-16">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-5 animate-fadeInUp">
                <div className="w-8 h-px" style={{ backgroundColor: 'var(--editorial-accent)' }} />
                <span className="text-[11px] tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--editorial-accent)' }}>
                  Open-source snippet studio
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: 'var(--editorial-muted)' }}>
                  · Nº 01
                </span>
              </div>

              {/* Hero headline */}
              <h1 className="animate-fadeInUp-delay-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--editorial-ink)', lineHeight: 1 }}>
                <span className="block text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
                  Capturing
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight italic" style={{ color: 'var(--editorial-accent)' }}>
                  intelligence
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
                  with code,
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight italic" style={{ color: 'var(--editorial-accent)' }}>
                  taste,
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
                  and craft<span style={{ color: 'var(--editorial-accent)' }}>.</span>
                </span>
              </h1>

              {/* Sub copy */}
              <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-md animate-fadeInUp-delay-2" style={{ color: 'var(--editorial-muted)' }}>
                Your personal vault for every clever snippet.
                Capture it. Find it in seconds. Share it with
                the world — or keep it just for you.
              </p>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-7 animate-fadeInUp-delay-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                  style={{
                    backgroundColor: 'var(--editorial-ink)',
                    color: 'var(--editorial-bg)',
                  }}
                >
                  Start for free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium px-7 py-3.5 rounded-full border transition-all hover:bg-[var(--editorial-bg-alt)]"
                  style={{
                    borderColor: 'var(--editorial-rule)',
                    color: 'var(--editorial-ink)',
                  }}
                >
                  Sign in
                </Link>
              </div>

              {/* Metadata line */}
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-[var(--editorial-rule)]">
                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--editorial-muted)' }}>
                  SHA · a1b2c3d
                </span>
              </div>
            </div>

            {/* Right: code preview */}
            <div className="py-8 lg:py-14 animate-fadeInUp-delay-2">
              {/* File ref label */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono" style={{ color: 'var(--editorial-muted)' }}>
                  FIG. 01 / PREVIEW
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono" style={{ color: 'var(--editorial-muted)' }}>
                  PLATE 01
                </span>
              </div>

              {/* Code card */}
              <div className="relative border border-[var(--editorial-rule)] rounded-sm overflow-hidden" style={{ backgroundColor: 'var(--editorial-bg-alt)' }}>
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--editorial-rule)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c0452a]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="ml-3 text-[11px] font-mono tracking-wide" style={{ color: 'var(--editorial-muted)' }}>debounce.js</span>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 font-mono tracking-wider border border-[var(--editorial-rule)] rounded-sm" style={{ color: 'var(--editorial-muted)' }}>
                      JavaScript
                    </span>
                  </div>
                </div>

                {/* Code block */}
                <div className="px-5 py-5" style={{ backgroundColor: 'var(--editorial-ink)' }}>
                  <pre className="text-[13px] font-mono leading-relaxed whitespace-pre" style={{ color: '#e8e0d4' }}>
                    <code>{CODE_DEMO}</code>
                  </pre>
                </div>

                {/* Tags footer */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--editorial-rule)]">
                  <div className="flex gap-2">
                    {['utility', 'js', 'perf'].map(t => (
                      <span key={t} className="text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 font-mono border border-[var(--editorial-rule)] rounded-sm" style={{ color: 'var(--editorial-muted)' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--editorial-muted)' }}>
                    PUBLIC
                  </span>
                </div>
              </div>

              {/* Caption */}
              <p className="mt-3 text-[11px] tracking-wide italic" style={{ color: 'var(--editorial-muted)' }}>
                Composition: real-time preview of a saved snippet with tags and sharing controls.
              </p>

              {/* Steps column — editorial numbered list */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {FEATURES.map((f) => (
                  <div key={f.num} className="group flex items-start gap-3 py-3">
                    <span className="text-[11px] font-mono font-semibold mt-0.5" style={{ color: 'var(--editorial-accent)' }}>
                      {f.num}
                    </span>
                    <div>
                      <h3 className="text-[12px] tracking-[0.2em] uppercase font-bold" style={{ color: 'var(--editorial-ink)' }}>
                        {f.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features section ── */}
      <section className="w-full border-b border-[var(--editorial-rule)]" style={{ backgroundColor: 'var(--editorial-bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px" style={{ backgroundColor: 'var(--editorial-accent)' }} />
            <span className="text-[11px] tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--editorial-accent)' }}>
              What you get
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {FEATURES.map((f, i) => (
              <div
                key={f.num}
                className={`py-8 lg:py-0 lg:px-8 ${i < FEATURES.length - 1 ? 'border-b lg:border-b-0 lg:border-r' : ''} border-[var(--editorial-rule)]`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-mono font-semibold" style={{ color: 'var(--editorial-accent)' }}>
                    {f.num}
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: 'var(--editorial-rule)' }} />
                </div>
                <f.icon className="w-5 h-5 mb-3" style={{ color: 'var(--editorial-ink)' }} strokeWidth={1.5} />
                <h3 className="text-[13px] tracking-[0.2em] uppercase font-bold mb-2" style={{ color: 'var(--editorial-ink)' }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--editorial-muted)' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="w-full" style={{ backgroundColor: 'var(--editorial-bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Braces className="w-4 h-4" style={{ color: 'var(--editorial-accent)' }} />
              <span className="text-sm font-serif" style={{ color: 'var(--editorial-ink)', fontFamily: 'var(--font-serif)' }}>
                SnippetVault
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--editorial-muted)' }}>
                VOL. 01 · ISSUE Nº 01 · MADE ON EARTH
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 font-sans" style={{ color: 'var(--editorial-ink)', fontFamily: 'var(--font-sans)' }}>Connect</h4>
            <ul className="space-y-3 text-sage-400 text-sm font-sans" style={{ color: 'var(--editorial-muted)', fontFamily: 'var(--font-sans)' }}>
              <li><a href="https://github.com/sammyZi" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" style={{ color: 'inherit' }}>GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/samarth-bhinge/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" style={{ color: 'inherit' }}>LinkedIn</a></li>
              <li><a href="https://www.instagram.com/sammyi_57/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" style={{ color: 'inherit' }}>Instagram</a></li>
              <li><a href="mailto:bhingesmaerth@gmail.com" className="hover:text-black transition-colors" style={{ color: 'inherit' }}>Email Me</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
