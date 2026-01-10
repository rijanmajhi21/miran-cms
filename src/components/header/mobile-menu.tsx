import Image from "@/components/commons/image";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunctionComponent } from "react";
import { navLinks } from "./nav-links";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu: FunctionComponent<MobileMenuProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 w-full h-screen bg-pure-white z-50">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="shrink-0" onClick={onClose}>
            <Image
              src="/logo/MIRAN.png"
              alt="Miran Photography"
              width={160}
              height={26}
              className="w-32 h-auto"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-neutral-black hover:opacity-80 transition-opacity"
            aria-label="Close menu"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <nav className="container py-8">
        <ul className="flex flex-col gap-6">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                onClick={onClose}
                className="flex items-center gap-3 text-body-base text-neutral-black hover:opacity-80 transition-opacity py-2"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
