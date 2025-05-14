import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'

import { findAverageWorkoutByWeek } from '@/http/kubb-gen'
import { cn } from '@/lib/utils'

export const AvgWorkoutByWeek = async () => {
  const { workoutDiffCount, thisWeekCount } = await findAverageWorkoutByWeek()

  return (
    <Card className="from-background to-muted/30 animate-fade-up animate-once overflow-hidden border-none bg-gradient-to-br shadow-md transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Treinos na Semana</CardTitle>
        <div className="rounded-full bg-blue-500/10 p-2 text-blue-500">
          <Icon name="Calendar" className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-2xl font-bold">{thisWeekCount}/7</div>
        <p className="text-muted-foreground text-xs">
          <span
            className={cn(
              workoutDiffCount > 0 && 'font-semibold text-green-600',
              workoutDiffCount < 0 && 'font-semibold text-red-600',
            )}
          >
            {workoutDiffCount >= 0 && '+'}
            {workoutDiffCount}
          </span>{' '}
          comparado à semana passada
        </p>
      </CardContent>
    </Card>
  )
}
