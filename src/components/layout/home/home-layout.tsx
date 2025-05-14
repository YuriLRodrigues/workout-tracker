import React, { Suspense } from 'react'

import { Navbar, NavbarSkeleton } from './navbar'

type RootProps = {
  children: React.ReactNode
}

export const HomeLayout = ({ children }: RootProps) => {
  return (
    <>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      {children}
    </>
  )
}
