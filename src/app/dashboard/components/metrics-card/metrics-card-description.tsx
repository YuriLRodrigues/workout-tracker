import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type MetricsCardDescriptionProps = ComponentProps<'p'>

export const MetricsCardDescription = ({ className, children, ...props }: MetricsCardDescriptionProps) => {
  return (
    <p className={cn('font-medium', className)} {...props}>
      {children}
    </p>
  )
}
