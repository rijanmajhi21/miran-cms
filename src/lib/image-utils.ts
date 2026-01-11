import type { PayloadMedia } from '@/types/board'

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
export function getFullImageUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return url // Already relative, will work in same app
}
