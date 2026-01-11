'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import type { PayloadBoard, PayloadBoardImage, PayloadMedia } from '@/types/board'

// Fetch all boards
export async function getBoards(): Promise<PayloadBoard[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'boards',
      sort: 'order',
      depth: 1,
    })
    return result.docs as unknown as PayloadBoard[]
  } catch (error) {
    console.error('Error fetching boards:', error)
    return []
  }
}

// Fetch featured boards for homepage
export async function getFeaturedBoards(): Promise<PayloadBoard[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'boards',
      where: { featured: { equals: true } },
      sort: 'order',
      depth: 1,
    })
    return result.docs as unknown as PayloadBoard[]
  } catch (error) {
    console.error('Error fetching featured boards:', error)
    return []
  }
}

// Fetch a single board by slug
export async function getBoardBySlug(slug: string): Promise<PayloadBoard | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'boards',
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    })
    return (result.docs[0] as unknown as PayloadBoard) || null
  } catch (error) {
    console.error('Error fetching board:', error)
    return null
  }
}

// Fetch images for a specific board
export async function getBoardImages(boardId: string): Promise<PayloadBoardImage[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'board-images',
      where: { board: { equals: boardId } },
      sort: 'order',
      depth: 1,
      limit: 100,
    })
    return result.docs as unknown as PayloadBoardImage[]
  } catch (error) {
    console.error('Error fetching board images:', error)
    return []
  }
}

// Fetch images for a board by slug
export async function getBoardImagesBySlug(slug: string): Promise<PayloadBoardImage[]> {
  const board = await getBoardBySlug(slug)
  if (!board) return []
  return getBoardImages(board.id)
}

// Helper to get image URL from media object (sync - not a server action)
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

// Helper to get full image URL (sync - not a server action)
export function getFullImageUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return url // Already relative, will work in same app
}
