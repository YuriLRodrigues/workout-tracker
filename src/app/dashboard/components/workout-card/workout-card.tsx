import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'
import type { icons } from 'lucide-react'

interface WorkoutCardProps {
  name: string
  description: string
  iconName: keyof typeof icons
  color: string
  href: string
}

export function WorkoutCard({ name, description, iconName, color, href }: WorkoutCardProps) {
  return (
    <Button asChild variant="outline">
      <Link href={href} className="flex flex-col items-center gap-1">
        <div className={cn('bg-card flex items-center justify-center rounded-full p-2')}>
          <Icon name={iconName} className={`h-6 w-6 ${color}`} />
        </div>
        <span className="line-clamp-1 text-wrap first-letter:uppercase">{name}</span>
        <span className="text-muted-foreground line-clamp-1 text-xs text-wrap first-letter:uppercase">
          {description}
        </span>
      </Link>
    </Button>
  )
}

export const WorkoutCardSkeleton = () => {
  return <Skeleton className="h-26 w-full" />
}
