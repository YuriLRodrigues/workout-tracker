import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'

import { findAverageTimeByWeek } from '@/http/kubb-gen'
import { cn } from '@/lib/utils'
import { formatSeconds } from '@/utils/format-seconds'

export const AvgTimeByWeek = async () => {
  const { timeDiffSeconds, totalThisWeekSeconds } = await findAverageTimeByWeek()

  return (
    <Card className="from-background to-muted/30 animate-fade-up animate-once overflow-hidden border-none bg-gradient-to-br shadow-md transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
        <div className="rounded-full bg-amber-500/10 p-2 text-amber-500">
          <Icon name="Clock" className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-2xl font-bold">{formatSeconds(totalThisWeekSeconds)}</div>
        <p className="text-muted-foreground text-xs">
          <span
            className={cn(
              timeDiffSeconds > 0 && 'font-semibold text-green-600',
              timeDiffSeconds < 0 && 'font-semibold text-red-600',
            )}
          >
            {timeDiffSeconds >= 0 && '+'}
            {formatSeconds(timeDiffSeconds)}
          </span>{' '}
          comparado à semana passada
        </p>
      </CardContent>
    </Card>
  )
}
