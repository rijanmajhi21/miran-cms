import Image from "@/components/commons/image";
import Breadcrumb from "@/components/commons/breadcrumb";
import { ROUTE_GALLERY } from "@/data/routes";
import { FunctionComponent } from "react";

interface CategoryHeroProps {
  title: string;
  description: string;
  heroImage: string;
  photoCount: number;
}

const CategoryHero: FunctionComponent<CategoryHeroProps> = ({
  title,
  description,
  heroImage,
  photoCount,
}) => {
  return (
    <section className="flex flex-col">
      <Breadcrumb
        items={[{ label: "Gallery", href: ROUTE_GALLERY }, { label: title }]}
      />

      <div className="md:px-4">
        <div className="relative w-full h-[35vh] sm:h-[45vh] md:h-[400px] min-h-[250px] md:rounded-2xl overflow-hidden">
          <Image
            src={heroImage}
            alt={`${title} hero`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-neutral-black/70 via-neutral-black/30 to-transparent" />

          <div className="absolute container inset-0 flex flex-col justify-end p-6 md:p-8">
            <h1 className="font-heading text-title-4 sm:text-title-3 md:text-title-2 text-pure-white mb-2">
              {title}
            </h1>

            <p className="text-body-base text-pure-white/80 md:w-1/2 mb-2 max-md:line-clamp-3">
              {description}
            </p>

            <p className="text-body-small text-pure-white/60">
              {photoCount} {photoCount === 1 ? "Photo" : "Photos"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
