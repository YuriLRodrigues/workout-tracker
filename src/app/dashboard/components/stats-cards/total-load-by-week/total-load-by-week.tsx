import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'

import { findTotalLoadByWeek } from '@/http/kubb-gen'
import { cn } from '@/lib/utils'
import { formatNumberBR } from '@/utils/format-number-to-br'

export const TotalLoadByWeek = async () => {
  const { loadDiff, thisWeekTotal } = await findTotalLoadByWeek()

  return (
    <Card className="from-background to-muted/30 animate-fade-up animate-once overflow-hidden border-none bg-gradient-to-br shadow-md transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Carga total</CardTitle>
        <div className="rounded-full bg-purple-500/10 p-2 text-purple-500">
          <Icon name="Dumbbell" className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-2xl font-bold">{formatNumberBR(thisWeekTotal)} kg</div>
        <p className="text-muted-foreground text-xs">
          <span
            className={cn(loadDiff > 0 && 'font-semibold text-green-600', loadDiff < 0 && 'font-semibold text-red-600')}
          >
            {loadDiff >= 0 && '+'}
            {formatNumberBR(loadDiff)} kg
          </span>{' '}
          comparado à semana passada
        </p>
      </CardContent>
    </Card>
  )
}
