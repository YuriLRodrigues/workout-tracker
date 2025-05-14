'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Icon } from '@/components/ui/icon'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

import { UserRoles } from '@/@types/user'
import { cn } from '@/lib/utils'

import { mainLinks } from './links'

type SidebarMainProps = {
  userRole: UserRoles
}

export const SidebarMain = ({ userRole }: SidebarMainProps) => {
  const pathName = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Aplicação</SidebarGroupLabel>
      <SidebarMenu>
        {mainLinks.map((link) => {
          const isLinkActive = link.href === pathName || link.items?.some((item) => item.href === pathName)
          const isValidToUserAccess = link.permissionRoles.includes(userRole)

          if (!isValidToUserAccess) return null

          if (link.items && link.items.length > 0) {
            return (
              <Collapsible key={link.label} asChild defaultOpen={isLinkActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={link.label}
                      className={cn(isLinkActive && 'bg-foreground/5 text-primary font-semibold')}
                    >
                      <div className="flex items-center gap-2">
                        <Icon name={link.iconName} />
                        <span>{link.label}</span>
                      </div>
                      <Icon
                        name="ChevronRight"
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {link.items?.map((subItem) => {
                        const subItemIsLinkActive = subItem.href === pathName

                        return (
                          <SidebarMenuSubItem key={subItem.label}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={subItem.href}
                                className={cn(subItemIsLinkActive && 'bg-foreground/5 text-primary font-semibold')}
                              >
                                <Icon name={subItem.iconName} />
                                <span>{subItem.label}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          }

          return (
            <SidebarMenuItem key={link.label}>
              <SidebarMenuButton
                tooltip={link.label}
                asChild
                className="hover:bg-foreground/10 hover:text-primary duration-200"
              >
                <Link href={link.href!} className={cn(isLinkActive && 'bg-foreground/5 text-primary font-semibold')}>
                  <Icon name={link.iconName} />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export const SidebarMainSkeleton = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Aplicação</SidebarGroupLabel>
      <SidebarMenu>
        {[...Array(3)].map((_, index) => {
          if (index === 1) {
            return (
              <Collapsible key={index} asChild defaultOpen={index === 1} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <div className="flex items-center gap-2">
                        <Skeleton className="size-4 rounded-xs" />
                        <Skeleton className="h-4 w-30" />
                      </div>
                      <Icon
                        name="ChevronRight"
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {[...Array(4)].map((_, index) => (
                        <SidebarMenuSubItem key={index}>
                          <SidebarMenuSubButton asChild>
                            <div className="flex items-center gap-2">
                              <Skeleton className="size-4 rounded-xs" />
                              <Skeleton className="h-4 w-30" />
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          }

          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton>
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded-xs" />
                  <Skeleton className="h-4 w-30" />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
