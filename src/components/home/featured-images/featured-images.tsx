import FeaturedPhotoCard from "@/components/commons/featured-photo-card";
import { FunctionComponent } from "react";
import { FEATURED_IMAGES } from "./constant";
import ButtonLink from "@/components/commons/button-link";
import { ROUTE_GALLERY } from "@/data/routes";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const FeaturedImagesSection: FunctionComponent = () => {
  return (
    <section id="gallery" className="container">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-title-4 md:text-title-3 font-heading">
              Featured Photos
            </h2>
            <p className="text-body-base text-neutral-sub-text-alt">
              Discover my latest photography projects.
            </p>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {FEATURED_IMAGES.map((photo, index: number) => (
            <FeaturedPhotoCard
              key={index}
              src={photo?.src}
              alt={photo?.alt}
              title={photo?.title}
              href={photo?.href}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <ButtonLink href={ROUTE_GALLERY}>
            View All Photos
            <ArrowRightIcon className="w-4 h-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};

export default FeaturedImagesSection;
