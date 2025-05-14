import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/ui/icon'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

import { UserRoles } from '@/@types/user'
import { me } from '@/http/kubb-gen'

import { profileLinks } from './links'
import { LogoutButton } from './logout-button'

export const UserProfile = async () => {
  const user = await me({
    next: {
      tags: ['me'],
    },
  })
  const userRole = user.role as UserRoles

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={user?.avatar || '/assets/default-user-avatar.webp'}
            className="object-cover object-center"
          />
          <AvatarFallback>WT</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[9999] space-y-2">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileLinks.map((link) => {
          const isValidToUserAccess =
            !link.permissionRoles || (userRole ? link.permissionRoles.includes(userRole) : false)

          if (!isValidToUserAccess) return null
          return (
            <DropdownMenuItem asChild key={link.href}>
              <Link href={link.href} className="flex items-center gap-2">
                <Icon name={link.iconName} /> {link.label}
              </Link>
            </DropdownMenuItem>
          )
        })}
        <Separator />
        <LogoutButton className="h-7" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const UserProfileSkeleton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8">
          <AvatarFallback>
            <Skeleton className="h-full w-full" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <DropdownMenuItem asChild key={index}>
            <Link href="#" className="text-gray-500 hover:text-gray-600">
              Loading...
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
