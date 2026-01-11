export interface PayloadMedia {
  id: string
  alt: string
  caption?: string
  url: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  sizes?: {
    thumbnail?: { url: string; width: number; height: number }
    card?: { url: string; width: number; height: number }
    large?: { url: string; width: number; height: number }
  }
}

export interface PayloadBoard {
  id: string
  title: string
  slug: string
  description?: string
  heroImage: PayloadMedia | string
  featured: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface PayloadBoardImage {
  id: string
  title?: string
  image: PayloadMedia | string
  board: PayloadBoard | string
  description?: string
  location?: string
  dateTaken?: string
  camera?: string
  order: number
  featured: boolean
  createdAt: string
  updatedAt: string
}
