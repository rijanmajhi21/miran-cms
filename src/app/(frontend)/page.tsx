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
import { PhotographerSchema, WebsiteSchema } from '@/components/seo/structured-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Miran Photography | Professional Photographer in Nepal',
  description:
    "Discover the art of photography through Miran's lens. Professional photography services in Nepal - landscapes, portraits, concerts, and travel photography that tells stories and captures timeless moments.",
  openGraph: {
    title: 'Miran Photography | Capturing Moments, Creating Art',
    description:
      'Professional photography services in Nepal. Explore stunning landscapes, portraits, and travel photography.',
    images: ['/featured-images/landscape.jpg'],
  },
}

export default async function HomePage() {
  const user = await getSession()

  return (
    <>
      <PhotographerSchema />
      <WebsiteSchema />
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
