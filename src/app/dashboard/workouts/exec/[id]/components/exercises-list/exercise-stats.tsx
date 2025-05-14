import { NumberTicker } from '@/components/magicui/number-ticker'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

type ExerciseStatsProps = {
  lastWeight: number
  maxWeight: number
}

export const ExerciseStats = ({ lastWeight, maxWeight }: ExerciseStatsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="text-muted-foreground flex items-center gap-2 text-sm">
        <Icon name="History" className="size-5" />
        <span>
          Última carga: <NumberTicker value={lastWeight} className="text-muted-foreground" />
          kg
        </span>
      </p>
      <span className="hidden sm:flex">•</span>
      <p className="text-muted-foreground flex items-center gap-2 text-sm">
        <Icon name="BicepsFlexed" className="size-5" />
        <span>
          Carga máxima: <NumberTicker value={maxWeight} className="text-muted-foreground" />
          kg
        </span>
      </p>
    </div>
  )
}

export const ExerciseStatsSkeleton = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Icon name="History" className="size-5" />
        <span className="flex items-center gap-1">
          Última carga: <Skeleton className="h-4 w-8" />
          kg
        </span>
      </div>
      <span className="hidden sm:flex">•</span>
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Icon name="BicepsFlexed" className="size-5" />
        <span className="flex items-center gap-1">
          Carga máxima: <Skeleton className="h-4 w-8" />
          kg
        </span>
      </div>
    </div>
  )
}
