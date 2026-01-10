import Image from "@/components/commons/image";
import { PhotoIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { FunctionComponent } from "react";
import { FeaturedProject } from "./constant";

type ProjectCardProps = FeaturedProject;

const ProjectCard: FunctionComponent<ProjectCardProps> = ({
  title,
  category,
  description,
  image,
  stats,
}) => {
  return (
    <article className="group flex flex-col bg-pure-white border border-neutral-light rounded-2xl overflow-hidden hover:shadow-light transition-shadow duration-300">
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-pure-white/90 backdrop-blur-sm rounded-full text-body-small-bold text-neutral-black">
            {category}
          </span>
        </div>
      </div>

      <div className="flex flex-col p-5 md:p-6">
        <h3 className="text-body-big-bold text-neutral-black mb-2">{title}</h3>
        <p className="text-body-small text-neutral-sub-text mb-4 line-clamp-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-4 mt-auto">
          <div className="flex items-center gap-1.5">
            <PhotoIcon className="w-4 h-4 text-neutral-sub-text" />
            <span className="text-body-small text-neutral-sub-text">
              {stats.photos} Photos
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPinIcon className="w-4 h-4 text-neutral-sub-text" />
            <span className="text-body-small text-neutral-sub-text">
              {stats.location}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
