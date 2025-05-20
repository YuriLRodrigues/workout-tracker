import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@/components/ui/icon'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar'

import { UserRoles } from '@/@types/user'
import { me } from '@/http/kubb-gen'

import { SidebarMain, SidebarMainSkeleton } from './sidebar-main'
import { SidebarSettings, SidebarSettingsSkeleton } from './sidebar-settings'
import { NavUser, NavUserSkeleton } from './sidebar-user'

export async function DashboardSidebar() {
  const user = await me({ next: { tags: ['me'] } })

  return (
    <Sidebar collapsible="icon" className="group/sidebar fixed" variant="floating">
      <SidebarTrigger
        icon={<Icon name="ArrowRight" className="size-8 font-bold" />}
        iconPlacement="right"
        className="bg-primary text-primary-foreground absolute -right-4 bottom-[15%] z-[100] -ml-1 size-9 min-h-0 translate-y-1/2 transition-all"
      />
      <SidebarHeader>
        <Link
          href="/"
          className="my-2 flex w-full items-center justify-center gap-2 group-data-[state=collapsed]:gap-0"
        >
          <Image src="/wt-logo.png" alt="WT-Logo" width={50} height={50} />
          <span className="text-primary line-clamp-1 font-semibold text-nowrap group-data-[state=collapsed]:hidden">
            Workout Tracker
          </span>
        </Link>
      </SidebarHeader>
      <div className="grid h-full max-h-full overflow-hidden">
        <ScrollArea className="max-h-[87vh] w-full flex-1 px-0 duration-300" type="scroll" scrollHideDelay={500}>
          <SidebarContent>
            <SidebarMain userRole={(user.role as UserRoles) || undefined} />
          </SidebarContent>
          <SidebarContent>
            <SidebarSettings userRole={(user.role as UserRoles) || undefined} />
          </SidebarContent>
        </ScrollArea>
      </div>
      <SidebarFooter className="border-t-1">
        <NavUser user={{ avatar: user?.avatar, email: user.email, name: user.name }} />
      </SidebarFooter>
    </Sidebar>
  )
}

export const DashboardSidebarSkeleton = () => {
  return (
    <Sidebar collapsible="icon" className="group/sidebar fixed" variant="floating">
      <SidebarTrigger
        icon={<Icon name="ArrowRight" className="size-8 font-bold" />}
        iconPlacement="right"
        className="bg-primary text-primary-foreground absolute -right-3.5 bottom-[15%] z-[100] -ml-1 size-9 translate-y-1/2"
      />
      <SidebarHeader>
        <Link
          href="/"
          className="my-2 flex w-full items-center justify-center gap-2 group-data-[state=collapsed]:gap-0"
        >
          <Image src="/wt-logo.png" alt="WT-Logo" width={50} height={50} />
          <span className="text-primary line-clamp-1 font-semibold text-nowrap group-data-[state=collapsed]:hidden">
            Workout Tracker
          </span>
        </Link>
      </SidebarHeader>
      <div className="grid h-full max-h-full">
        <ScrollArea
          className="max-h-[87vh] w-full flex-1 px-0 transition-all duration-300"
          type="scroll"
          scrollHideDelay={500}
        >
          <SidebarContent>
            <SidebarMainSkeleton />
          </SidebarContent>
          <SidebarContent>
            <SidebarSettingsSkeleton />
          </SidebarContent>
        </ScrollArea>
      </div>
      <SidebarFooter className="border-t-1">
        <NavUserSkeleton />
      </SidebarFooter>
    </Sidebar>
  )
}
