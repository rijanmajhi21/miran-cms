import { FunctionComponent } from "react";
import { SERVICES } from "./constant";
import ServiceCard from "./service-card";

const ServicesSection: FunctionComponent = () => {
  return (
    <section id="services" className="container">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="text-center flex flex-col gap-1">
          <h2 className="font-heading text-title-4 md:text-title-3">
            Services
          </h2>
          <p className="text-body-base text-neutral-sub-text">
            Professional photography services tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
