export interface FeaturedProject {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  stats: {
    photos: number;
    location: string;
  };
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 1,
    title: "Summer Wedding Collection",
    category: "Wedding",
    description:
      "A beautiful outdoor ceremony capturing the magic of love, laughter, and unforgettable moments under the golden sun. The ceremony was held in a beautiful garden with a view of the ocean. The couple was surrounded by their loved ones and the sun was setting in the background. It was a perfect day for a wedding.",
    image: "/featured-images/concert.jpg",
    stats: {
      photos: 250,
      location: "Malibu, CA",
    },
  },
  {
    id: 2,
    title: "Urban Portrait Series",
    category: "Portrait",
    description:
      "Street-style portraits blending personality with the raw energy of city life. Each frame tells a unique story. The portraits were taken in a busy city street with people going about their daily lives. The portraits were taken in a variety of locations and at different times of the day.",
    image: "/featured-images/on-the-way.jpg",
    stats: {
      photos: 85,
      location: "New York, NY",
    },
  },
  {
    id: 3,
    title: "Mountain Expedition",
    category: "Landscape",
    description:
      "A breathtaking journey through rugged peaks and serene valleys, capturing nature's most dramatic moments. The journey was through a variety of landscapes, from mountains to valleys. The journey was through a variety of landscapes, from mountains to valleys. The journey was through a variety of landscapes, from mountains to valleys.",
    image: "/featured-images/landscape.jpg",
    stats: {
      photos: 120,
      location: "Colorado, USA",
    },
  },
];
