import AboutSection from '@/components/home/about/about-section'
import CTASection from '@/components/home/cta/cta-section'
import Footer from '@/components/footer/footer'
import FeaturedProjectsSection from '@/components/home/featured-projects/featured-projects-section'
import FeaturedImagesSection from '@/components/home/featured-images/featured-images'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import ServicesSection from '@/components/home/services/services-section'
import TestimonialsSection from '@/components/home/testimonials'
import { getSession } from '@/app/(frontend)/(backend)/actions/auth'

export const metadata = {
  title: 'Miran | Photography',
  description:
    "Discover the art of photography through Miran's lens. A curated collection of captivating portraits, breathtaking landscapes, and emotive photography that tells stories and captures timeless moments.",
  icons: {
    icon: '/favicon.png',
  },
}

export default async function HomePage() {
  const user = await getSession()

  return (
    <>
      <Header user={user} />
      <main className="flex flex-col gap-20 md:gap-24">
        <HeroSection />
        <AboutSection />
        <FeaturedImagesSection />
        <FeaturedProjectsSection />
        <ServicesSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
