import {
  HeartIcon,
  UserIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { ComponentType, SVGProps } from "react";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Wedding Photography",
    description:
      "Capturing your special day with timeless elegance. From ceremonies to receptions, every moment preserved.",
    icon: HeartIcon,
  },
  {
    id: 2,
    title: "Portrait Sessions",
    description:
      "Professional portraits that reveal your authentic self. Perfect for individuals, couples, and families.",
    icon: UserIcon,
  },
  {
    id: 3,
    title: "Event Coverage",
    description:
      "From corporate events to private celebrations, documenting every highlight and candid moment.",
    icon: SparklesIcon,
  },
  {
    id: 4,
    title: "Commercial Photography",
    description:
      "High-quality imagery for brands, products, and marketing campaigns that make an impact.",
    icon: BuildingOfficeIcon,
  },
  {
    id: 5,
    title: "Travel & Landscape",
    description:
      "Breathtaking landscapes and travel stories captured from destinations around the world.",
    icon: GlobeAltIcon,
  },
  {
    id: 6,
    title: "Photo Editing",
    description:
      "Professional retouching and color grading to bring your vision to life with stunning results.",
    icon: CameraIcon,
  },
];
