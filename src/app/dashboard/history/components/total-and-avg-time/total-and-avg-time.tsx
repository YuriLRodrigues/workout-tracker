import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'

import { findTotalAndAvgTimeByUserId } from '@/http/kubb-gen'
import { formatSeconds } from '@/utils/format-seconds'

export const TotalAndAvgTime = async () => {
  const { avgSeconds, totalSeconds } = await findTotalAndAvgTimeByUserId()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Tempo Total</CardTitle>
        <div className="rounded-full bg-green-500/10 p-2 text-green-500">
          <Icon name="Dumbbell" className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatSeconds(totalSeconds)}</div>
        <p className="text-muted-foreground text-xs">Média de {formatSeconds(avgSeconds)} por treino</p>
      </CardContent>
    </Card>
  )
}
