import type { PayloadMedia } from '@/types/board'

// Image base URL - can be set directly or constructed from parts
// Priority: IMAGE_BASE_URL > constructed from SUPABASE_PROJECT_REF
const IMAGE_BASE_URL =
  process.env.IMAGE_BASE_URL ||
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
  (() => {
    const projectRef =
      process.env.SUPABASE_PROJECT_REF || process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF || ''
    const bucket = process.env.S3_BUCKET || process.env.NEXT_PUBLIC_S3_BUCKET || 'media'
    return projectRef ? `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}` : ''
  })()

// Helper to get image URL from media object
export function getImageUrl(
  media: PayloadMedia | string,
  size?: 'thumbnail' | 'card' | 'large',
): string {
  if (typeof media === 'string') return media

  if (size && media.sizes?.[size]?.url) {
    return media.sizes[size].url
  }

  return media.url
}

// Helper to get full image URL - converts old API URLs to storage URLs
export function getFullImageUrl(url: string): string {
  if (!url) return ''

  // Already a full URL (http/https)
  if (url.startsWith('http')) return url

  // Old Payload API URL format - extract filename and use storage URL
  if (url.startsWith('/api/media/file/')) {
    const filename = url.replace('/api/media/file/', '')
    if (IMAGE_BASE_URL) {
      return `${IMAGE_BASE_URL}/${filename}`
    }
  }

  // Generic relative URL - try to use storage base URL
  if (IMAGE_BASE_URL && !url.startsWith('http')) {
    // Extract just the filename from the path
    const filename = url.split('/').pop() || url
    return `${IMAGE_BASE_URL}/${filename}`
  }

  return url
}
