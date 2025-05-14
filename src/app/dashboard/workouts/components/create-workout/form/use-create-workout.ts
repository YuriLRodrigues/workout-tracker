import { useForm } from 'react-hook-form'

import { useToggle } from '@/hooks/use-toggle'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { createWorkoutActions } from './create-workout.actions'
import { CreateWorkoutSchemaType, createWorkoutSchema } from './schema'
export const useCreateWorkoutForm = () => {
  const { toggle } = useToggle()

  const form = useForm<CreateWorkoutSchemaType>({
    resolver: zodResolver(createWorkoutSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      bannerId: undefined,
      color: undefined,
      description: undefined,
      icon: undefined,
      name: undefined,
    },
  })

  const onSubmit = async (data: CreateWorkoutSchemaType) => {
    const { color, description, icon, name, bannerId } = data

    const { success, error } = await createWorkoutActions({ color, description, icon, name, bannerId })

    if (success) {
      toast.success('Novo treino criado com sucesso!')
      toggle(false)
      return
    }

    switch (error) {
      case 'Not allowed':
        toast.error('Você não tem permissão para criar um treino!')
        break
      case 'Resource not found':
        toast.error('Banner não encontrado!')
        break
      default:
        toast.error('Erro ao criar treino!')
        break
    }
    return
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
  }
}
