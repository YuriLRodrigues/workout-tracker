import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToggle } from '@/hooks/use-toggle'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { UpdateExerciseSchemaType, updateExerciseSchema } from './schema'
import { updateExerciseActions } from './update-exercise.actions'

type useUpdateExerciseFormProps = {
  defaultValues?: UpdateExerciseSchemaType
  exerciseId: string
}

export const useUpdateExerciseForm = ({ defaultValues, exerciseId }: useUpdateExerciseFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toggle } = useToggle()

  const form = useForm<UpdateExerciseSchemaType>({
    resolver: zodResolver(updateExerciseSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues,
  })

  const onSubmit = async (data: UpdateExerciseSchemaType) => {
    setIsLoading(true)
    const {
      name,
      description,
      executionType,
      muscleType,
      targetRepetitions,
      targetResTime,
      targetSets,
      videoReference,
      bannerId,
    } = data

    const { success, error } = await updateExerciseActions({
      name,
      description,
      executionType,
      muscleType,
      targetRepetitions,
      targetResTime,
      targetSets,
      videoReference,
      bannerId,
      exerciseId,
    })

    if (success) {
      toast.success('Exercício atualizado com sucesso!')
      toggle(false)
      setIsLoading(false)
      return
    }

    switch (error) {
      case 'Not allowed':
        toast.error('Você não tem permissão para editar um exercício!')
        break
      case 'Resource not found':
        toast.error('Banner não encontrado!')
        break
      default:
        toast.error('Erro ao editar exercício!')
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
