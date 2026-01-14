import CategoriesSection from '@/components/gallery/categories-section'
import GalleryHero from '@/components/gallery/gallery-hero'
import { getBoards, getBoardImages, getFullImageUrl, getImageUrl } from '@/lib/payload'
import { FunctionComponent } from 'react'
import type { Metadata } from 'next'

// Dynamic rendering - layout uses session headers
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description:
    'Browse through curated collections of professional photography. Landscapes, portraits, concerts, and travel photography from Nepal and beyond.',
  openGraph: {
    title: 'Photo Gallery | Miran Photography',
    description:
      'Explore stunning photography collections - landscapes, portraits, concerts, and travel photography.',
    images: ['/featured-images/landscape.jpg'],
  },
}

const GalleryPage: FunctionComponent = async () => {
  const boards = await getBoards()

  const categories = await Promise.all(
    boards.map(async (board) => {
      // Fetch board images for this board
      const boardImages = await getBoardImages(board.id)

      // Get image URLs from board images (filter out empty strings)
      const images = boardImages
        .map((img) => {
          if (typeof img.image === 'string') return img.image
          return getFullImageUrl(getImageUrl(img.image, 'card'))
        })
        .filter((url) => url && url.length > 0)

      return {
        slug: board.slug,
        title: board.title,
        description: board.description || '',
        href: `/gallery/${board.slug}`,
        heroImage:
          typeof board.heroImage === 'string'
            ? board.heroImage
            : getFullImageUrl(getImageUrl(board.heroImage, 'card')),
        images,
        updatedAt: board.updatedAt,
      }
    }),
  )

  return (
    <main>
      <GalleryHero />
      <CategoriesSection categories={categories} />
    </main>
  )
}

export default GalleryPage
