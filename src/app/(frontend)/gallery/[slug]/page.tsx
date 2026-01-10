import { notFound } from "next/navigation";
import { Metadata } from "next";
import CategoryHero from "@/components/gallery/category-hero";
import MasonryGrid from "@/components/gallery/masonry-grid";
import {
  getBoardBySlug,
  getBoardImagesBySlug,
  getBoards,
  getFullImageUrl,
  getImageUrl,
} from "@/lib/payload";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const boards = await getBoards();

  return boards.map((board) => ({
    slug: board.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const board = await getBoardBySlug(slug);

  if (!board) {
    return {
      title: "Not Found | Miran Photography",
    };
  }

  return {
    title: `${board.title} | Miran Photography`,
    description: board.description || `${board.title} photo gallery`,
  };
}

export default async function GalleryCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const board = await getBoardBySlug(slug);

  if (!board) {
    notFound();
  }

  const boardImages = await getBoardImagesBySlug(slug);

  const heroImageUrl =
    typeof board.heroImage === "string"
      ? board.heroImage
      : getFullImageUrl(getImageUrl(board.heroImage, "large"));

  const images = boardImages.map((img) => {
    if (typeof img.image === "string") return img.image;
    return getFullImageUrl(getImageUrl(img.image, "large"));
  });

  return (
    <main className="flex flex-col">
      <CategoryHero
        title={board.title}
        description={board.description || ""}
        heroImage={heroImageUrl}
        photoCount={images.length}
      />
      <MasonryGrid images={images} title={board.title} />
    </main>
  );
}
