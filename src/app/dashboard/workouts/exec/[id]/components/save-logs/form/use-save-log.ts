import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToggle } from '@/hooks/use-toggle'
import { findLogTodayByExerciseIdQueryKey, useFindLogTodayByExerciseId } from '@/http/kubb-gen'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { saveLogActions } from './save-log.actions'
import { SaveLogSchemaType, saveLogSchema } from './schema'

type useSaveLogFormProps = {
  exerciseId: string
}
export const useSaveLogForm = ({ exerciseId }: useSaveLogFormProps) => {
  const queryClient = useQueryClient()
  const { toggle } = useToggle()
  const { id } = useParams<{ id: string }>()
  const [effortLevel, setEffortLevel] = useState<number>(5)

  const { data, isLoading } = useFindLogTodayByExerciseId({ exerciseId })
  const exerciseIsCompleted = !!data

  const form = useForm<SaveLogSchemaType>({
    resolver: zodResolver(saveLogSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      averageRestTime: undefined,
      maxRepeat: undefined,
      maxSeries: undefined,
      maxWeight: undefined,
      notes: undefined,
    },
  })

  const onSubmit = async (data: SaveLogSchemaType) => {
    const { averageRestTime, maxRepeat, maxSeries, maxWeight, notes } = data

    const { success, error } = await saveLogActions({
      averageRestTime,
      exerciseId,
      maxRepeat,
      maxSeries,
      maxWeight,
      notes,
      effortLevel,
      workoutId: id,
    })

    if (success) {
      toast.success('Novo log adicionado!')
      await queryClient.invalidateQueries({ queryKey: findLogTodayByExerciseIdQueryKey({ exerciseId }) })
      toggle(false)
      clear()
      return
    }

    switch (error) {
      case 'Not allowed':
        toast.error('Você não tem permissão para criar um log!')
        break
      case 'Resource not found':
        toast.error('Exercício não encontrado!')
        break
      default:
        toast.error('Erro ao criar log!')
        break
    }
    return
  }

  const clear = () => {
    form.reset({
      averageRestTime: undefined,
      maxRepeat: undefined,
      maxSeries: undefined,
      maxWeight: undefined,
      notes: undefined,
    })
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    exerciseIsCompleted,
    isLoading,
    setEffortLevel,
    effortLevel,
  }
}
