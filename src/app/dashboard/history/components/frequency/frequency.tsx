import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'

import { findFrequencyByWeekAndUserId } from '@/http/kubb-gen'

export const Frequency = async () => {
  const { frequency } = await findFrequencyByWeekAndUserId()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Frequência</CardTitle>
        <div className="rounded-full bg-yellow-500/10 p-2 text-yellow-500">
          <Icon name="Clock" className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{frequency}</div>
        <p className="text-muted-foreground text-xs">Treinos por semana em média</p>
      </CardContent>
    </Card>
  )
}
