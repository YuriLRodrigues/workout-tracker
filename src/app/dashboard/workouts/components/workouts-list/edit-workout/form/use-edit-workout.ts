import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToggle } from '@/hooks/use-toggle'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { editWorkoutActions } from './edit-workout.actions'
import { EditWorkoutSchemaType, editWorkoutSchema } from './schema'

type EditWorkoutFormProps = {
  workoutId: string
  defaultValues?: EditWorkoutSchemaType
}

export const useEditWorkoutForm = ({ workoutId, defaultValues }: EditWorkoutFormProps) => {
  const { toggle } = useToggle()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<EditWorkoutSchemaType>({
    resolver: zodResolver(editWorkoutSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues,
  })

  const onSubmit = async (data: EditWorkoutSchemaType) => {
    setIsLoading(true)
    const { color, description, icon, name } = data

    const { success, error } = await editWorkoutActions({ color, description, icon, name, workoutId })

    if (success) {
      toast.success('Treino editado com sucesso!')
      toggle(false)
      setIsLoading(false)
      return
    }

    switch (error) {
      case 'Not allowed':
        toast.error('Você não tem permissão para editar um treino!')
        break
      case 'Resource not found':
        toast.error('Banner não encontrado!')
        break
      default:
        toast.error('Erro ao editar o treino!')
        break
    }
    setIsLoading(false)
    return
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isLoading,
  }
}
