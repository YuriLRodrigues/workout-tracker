'use client'
import Link from 'next/link'
import { Fragment } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/ui/icon'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

import { dashboardProfileLinks } from './links'
import { LogoutButton } from './logout-button'

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar?: string | null
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatarProfile avatar={user.avatar} email={user.email} name={user.name} />
              <Icon name="ChevronsUpDown" className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 p-1.5 text-left text-sm">
                <UserAvatarProfile avatar={user.avatar} email={user.email} name={user.name} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {dashboardProfileLinks.map((link) => (
                <DropdownMenuItem key={link.label} asChild className="hover:cursor-pointer">
                  <Link href={link.href!}>
                    <Icon name={link.iconName} />
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="hover:bg-transparent dark:hover:bg-transparent">
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

const UserAvatarProfile = ({ avatar, name, email }: { avatar?: string | null; name: string; email: string }) => {
  return (
    <Fragment>
      <Avatar>
        <AvatarImage
          src={avatar || '/assets/default-user-avatar.webp'}
          alt={name}
          className="object-cover object-center"
        />
        <AvatarFallback className="border-foreground rounded-full border">WT</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{name}</span>
        <span className="truncate text-xs">{email}</span>
      </div>
    </Fragment>
  )
}

const UserAvatarProfileSkeleton = () => {
  return (
    <Fragment>
      <Avatar>
        <AvatarFallback className="rounded-full">
          <Skeleton className="size-8" />
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-32" />
      </div>
    </Fragment>
  )
}

export const NavUserSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-2 p-1">
      <UserAvatarProfileSkeleton />
      <Icon name="ChevronsUpDown" className="ml-auto size-4" />
    </div>
  )
}
