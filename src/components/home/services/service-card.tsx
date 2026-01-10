import { FunctionComponent } from "react";
import { Service } from "./constant";

type ServiceCardProps = Service;

const ServiceCard: FunctionComponent<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <article className="group flex flex-col p-6 md:p-8 bg-pure-white border border-neutral-light rounded-2xl hover:border-neutral-disabled hover:shadow-light transition-all duration-300">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-lightest group-hover:bg-neutral-light transition-colors duration-300 mb-5">
        <Icon className="w-6 h-6 text-neutral-base" />
      </div>
      <h3 className="text-body-big-bold text-neutral-black mb-2">{title}</h3>
      <p className="text-body-base text-neutral-sub-text">{description}</p>
    </article>
  );
};

export default ServiceCard;
