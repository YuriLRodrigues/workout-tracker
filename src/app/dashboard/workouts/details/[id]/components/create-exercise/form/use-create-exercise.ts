import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useToggle } from '@/hooks/use-toggle'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { createExerciseActions } from './create-exercise.actions'
import { CreateExerciseSchemaType, createExerciseSchema } from './schema'
export const useCreateExerciseForm = () => {
  const { id } = useParams<{ id: string }>()
  const { toggle } = useToggle()

  const form = useForm<CreateExerciseSchemaType>({
    resolver: zodResolver(createExerciseSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      name: undefined,
      description: undefined,
      executionType: undefined,
      muscleType: undefined,
      targetRepetitions: undefined,
      targetResTime: undefined,
      targetSets: undefined,
      videoReference: undefined,
      bannerId: undefined,
    },
  })

  const onSubmit = async (data: CreateExerciseSchemaType) => {
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

    const { success, error } = await createExerciseActions({
      name,
      description,
      executionType,
      muscleType,
      targetRepetitions,
      targetResTime,
      targetSets,
      videoReference,
      bannerId,
      workoutId: id,
    })

    if (success) {
      toast.success('Novo exercício criado com sucesso!')
      toggle(false)
      return
    }

    switch (error) {
      case 'Not allowed':
        toast.error('Você não tem permissão para criar um exercício!')
        break
      case 'Resource not found':
        toast.error('Banner não encontrado!')
        break
      default:
        toast.error('Erro ao criar exercício!')
        break
    }
    return
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
  }
}
