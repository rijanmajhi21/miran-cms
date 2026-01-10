export interface FeaturedImage {
  src: string;
  alt: string;
  title: string;
  href: string;
}

export const FEATURED_IMAGES: FeaturedImage[] = [
  {
    src: "/featured-images/concert.jpg",
    alt: "Concert photography showcasing live music atmosphere",
    title: "Concert",
    href: "#",
  },
  {
    src: "/featured-images/on-the-way.jpg",
    alt: "Journey photography capturing moments on the road",
    title: "On the Way",
    href: "#",
  },
  {
    src: "/featured-images/landscape.jpg",
    alt: "Landscape photography with breathtaking natural scenery",
    title: "Landscape",
    href: "#",
  },
  {
    src: "/featured-images/gallery.jpg",
    alt: "Gallery collection of diverse photography styles",
    title: "Gallery",
    href: "#",
  },
];
