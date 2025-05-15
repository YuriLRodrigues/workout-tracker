import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToggle } from '@/hooks/use-toggle'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { createExerciseActions } from './create-exercise.actions'
import { CreateExerciseSchemaType, createExerciseSchema } from './schema'
export const useCreateExerciseForm = () => {
  const { id } = useParams<{ id: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
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
      setIsLoading(false)
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
    setIsLoading(false)
    return
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isLoading,
  }
}
