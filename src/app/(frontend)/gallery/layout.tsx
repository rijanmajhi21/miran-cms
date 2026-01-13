import Footer from '@/components/footer/footer'
import GalleryHeader from '@/components/gallery/gallery-header'
import { getSession } from '@/app/(frontend)/(backend)/actions/auth'
import { ReactNode } from 'react'

export const dynamic = 'force-dynamic'

export default async function GalleryLayout({ children }: { children: ReactNode }) {
  const user = await getSession()

  return (
    <>
      <GalleryHeader user={user} />
      <main className="flex flex-col gap-8 md:gap-12">{children}</main>
      <Footer />
    </>
  )
}
