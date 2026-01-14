export interface FeaturedImage {
  src: string;
  alt: string;
  title: string;
  href: string;
  description: string;
  photoCount?: number;
}

export const FEATURED_IMAGES: FeaturedImage[] = [
  {
    src: "/featured-images/concert.jpg",
    alt: "Concert photography showcasing live music atmosphere",
    title: "Concert",
    href: "/gallery",
    description: "Raw energy captured in low light. Live music moments frozen in time — the sweat, the passion, the crowd.",
    photoCount: 24,
  },
  {
    src: "/featured-images/on-the-way.jpg",
    alt: "Journey photography capturing moments on the road",
    title: "On the Way",
    href: "/gallery",
    description: "Stories from the road. Fleeting moments between destinations — the journey is the destination.",
    photoCount: 18,
  },
  {
    src: "/featured-images/landscape.jpg",
    alt: "Landscape photography with breathtaking natural scenery",
    title: "Landscape",
    href: "/gallery",
    description: "Mountains, valleys, and endless horizons. Nepal's dramatic landscapes through a cinematic lens.",
    photoCount: 32,
  },
  {
    src: "/featured-images/gallery.jpg",
    alt: "Gallery collection of diverse photography styles",
    title: "Gallery",
    href: "/gallery",
    description: "A curated collection of my finest work. Portraits, abstracts, and visual experiments.",
    photoCount: 45,
  },
];
