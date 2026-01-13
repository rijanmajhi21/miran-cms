import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miran.com.np'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Dynamic gallery board pages
  try {
    const payload = await getPayload({ config })
    const boards = await payload.find({
      collection: 'boards',
      limit: 100,
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const boardPages: MetadataRoute.Sitemap = boards.docs.map((board) => ({
      url: `${siteUrl}/gallery/${board.slug}`,
      lastModified: new Date(board.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...staticPages, ...boardPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}

