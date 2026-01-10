import Image from "@/components/commons/image";
import Link from "next/link";
import { FunctionComponent } from "react";

export interface FeaturedPhotoProps {
  src: string;
  alt: string;
  title: string;
  href: string;
}

const FeaturedPhotoCard: FunctionComponent<FeaturedPhotoProps> = ({
  src,
  alt,
  title,
  href,
}) => {
  return (
    <Link className="group block h-full w-full" href={href}>
      <article className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-xl">
        <Image
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          alt={alt}
          src={src}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 z-10">
          <h3 className="font-heading text-pure-white text-body-big-bold md:text-title-5 drop-shadow-lg transition-transform duration-300 group-hover:translate-y-[-2px]">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  );
};

export default FeaturedPhotoCard;
