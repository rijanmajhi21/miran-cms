import Link from "next/link";
import { navLinks } from "./nav-links";
import { FunctionComponent } from "react";

const DesktopNav: FunctionComponent = () => {
  return (
    <nav className="hidden md:flex gap-10 lg:gap-14">
      {navLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className="flex items-center gap-2 text-body-base-medium text-pure-white hover:opacity-80 transition-opacity"
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNav;
