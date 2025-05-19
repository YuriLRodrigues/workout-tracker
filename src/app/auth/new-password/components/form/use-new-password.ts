import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { newPasswordActions } from './new-password.actions'
import { newPasswordSchema, NewPasswordSchemaProps } from './schema'

type useNewPasswordProps = {
  defaultValues?: Partial<NewPasswordSchemaProps>
}

export const useNewPassword = ({ defaultValues }: useNewPasswordProps = {}) => {
  const router = useRouter()
  const recoveryPasswordToken = useSearchParams().get('recovery-password-token')

  const form = useForm<NewPasswordSchemaProps>({
    resolver: zodResolver(newPasswordSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      confirmPassword: defaultValues?.confirmPassword ?? '',
      newPassword: defaultValues?.newPassword ?? '',
    },
  })

  const onSubmit = async (data: NewPasswordSchemaProps) => {
    const { newPassword } = data
    if (!recoveryPasswordToken) toast.error('Você não possui um token de recuperação de senha')

    const { success, error } = await newPasswordActions({ password: newPassword, token: recoveryPasswordToken! })

    if (success) {
      toast.success('Senha alterada com sucesso!', {
        description: 'Realize o seu login para ter acesso a plataforma',
      })
      router.replace('/auth/sign-in')
    } else {
      switch (error) {
        case 'Resource not found':
          toast.error('E-mail não cadastrado em nosso sistema.')
          break
        case `Password reset token '${recoveryPasswordToken}' is expired.`:
          toast.error('Token de recuperação expirado.')
          break
        case `Password reset token '${recoveryPasswordToken}' is invalid.`:
          toast.error('Token de recuperação inválido.')
          break
        default:
          toast.error('Falha ao enviar o e-mail de recuperação de senha')
      }
    }
  }

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
