import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import CategoryHero from '@/components/gallery/category-hero'
import MasonryGrid from '@/components/gallery/masonry-grid'
import {
  getBoardBySlug,
  getBoardImagesBySlug,
  getFullImageUrl,
  getImageUrl,
} from '@/lib/payload'

// Dynamic rendering - layout uses session headers
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const board = await getBoardBySlug(slug)

  if (!board) {
    return {
      title: 'Not Found',
      description: 'The requested gallery could not be found.',
    }
  }

  const heroImageUrl =
    typeof board.heroImage === 'string'
      ? board.heroImage
      : getFullImageUrl(getImageUrl(board.heroImage, 'large'))

  const description =
    board.description || `Explore the ${board.title} photo gallery by Miran Photography.`

  return {
    title: board.title,
    description,
    openGraph: {
      title: `${board.title} | Miran Photography`,
      description,
      images: [heroImageUrl],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${board.title} | Miran Photography`,
      description,
      images: [heroImageUrl],
    },
  }
}

export default async function GalleryCategoryPage({ params }: PageProps) {
  const { slug } = await params

  const board = await getBoardBySlug(slug)

  if (!board) {
    notFound()
  }

  const boardImages = await getBoardImagesBySlug(slug)

  const heroImageUrl =
    typeof board.heroImage === 'string'
      ? board.heroImage
      : getFullImageUrl(getImageUrl(board.heroImage, 'large'))

  const images = boardImages.map((img) => {
    if (typeof img.image === 'string') return img.image
    return getFullImageUrl(getImageUrl(img.image, 'large'))
  })

  return (
    <main className="flex flex-col">
      <CategoryHero
        title={board.title}
        description={board.description || ''}
        heroImage={heroImageUrl}
        photoCount={images.length}
      />
      <MasonryGrid images={images} title={board.title} />
    </main>
  )
}
