import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'

import { findTotalSeriesByWeek } from '@/http/kubb-gen'
import { cn } from '@/lib/utils'
import { formatNumberBR } from '@/utils/format-number-to-br'

export const TotalSeriesByWeek = async () => {
  const { seriesDiff, thisWeekTotal } = await findTotalSeriesByWeek()

  return (
    <Card className="from-background to-muted/30 animate-fade-up animate-once overflow-hidden border-none bg-gradient-to-br shadow-md transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Séries na semana</CardTitle>
        <div className="rounded-full bg-green-500/10 p-2 text-green-500">
          <Icon name="TrendingUp" className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-2xl font-bold">{formatNumberBR(thisWeekTotal)}</div>
        <p className="text-muted-foreground text-xs">
          <span
            className={cn(
              seriesDiff > 0 && 'font-semibold text-green-600',
              seriesDiff < 0 && 'font-semibold text-red-600',
            )}
          >
            {seriesDiff >= 0 && '+'}
            {formatNumberBR(seriesDiff)}
          </span>{' '}
          séries comparado à semana passada
        </p>
      </CardContent>
    </Card>
  )
}
