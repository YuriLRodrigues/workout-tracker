import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type MetricsCardTitleProps = ComponentProps<'p'>

export const MetricsCardTitle = ({ className, children, ...props }: MetricsCardTitleProps) => {
  return (
    <p className={cn('text-muted-foreground', className)} {...props}>
      {children}
    </p>
  )
}
