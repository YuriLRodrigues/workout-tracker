import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'

import { findTotalWorkoutsCountByUserId } from '@/http/kubb-gen'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const TotalWorkouts = async () => {
  const { totalCount, since } = await findTotalWorkoutsCountByUserId()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Total de Treinos</CardTitle>
        <div className="rounded-full bg-purple-500/10 p-2 text-purple-500">
          <Icon name="Dumbbell" className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalCount}</div>
        <p className="text-muted-foreground text-xs">
          {since ? `Desde ${format(since, 'dd/MM/yyyy', { locale: ptBR })}` : 'Nenhum treino registrado'}
        </p>
      </CardContent>
    </Card>
  )
}
