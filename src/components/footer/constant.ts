import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import {
  EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LOCATION,
  PHONE,
  TWITTER_URL,
} from "@/data/seo";
import { InstagramIcon, FacebookIcon, XIcon } from "./social-icons";
import { ROUTE_CONTACT, ROUTE_GALLERY } from "@/data/routes";
import { ROUTE_ABOUT } from "@/data/routes";

export const CONTACT_INFO = [
  {
    icon: EnvelopeIcon,
    label: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  { icon: PhoneIcon, label: PHONE, href: `tel:${PHONE}` },
  {
    icon: MapPinIcon,
    label: LOCATION,
    href: `https://maps.app.goo.gl/1234567890`,
  },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: INSTAGRAM_URL, icon: InstagramIcon },
  { label: "Facebook", href: FACEBOOK_URL, icon: FacebookIcon },
  { label: "Twitter", href: TWITTER_URL, icon: XIcon },
];

export const QUICK_LINKS = [
  { label: "About", href: ROUTE_ABOUT },
  { label: "Gallery", href: ROUTE_GALLERY },
  { label: "Contact", href: ROUTE_CONTACT },
];
