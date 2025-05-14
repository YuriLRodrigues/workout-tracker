import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { ThemeSwitcher } from '@/components/interface/theme-switcher'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Icon } from '@/components/ui/icon'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import { isAuthenticated } from '@/auth'

import { AvatarMenu, AvatarMenuSkeleton } from './avatar-menu'
import { navbarLinks } from './links'
import { NavLink } from './nav-link'
import { UserProfile, UserProfileSkeleton } from './user-profile'

export const MobileMenu = async () => {
  const userAlreadyAuthenticated = await isAuthenticated()

  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center gap-2 md:hidden">
        <Icon name="Menu" className="size-5" />
        {userAlreadyAuthenticated && (
          <Suspense fallback={<UserProfileSkeleton />}>
            <UserProfile />
          </Suspense>
        )}
      </SheetTrigger>
      <SheetContent className="z-[999999] flex flex-col space-y-2 transition-none" side="top">
        <SheetHeader className="pb-0">
          <SheetTitle className="flex w-full items-center justify-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/wt-logo.png" alt="WT-Logo" width={50} height={50} />
              <span className="text-xl font-bold">Workout Tracker</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-1 flex-col gap-3">
          {navbarLinks.map((link) => (
            <NavLink
              label={link.label}
              href={link.href}
              iconName={link.iconName}
              isAuthOnly={link?.isAuthOnly}
              highlight={link?.highlight}
              key={link.label}
              className="w-fit max-w-fit"
            />
          ))}
          <ThemeSwitcher className="mx-3" />
        </ul>
        {userAlreadyAuthenticated && (
          <Suspense fallback={<AvatarMenuSkeleton />}>
            <AvatarMenu />
          </Suspense>
        )}
      </SheetContent>
    </Sheet>
  )
}

export const MobileMenuSkeleton = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center gap-2 md:hidden">
        <Icon name="Menu" className="size-5" />
        <Avatar className="size-8">
          <AvatarFallback>WT</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="flex flex-col space-y-6">
        <SheetHeader>
          <SheetTitle className="flex w-full items-center justify-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/wt-logo.png" alt="WT-Logo" width={50} height={50} />
              <span className="text-xl font-bold">Workout Tracker</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-1 flex-col gap-3">
          {navbarLinks.map((link) => (
            <NavLink
              label={link.label}
              href={link.href}
              iconName={link.iconName}
              isAuthOnly={link?.isAuthOnly}
              highlight={link?.highlight}
              key={link.label}
            />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
