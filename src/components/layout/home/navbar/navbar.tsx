import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { ThemeSwitcher } from '@/components/interface/theme-switcher'

import { UserRoles } from '@/@types/user'
import { isAuthenticated } from '@/auth'
import { me } from '@/http/kubb-gen'

import { navbarLinks } from './links'
import { MobileMenu, MobileMenuSkeleton } from './mobile-menu'
import { NavLink } from './nav-link'
import { UserProfile, UserProfileSkeleton } from './user-profile'

export const Navbar = async () => {
  const userAlreadyAuthenticated = await isAuthenticated()
  let userRole: UserRoles | undefined = undefined

  if (userAlreadyAuthenticated) {
    const meUser = await me()
    userRole = meUser.role as UserRoles
  }

  return (
    <header className="@container fixed z-[99] flex w-full px-4 py-2 backdrop-blur-xl">
      <nav className="container mx-auto flex w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/wt-logo.png" alt="WT-Logo" width={50} height={50} />
          <span className="hidden text-xl font-bold @min-xs:block">Workout Tracker</span>
        </Link>
        <ul className="hidden items-center justify-center gap-x-3 md:flex">
          {navbarLinks.map((link) => {
            const isValidToUserAccess =
              !link.permissionRoles || (userRole ? link.permissionRoles.includes(userRole) : false)

            if (link.isAuthOnly && userAlreadyAuthenticated) return null

            if (!isValidToUserAccess) return null

            return (
              <NavLink
                label={link.label}
                href={link.href}
                iconName={link.iconName}
                isAuthOnly={link?.isAuthOnly}
                highlight={link?.highlight}
                key={link.label}
              />
            )
          })}
          <ThemeSwitcher className="mx-3" />
          {userAlreadyAuthenticated && (
            <Suspense fallback={<UserProfileSkeleton />}>
              <UserProfile />
            </Suspense>
          )}
        </ul>
        <Suspense fallback={<MobileMenuSkeleton />}>
          <MobileMenu />
        </Suspense>
      </nav>
    </header>
  )
}

export const NavbarSkeleton = () => {
  return (
    <header className="fixed z-[99] flex w-full px-4 py-2 backdrop-blur-xl">
      <nav className="container mx-auto flex w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/wt-logo.png" alt="WT-Logo" width={50} height={50} />
          <span className="text-xl font-bold">Workout Tracker</span>
        </Link>
        <ul className="hidden items-center justify-center gap-x-3 md:flex">
          {[...Array(4)].map((_, index) => (
            <NavLink label={`Skeleton`} isSkeleton={true} href="#" iconName="Loader" key={index} />
          ))}
          <UserProfileSkeleton />
        </ul>
      </nav>
    </header>
  )
}
