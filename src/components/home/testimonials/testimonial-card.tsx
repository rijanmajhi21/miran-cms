import Image from "@/components/commons/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { FunctionComponent } from "react";
import { Testimonial } from "./constant";

type TestimonialCardProps = Testimonial;

const TestimonialCard: FunctionComponent<TestimonialCardProps> = ({
  name,
  role,
  image,
  quote,
  rating,
}) => {
  return (
    <article className="flex flex-col bg-neutral-lightest rounded-2xl p-6 md:p-8 shadow-lighter hover:shadow-light transition-shadow duration-300">
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <StarIcon key={i} className="w-5 h-5 text-yellow-base" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-body-base text-neutral-sub-text flex-1 mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-body-base-bold text-neutral-black">{name}</p>
          <p className="text-body-small text-neutral-sub-text">{role}</p>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;
