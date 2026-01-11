// Re-export board types and actions for backward compatibility
// New code should import directly from:
// - Types: @/types/board
// - Actions: @/app/(frontend)/(backend)/actions/board

export type { PayloadMedia, PayloadBoard, PayloadBoardImage } from '@/types/board'

export {
  getBoards,
  getFeaturedBoards,
  getBoardBySlug,
  getBoardImages,
  getBoardImagesBySlug,
  getImageUrl,
  getFullImageUrl,
} from '@/app/(frontend)/(backend)/actions/board'
