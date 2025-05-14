import { useForm } from 'react-hook-form'

import { useToggle } from '@/hooks/use-toggle'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { changePasswordActions } from './change-password.actions'
import { ChangePasswordSchemaType, changePasswordSchema } from './schema'

export const useChangePasswordForm = () => {
  const { toggle } = useToggle()

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      confirmNewPassword: '',
      newPassword: '',
      oldPassword: '',
    },
  })

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    const { newPassword, oldPassword } = data

    const { success, error } = await changePasswordActions({
      newPassword,
      oldPassword,
    })

    if (success) {
      toast.success('Senha atualizada com sucesso!')
      toggle(false)
      clear()
      return
    }

    switch (error) {
      case 'Resource not found':
        toast.error('Usuário não encontrado!')
        break
      case 'Not allowed':
        toast.error('Você não tem permissão para realizar essa ação, verifique sua senha atual!')
        break
      case 'Resource already exists':
        toast.error('Você deve inserir uma senha diferente da atual!')
        break
      default:
        toast.error('Erro ao atualizar a senha!')
        break
    }
    return
  }

  const clear = () => {
    form.reset({
      confirmNewPassword: '',
      newPassword: '',
      oldPassword: '',
    })
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isLoading: form.formState.isSubmitting,
  }
}
