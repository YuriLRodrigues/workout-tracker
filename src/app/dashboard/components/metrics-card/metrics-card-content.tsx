import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type MetricsCardContentProps = ComponentProps<'div'>

export const MetricsCardContent = ({ className, children, ...props }: MetricsCardContentProps) => {
  return (
    <div className={cn('bg-muted/30 rounded-lg p-3', className)} {...props}>
      {children}
    </div>
  )
}
