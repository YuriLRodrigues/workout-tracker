import { Suspense } from 'react'

import { Container } from '@/components/interface/container'
import { CustomBreadCrumb } from '@/components/interface/custom-breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { DashboardSidebar, DashboardSidebarSkeleton } from './sidebar/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Suspense fallback={<DashboardSidebarSkeleton />}>
        <DashboardSidebar />
      </Suspense>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 size-9" />
            <Separator orientation="vertical" />
            <CustomBreadCrumb />
          </div>
        </header>
        <Container.Root className="px-4 pt-0 sm:pt-0">{children}</Container.Root>
      </SidebarInset>
    </SidebarProvider>
  )
}
