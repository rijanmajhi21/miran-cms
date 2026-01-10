// Payload CMS API utilities - Direct access since we're in the same app
import { getPayload } from "payload";
import config from "@payload-config";

export interface PayloadMedia {
  id: string;
  alt: string;
  caption?: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes?: {
    thumbnail?: { url: string; width: number; height: number };
    card?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

export interface PayloadBoard {
  id: string;
  title: string;
  slug: string;
  description?: string;
  heroImage: PayloadMedia | string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PayloadBoardImage {
  id: string;
  title?: string;
  image: PayloadMedia | string;
  board: PayloadBoard | string;
  description?: string;
  location?: string;
  dateTaken?: string;
  camera?: string;
  order: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Fetch all boards
export async function getBoards(): Promise<PayloadBoard[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "boards",
      sort: "order",
      depth: 1,
    });
    return result.docs as unknown as PayloadBoard[];
  } catch (error) {
    console.error("Error fetching boards:", error);
    return [];
  }
}

// Fetch featured boards for homepage
export async function getFeaturedBoards(): Promise<PayloadBoard[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "boards",
      where: { featured: { equals: true } },
      sort: "order",
      depth: 1,
    });
    return result.docs as unknown as PayloadBoard[];
  } catch (error) {
    console.error("Error fetching featured boards:", error);
    return [];
  }
}

// Fetch a single board by slug
export async function getBoardBySlug(slug: string): Promise<PayloadBoard | null> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "boards",
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    });
    return (result.docs[0] as unknown as PayloadBoard) || null;
  } catch (error) {
    console.error("Error fetching board:", error);
    return null;
  }
}

// Fetch images for a specific board
export async function getBoardImages(boardId: string): Promise<PayloadBoardImage[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "board-images",
      where: { board: { equals: boardId } },
      sort: "order",
      depth: 1,
      limit: 100,
    });
    return result.docs as unknown as PayloadBoardImage[];
  } catch (error) {
    console.error("Error fetching board images:", error);
    return [];
  }
}

// Fetch images for a board by slug
export async function getBoardImagesBySlug(slug: string): Promise<PayloadBoardImage[]> {
  const board = await getBoardBySlug(slug);
  if (!board) return [];
  return getBoardImages(board.id);
}

// Helper to get image URL from media object
export function getImageUrl(
  media: PayloadMedia | string,
  size?: "thumbnail" | "card" | "large"
): string {
  if (typeof media === "string") return media;

  if (size && media.sizes?.[size]?.url) {
    return media.sizes[size].url;
  }

  return media.url;
}

// Helper to get full image URL
export function getFullImageUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return url; // Already relative, will work in same app
}
