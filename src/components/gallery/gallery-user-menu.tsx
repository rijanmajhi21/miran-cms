'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRightOnRectangleIcon, Squares2X2Icon, Bars3Icon } from '@heroicons/react/24/outline'
import type { AuthUser } from '@/app/(frontend)/(backend)/actions/auth'
import { logout } from '@/app/(frontend)/(backend)/actions/auth'
import { ROUTE_ADMIN } from '@/data/routes'

interface GalleryUserMenuProps {
  user: AuthUser | null
}

export default function GalleryUserMenu({ user }: GalleryUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
    setIsOpen(false)
    router.refresh()
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-2 text-neutral-sub-text hover:text-neutral-black transition-colors cursor-pointer"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden z-50">
          {user ? (
            <>
              {/* User Info with Avatar */}
              <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50 border-b border-neutral-100">
                {/* Avatar Circle */}
                <div className="shrink-0 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white uppercase">
                    {user.email.charAt(0)}
                  </span>
                </div>
                {/* User Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {user.email.split('@')[0]}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-1.5">
                <Link
                  href={ROUTE_ADMIN}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <Squares2X2Icon className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="p-1.5">
              <Link
                href={ROUTE_ADMIN}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
