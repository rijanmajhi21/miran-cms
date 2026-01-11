'use client'

import Image from '@/components/commons/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import { FunctionComponent } from 'react'
import { navLinks } from './nav-links'
import type { AuthUser } from '@/app/(frontend)/(backend)/actions/auth'
import { logout } from '@/app/(frontend)/(backend)/actions/auth'

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
  user?: AuthUser | null
}

const MobileMenu: FunctionComponent<MobileMenuProps> = ({ isOpen, onClose, user }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  if (!isOpen) return null

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
    onClose()
    router.refresh()
  }

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

          {/* Divider */}
          <li className="border-t border-neutral-200 pt-4 mt-2">
            {user ? (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-neutral-500">Signed in as {user.email}</p>
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center gap-3 text-body-base text-neutral-black hover:opacity-80 transition-opacity py-2"
                >
                  <Squares2X2Icon className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-3 text-body-base text-red-600 hover:opacity-80 transition-opacity py-2 disabled:opacity-50"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              </div>
            ) : (
              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center gap-3 text-body-base text-neutral-black hover:opacity-80 transition-opacity py-2"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default MobileMenu
