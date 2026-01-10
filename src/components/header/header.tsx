"use client";

import Image from "@/components/commons/image";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useState } from "react";
import DesktopNav from "./desktop-nav";
import MobileMenu from "./mobile-menu";

const Header: FunctionComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="container">
        <div className="flex items-center justify-between py-4 md:py-6">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo/miran-bg.png"
              alt="Miran Photography"
              width={160}
              height={26}
              className="w-32 md:w-40 lg:w-[200px] h-auto"
              priority
            />
          </Link>

          <DesktopNav />

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-pure-white hover:opacity-80 transition-opacity"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};

export default Header;
