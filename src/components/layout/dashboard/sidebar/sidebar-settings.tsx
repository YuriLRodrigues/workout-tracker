'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ThemeSwitcher } from '@/components/interface/theme-switcher'
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

import { settingsLinks } from './links'

type SidebarSettingsProps = {
  userRole: UserRoles
}

export const SidebarSettings = ({ userRole }: SidebarSettingsProps) => {
  const pathName = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Configurações</SidebarGroupLabel>
      <SidebarMenu>
        {settingsLinks.map((link) => {
          const isLinkActive = link.href === pathName || link.items?.some((item) => item.href === pathName)
          const isValidToUserAccess = link.permissionRoles.includes(userRole)

          if (!isValidToUserAccess) return null

          if (link.items && link.items.length > 0) {
            return (
              <Collapsible key={link.label} asChild defaultOpen={isLinkActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={link.label}>
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
                        const isThemeButton = subItem.label === 'Tema'

                        if (isThemeButton) {
                          return (
                            <SidebarMenuSubItem key={subItem.label} className="w-full bg-transparent">
                              <SidebarMenuSubButton className="flex w-full items-center justify-between hover:bg-transparent active:bg-transparent data-[active=true]:bg-transparent">
                                <div className="flex items-center gap-2">
                                  <Icon name={subItem.iconName} />
                                  <span>{subItem.label}</span>
                                </div>
                                <ThemeSwitcher className="h-7" />
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        }

                        return (
                          <SidebarMenuSubItem key={subItem.label}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={subItem.href}
                                className={cn(
                                  subItemIsLinkActive &&
                                    'bg-foreground/5 text-primary flex items-center gap-2 font-semibold',
                                )}
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
      {/* <SidebarMenu>
        {plansLinks.map((link) => {
          const isLinkActive = link.href === pathName
          const isValidToUserAccess = link.permissionRoles.includes(userRole)

          if (!isValidToUserAccess) return null

          if (link.items && link.items.length > 0) {
            return (
              <Collapsible key={link.label} asChild defaultOpen={isLinkActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={link.label}>
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
      </SidebarMenu> */}
    </SidebarGroup>
  )
}

export const SidebarSettingsSkeleton = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Configurações</SidebarGroupLabel>
      <SidebarMenu>
        {[...Array(2)].map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton asChild className="hover:bg-foreground/10 hover:text-primary duration-200">
              <div className="flex items-center gap-2">
                <Skeleton className="size-4 rounded-xs" />
                <Skeleton className="h-4 w-30" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
