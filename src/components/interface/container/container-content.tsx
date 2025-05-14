import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type ContainerContentProps = ComponentProps<'section'>

export const ContainerContent = ({ className, children, ...props }: ContainerContentProps) => {
  return (
    <section className={cn('mx-auto max-w-[1920px] space-y-7 px-1 py-8 sm:px-4', className)} {...props}>
      {children}
    </section>
  )
}
