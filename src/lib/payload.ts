// Re-export board types and actions for backward compatibility
// New code should import directly from:
// - Types: @/types/board
// - Actions: @/app/(frontend)/(backend)/actions/board
// - Image utils: @/lib/image-utils

export type { PayloadMedia, PayloadBoard, PayloadBoardImage } from '@/types/board'

export {
  getBoards,
  getFeaturedBoards,
  getBoardBySlug,
  getBoardImages,
  getBoardImagesBySlug,
} from '@/app/(frontend)/(backend)/actions/board'

export { getImageUrl, getFullImageUrl } from '@/lib/image-utils'
