import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { calculateElapsedTime } from '@/utils/calculate-elapsed-time'
import { formatDate } from '@/utils/format-date'
import { icons } from 'lucide-react'

interface WorkoutHistoryItemProps {
  name: string
  description: string
  startTime: Date
  endTime: Date
  icon: keyof typeof icons
  color: string
}

export function WorkoutHistoryItem({ name, icon, color, description, endTime, startTime }: WorkoutHistoryItemProps) {
  const { formatted: duration } = calculateElapsedTime({ endTime, startTime })

  return (
    <div className="hover:bg-muted/50 animate-fade-up animate-once flex flex-wrap items-center justify-between gap-4 p-4 transition-colors">
      <div className="flex flex-wrap items-center gap-4">
        <div className={`rounded-full p-2 ${color} bg-card`}>
          <Icon name={icon} className="h-5 w-5" />
        </div>
        <div>
          <p className="line-clamp-1 max-w-36 min-w-36 font-medium text-wrap">{name}</p>
          <p className="text-muted-foreground line-clamp-1 max-w-36 min-w-36 text-sm text-wrap">{description}</p>
        </div>
      </div>
      <div className="text-left sm:text-right">
        <p className="font-medium">{formatDate(startTime)}</p>
        <p className="text-muted-foreground text-sm">{duration}</p>
      </div>
    </div>
  )
}

export const WorkoutHistoryItemSkeleton = () => {
  return (
    <div className="hover:bg-muted/50 animate-fade-up animate-once flex flex-wrap items-center justify-between gap-4 p-4 transition-colors">
      <div className="flex items-center gap-4">
        <Skeleton className="rounded-full p-2">
          <Skeleton className="size-5" />
        </Skeleton>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20 sm:w-38" />
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-2 sm:items-end">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  )
}
