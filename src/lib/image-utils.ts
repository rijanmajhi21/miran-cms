import type { PayloadMedia } from '@/types/board'

// Image base URL - hardcoded fallback for reliability
const IMAGE_BASE_URL =
  process.env.IMAGE_BASE_URL ||
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
  'https://fwcsnhkbxinhqwcgotvo.supabase.co/storage/v1/object/public/media'

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

// Helper to get full image URL
// Converts any relative/old URL to the correct Supabase URL
export function getFullImageUrl(url: string): string {
  if (!url) return ''

  // Already a full Supabase URL - return as-is
  if (url.includes('supabase.co')) return url

  // Already a full URL (other domains) - return as-is
  if (url.startsWith('http')) return url

  // Extract filename from various URL formats
  let filename = url

  // Old Payload API URL: /api/media/file/image.jpg
  if (url.includes('/api/media/file/')) {
    filename = url.split('/api/media/file/').pop() || url
  }
  // Just a path: /media/image.jpg or media/image.jpg
  else if (url.includes('/')) {
    filename = url.split('/').pop() || url
  }

  // Return full Supabase URL
  return `${IMAGE_BASE_URL}/${filename}`
}
