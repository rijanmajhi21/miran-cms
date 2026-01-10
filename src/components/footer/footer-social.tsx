import { FunctionComponent } from "react";
import { SOCIAL_LINKS } from "./constant";

const FooterSocial: FunctionComponent = () => {
  return (
    <div>
      <h4 className="text-body-small-bold uppercase tracking-wider text-neutral-disabled mb-5">
        Follow Me
      </h4>
      <div className="flex items-center gap-4">
        {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-pure-white/10 text-pure-white/80 hover:bg-primary hover:text-pure-white transition-all duration-300"
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterSocial;
