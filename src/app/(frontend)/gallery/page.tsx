import CategoriesSection from '@/components/gallery/categories-section'
import GalleryHero from '@/components/gallery/gallery-hero'
import { getBoards, getFullImageUrl, getImageUrl } from '@/lib/payload'
import { FunctionComponent } from 'react'

export const revalidate = 60

const GalleryPage: FunctionComponent = async () => {
  const boards = await getBoards()

  const categories = boards.map((board) => ({
    slug: board.slug,
    title: board.title,
    description: board.description || '',
    href: `/gallery/${board.slug}`,
    heroImage:
      typeof board.heroImage === 'string'
        ? board.heroImage
        : getFullImageUrl(getImageUrl(board.heroImage, 'card')),
    images: [],
  }))

  return (
    <main>
      <GalleryHero />
      <CategoriesSection categories={categories} />
    </main>
  )
}

export default GalleryPage
