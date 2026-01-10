import { CategoryCardProps } from "./category-card";

export interface GalleryCategory extends Omit<CategoryCardProps, "images"> {
  slug: string;
  description: string;
  heroImage: string;
  images: string[];
}
