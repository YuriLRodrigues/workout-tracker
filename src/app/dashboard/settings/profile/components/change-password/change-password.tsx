import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { ChangePasswordForm } from './form'

export const ChangePassword = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Segurança</CardTitle>
        <CardDescription>Atualize sua senha e configurações de segurança</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ChangePasswordForm />
      </CardContent>
    </Card>
  )
}
