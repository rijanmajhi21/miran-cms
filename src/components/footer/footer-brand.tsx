import { FunctionComponent } from "react";

const FooterBrand: FunctionComponent = () => {
  return (
    <div className="lg:col-span-4">
      <h3 className="font-heading text-title-4 md:text-title-3 text-pure-white mb-4">
        Miran Photography
      </h3>
      <p className="text-body-base text-neutral-disabled max-w-md">
        Capturing moments, telling stories through the lens. Every frame is a
        new adventure.
      </p>
    </div>
  );
};

export default FooterBrand;

