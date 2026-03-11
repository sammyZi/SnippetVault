import { LoginForm } from '@/components/auth/LoginForm'
import { HeroSection } from '@/components/ui/hero-section-with-smooth-bg-shader'

export default function LoginPage() {
  return (
    <HeroSection className="text-neutral-900">
      <div className="max-w-md w-full mx-auto px-4">
        <LoginForm />
      </div>
    </HeroSection>
  )
}
