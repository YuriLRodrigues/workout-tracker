import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { UpdatePersonalInfoForm } from './form'

export const PersonalInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
        <CardDescription>Atualize suas informações pessoais</CardDescription>
      </CardHeader>
      <CardContent className="h-full space-y-4">
        <UpdatePersonalInfoForm />
      </CardContent>
    </Card>
  )
}
