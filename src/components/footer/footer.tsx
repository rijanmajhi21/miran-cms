import { FunctionComponent } from "react";
import FooterBrand from "./footer-brand";
import FooterLinks from "./footer-links";
import FooterContact from "./footer-contact";
import FooterSocial from "./footer-social";
import FooterBottom from "./footer-bottom";

const Footer: FunctionComponent = () => {
  return (
    <footer id="contact" className="bg-neutral-black">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <FooterBrand />

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-8">
              <FooterLinks />
              <FooterContact />
              <FooterSocial />
            </div>
          </div>
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
