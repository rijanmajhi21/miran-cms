import Image from "@/components/commons/image";
import Breadcrumb from "@/components/commons/breadcrumb";
import { FunctionComponent } from "react";

const GalleryHero: FunctionComponent = () => {
  return (
    <section className="flex flex-col">
      <Breadcrumb items={[{ label: "Gallery" }]} />

      <div className="md:px-4">
        <div className="relative w-full h-[35vh] sm:h-[45vh] md:h-[450px] min-h-[250px] md:rounded-2xl overflow-hidden">
          <Image
            src="/gallery/gallery-hero-image.jpg"
            alt="Gallery hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-neutral-black/40" />

          <div className="absolute container inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-heading text-title-4 sm:text-title-3 md:text-title-2 lg:text-title-1 text-pure-white mb-3 md:mb-4">
              My Gallery
            </h1>
            <p className="text-body-base md:text-body-big text-pure-white/80 max-w-lg md:max-w-2xl">
              A curated collection of my finest work across various photography
              genres. Each collection tells a unique story.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryHero;
