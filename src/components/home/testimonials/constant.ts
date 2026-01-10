export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Wedding Client",
    image: "/featured-images/concert.jpg",
    quote:
      "Miran captured our wedding day perfectly. Every photo tells a story and brings back beautiful memories. Absolutely recommend!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Corporate Client",
    image: "/featured-images/landscape.jpg",
    quote:
      "Professional, creative, and easy to work with. The photos exceeded our expectations for our company's branding.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Portrait Session",
    image: "/featured-images/gallery.jpg",
    quote:
      "I've never felt so comfortable during a photoshoot. Miran has an incredible eye for capturing genuine emotions.",
    rating: 5,
  },
];
