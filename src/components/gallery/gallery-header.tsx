'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import { FunctionComponent, useState } from 'react'
import { navLinks } from '@/components/header/nav-links'
import type { AuthUser } from '@/app/(frontend)/(backend)/actions/auth'
import { logout } from '@/app/(frontend)/(backend)/actions/auth'
import GalleryUserMenu from './gallery-user-menu'

interface GalleryHeaderProps {
  user?: AuthUser | null
}

const GalleryHeader: FunctionComponent<GalleryHeaderProps> = ({ user = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
    setIsMenuOpen(false)
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 bg-pure-white border-b border-neutral-light">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="text-body-big-bold md:text-title-4 text-neutral-black font-bold">
            miran
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 text-body-base text-neutral-sub-text hover:text-neutral-black transition-colors"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
          <GalleryUserMenu user={user} />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <GalleryUserMenu user={user} />
          <button
            className="p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-neutral-light">
          <nav className="container py-4 flex flex-col gap-4">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 text-body-base text-neutral-sub-text hover:text-neutral-black transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}

            {/* Auth Links */}
            <div className="border-t border-neutral-200 pt-4 mt-2">
              {user ? (
                <>
                  <p className="text-sm text-neutral-500 mb-4">Signed in as {user.email}</p>
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-body-base text-neutral-sub-text hover:text-neutral-black transition-colors py-2"
                  >
                    <Squares2X2Icon className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-3 text-body-base text-red-600 hover:opacity-80 transition-colors py-2 disabled:opacity-50"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </>
              ) : (
                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 text-body-base text-neutral-sub-text hover:text-neutral-black transition-colors py-2"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default GalleryHeader
