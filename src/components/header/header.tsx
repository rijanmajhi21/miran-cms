'use client'

import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { FunctionComponent, useState } from 'react'
import DesktopNav from './desktop-nav'
import MobileMenu from './mobile-menu'
import UserMenu from './user-menu'
import type { AuthUser } from '@/app/(frontend)/(backend)/actions/auth'

interface HeaderProps {
  user?: AuthUser | null
}

const Header: FunctionComponent<HeaderProps> = ({ user = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="container">
        <div className="flex items-center justify-between py-4 md:py-6">
          <Link href="/" className="shrink-0">
            <span className="text-body-big-bold md:text-title-4 text-pure-white font-bold">
              miran
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <DesktopNav />
            <UserMenu user={user} />
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-pure-white hover:opacity-80 transition-opacity"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} user={user} />
    </header>
  )
}

export default Header
