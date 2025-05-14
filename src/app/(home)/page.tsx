import { CtaSection } from '@/app/(home)/components/cta-section'
import { FaqSection } from '@/app/(home)/components/faq-section'
import { FeaturesSection } from '@/app/(home)/components/features-section'
import { Footer } from '@/app/(home)/components/footer'
import { HeroSection } from '@/app/(home)/components/hero-section'
import { TestimonialsSection } from '@/app/(home)/components/testimonials-section'
import { Container } from '@/components/interface/container'

export default function HomePage() {
  return (
    <Container.Root className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturesSection />
      {/* <DemoSection /> */}
      {/* <PricingSection /> */}
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </Container.Root>
  )
}
