import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToggle } from '@/hooks/use-toggle'
import { useFindPhysicalStatsByUserId } from '@/http/kubb-gen'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createOrUpdatePhysicalStatsActions } from './physical-stats.actions'
import { CreatePhysicalStatsSchemaType, createPhysicalStatsSchema } from './schema'

export const usePhysicalStatsForm = () => {
  const { toggle } = useToggle()
  const [requestIsSending, setRequestIsSending] = useState<boolean>(false)

  const { data: physicalStats, isLoading } = useFindPhysicalStatsByUserId({
    query: { queryKey: ['findPhysicalStatsByUserId'] },
  })

  const queryClient = useQueryClient()

  const form = useForm<CreatePhysicalStatsSchemaType>({
    resolver: zodResolver(createPhysicalStatsSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      age: physicalStats?.data?.age || undefined,
      bodyFat: physicalStats?.data?.bodyFat || undefined,
      height: physicalStats?.data?.height || undefined,
      goal: physicalStats?.data?.goal || undefined,
      muscleMass: physicalStats?.data?.muscleMass || undefined,
      weight: physicalStats?.data?.weight || undefined,
    },
  })

  useEffect(() => {
    if (physicalStats?.data?.age) {
      form.setValue('age', physicalStats?.data.age)
    }
    if (physicalStats?.data?.bodyFat) {
      form.setValue('bodyFat', physicalStats?.data.bodyFat)
    }
    if (physicalStats?.data?.goal) {
      form.setValue('goal', physicalStats?.data.goal)
    }
    if (physicalStats?.data?.height) {
      form.setValue('height', physicalStats?.data.height)
    }
    if (physicalStats?.data?.muscleMass) {
      form.setValue('muscleMass', physicalStats?.data.muscleMass)
    }
    if (physicalStats?.data?.weight) {
      form.setValue('weight', physicalStats?.data.weight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, physicalStats?.data])

  const onSubmit = async (data: CreatePhysicalStatsSchemaType) => {
    setRequestIsSending(true)
    const { age, goal, height, weight, bodyFat, muscleMass } = data

    const { success, error } = await createOrUpdatePhysicalStatsActions({
      age,
      goal,
      height,
      weight,
      bodyFat,
      muscleMass,
    })

    if (success) {
      toast.success('Informações físicas atualizadas!')
      await queryClient.invalidateQueries({ queryKey: ['findPhysicalStatsByUserId'] })
      toggle(false)
      setRequestIsSending(false)
      return
    }

    switch (error) {
      case 'Resource not found':
        toast.error('Informações fisícas não encontradas para esse usuário ou o usuário não existe!')
        break
      default:
        toast.error('Erro ao atualizar informações físicas')
        break
    }
    setRequestIsSending(false)
    return
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isLoading,
    requestIsSending,
  }
}
