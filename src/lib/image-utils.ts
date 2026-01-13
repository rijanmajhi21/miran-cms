import type { PayloadMedia } from '@/types/board'

// Supabase storage base URL - set in environment
const SUPABASE_PROJECT_REF =
  process.env.SUPABASE_PROJECT_REF || process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF || ''
const S3_BUCKET = process.env.S3_BUCKET || process.env.NEXT_PUBLIC_S3_BUCKET || 'media'
const SUPABASE_STORAGE_URL = SUPABASE_PROJECT_REF
  ? `https://${SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/${S3_BUCKET}`
  : ''

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

// Helper to get full image URL - converts old API URLs to Supabase URLs
export function getFullImageUrl(url: string): string {
  if (!url) return ''

  // Already a full URL (http/https)
  if (url.startsWith('http')) return url

  // Old Payload API URL format - extract filename and use Supabase URL
  if (url.startsWith('/api/media/file/')) {
    const filename = url.replace('/api/media/file/', '')
    if (SUPABASE_STORAGE_URL) {
      return `${SUPABASE_STORAGE_URL}/${filename}`
    }
  }

  // Generic relative URL - try to use Supabase storage
  if (SUPABASE_STORAGE_URL && !url.startsWith('http')) {
    // Extract just the filename from the path
    const filename = url.split('/').pop() || url
    return `${SUPABASE_STORAGE_URL}/${filename}`
  }

  return url
}
