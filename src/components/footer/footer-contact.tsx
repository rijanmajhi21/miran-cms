import { FunctionComponent } from "react";
import { CONTACT_INFO } from "./constant";

const FooterContact: FunctionComponent = () => {
  return (
    <div>
      <h4 className="text-body-small-bold uppercase tracking-wider text-neutral-disabled mb-5">
        Get in Touch
      </h4>
      <ul className="space-y-4">
        {CONTACT_INFO.map(({ icon: Icon, label, href }) => (
          <li key={label} className="flex items-start gap-3">
            <div className="w-5 h-5 mt-0.5 flex items-center justify-center">
              <Icon className="w-5 h-5 text-neutral-disabled" />
            </div>
            {href ? (
              <a
                href={href}
                className="text-body-base text-pure-white/80 hover:text-pure-white transition-colors"
              >
                {label}
              </a>
            ) : (
              <span className="text-body-base text-pure-white/80">{label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterContact;
