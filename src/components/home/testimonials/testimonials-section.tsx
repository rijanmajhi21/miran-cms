import { FunctionComponent } from "react";
import { TESTIMONIALS } from "./constant";
import TestimonialCard from "./testimonial-card";

const TestimonialsSection: FunctionComponent = () => {
  return (
    <section id="testimonials" className="container">
      <div className="flex flex-col gap-8 md:gap-12">
        {/* Header */}
        <div className="text-center flex flex-col gap-1">
          <h2 className="font-heading text-title-4 md:text-title-3 ">
            What Clients Say
          </h2>
          <p className="text-body-base text-neutral-sub-text">
            Hear from the wonderful people I&apos;ve had the pleasure of working
            with
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
