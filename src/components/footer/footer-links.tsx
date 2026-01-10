import Link from "next/link";
import { FunctionComponent } from "react";
import { QUICK_LINKS } from "./constant";

const FooterLinks: FunctionComponent = () => {
  return (
    <div>
      <h4 className="text-body-small-bold uppercase tracking-wider text-neutral-disabled mb-5">
        Quick Links
      </h4>
      <ul className="space-y-3">
        {QUICK_LINKS.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-body-base text-pure-white/80 hover:text-pure-white transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
