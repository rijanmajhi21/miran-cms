import { UserIcon, PhotoIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { ComponentType, SVGProps } from "react";

export type NavLinkType = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const navLinks: NavLinkType[] = [
  { href: "#about", label: "About", icon: UserIcon },
  { href: "/gallery", label: "Gallery", icon: PhotoIcon },
  { href: "#contact", label: "Contact", icon: EnvelopeIcon },
];
