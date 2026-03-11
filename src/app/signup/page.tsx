import { SignupForm } from '@/components/auth/SignupForm'
import { HeroSection } from '@/components/ui/hero-section-with-smooth-bg-shader'

export default function SignupPage() {
  return (
    <HeroSection className="text-neutral-900">
      <div className="max-w-md w-full mx-auto px-4">
        <SignupForm />
      </div>
    </HeroSection>
  )
}
