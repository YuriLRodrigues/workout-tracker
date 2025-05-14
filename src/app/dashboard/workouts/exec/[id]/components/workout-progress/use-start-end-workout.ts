'use client'

import { useParams } from 'next/navigation'

import { findTodayWorkoutSessionQueryKey, useFindTodayWorkoutSession } from '@/http/kubb-gen'
import { calculateElapsedTime } from '@/utils/calculate-elapsed-time'
import { useQueryClient } from '@tanstack/react-query'

import { createSessionActions } from './create-session.actions'
import { updateSessionActions } from './update-session.actions'

export const useWorkoutStartEnd = () => {
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()

  const { data: workoutHasStarted, isLoading, isSuccess } = useFindTodayWorkoutSession({ workoutId: id })

  const data = workoutHasStarted?.data

  const { formatted, totalSeconds } = calculateElapsedTime({ startTime: data?.startTime, endTime: data?.endTime })

  const createSession = async () => {
    await createSessionActions({ workoutId: id })
    await queryClient.invalidateQueries({ queryKey: findTodayWorkoutSessionQueryKey({ workoutId: id }) })
  }

  const updateSession = async (sessionId?: string) => {
    if (!sessionId) return

    await updateSessionActions({ sessionId, workoutId: id })
    await queryClient.invalidateQueries({ queryKey: findTodayWorkoutSessionQueryKey({ workoutId: id }) })
  }

  return {
    createSession,
    updateSession,
    data,
    isLoading,
    formatted,
    totalSeconds,
    isSuccess,
  }
}
