import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { PhysicalStatsForm } from './form'

export const PhysicsStats = () => {
  return (
    <Card className="h-full @min-4xl:col-span-2 @min-[90rem]:col-span-1">
      <CardHeader>
        <CardTitle>Informações Físicas</CardTitle>
        <CardDescription>Atualize suas informações físicas</CardDescription>
      </CardHeader>
      <CardContent className="h-full space-y-4">
        <PhysicalStatsForm />
      </CardContent>
    </Card>
  )
}
