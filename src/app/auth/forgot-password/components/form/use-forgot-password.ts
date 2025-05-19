import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { forgotPasswordActions } from './forgot-password.actions'
import { forgotPasswordSchema, ForgotPasswordSchemaProps } from './schema'

type useForgotPasswordProps = {
  defaultValues?: Partial<ForgotPasswordSchemaProps>
}

export const useForgotPassword = ({ defaultValues }: useForgotPasswordProps = {}) => {
  const form = useForm<ForgotPasswordSchemaProps>({
    resolver: zodResolver(forgotPasswordSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      email: defaultValues?.email ?? '',
    },
  })

  const onSubmit = async (data: ForgotPasswordSchemaProps) => {
    const { email } = data
    const { success, error } = await forgotPasswordActions({ email })
    if (success) {
      toast.success('Recuperação de senha enviada ao seu e-mail', {
        description: '-- VERIFIQUE SUA CAIXA DE SPAM --',
        duration: 5000,
      })
    } else {
      switch (error) {
        case 'Resource not found':
          toast.error('E-mail não cadastrado em nosso sistema.')
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
