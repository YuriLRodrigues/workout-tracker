'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

import { useFindTodayWorkoutSession } from '@/http/kubb-gen'
import { calculateElapsedTime } from '@/utils/calculate-elapsed-time'
import { useQueryClient } from '@tanstack/react-query'

import { createSessionActions } from './create-session.actions'
import { updateSessionActions } from './update-session.actions'

export const useWorkoutStartEnd = () => {
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()
  const [sessionIsLoading, setSessionIsLoading] = useState<boolean>()

  const {
    data: workoutHasStarted,
    isLoading,
    isSuccess,
  } = useFindTodayWorkoutSession({ workoutId: id }, { query: { queryKey: ['findTodayWorkoutSession', id] } })

  const data = workoutHasStarted?.data

  const { formatted, totalSeconds } = calculateElapsedTime({ startTime: data?.startTime, endTime: data?.endTime })

  const createSession = async () => {
    setSessionIsLoading(true)
    await createSessionActions({ workoutId: id })
    await queryClient.refetchQueries({ queryKey: ['findTodayWorkoutSession', id] })
    setSessionIsLoading(false)
    return
  }

  const updateSession = async (sessionId?: string) => {
    if (!sessionId) return
    setSessionIsLoading(true)
    await updateSessionActions({ sessionId, workoutId: id })
    await queryClient.refetchQueries({ queryKey: ['findTodayWorkoutSession', id] })
    setSessionIsLoading(false)
    return
  }

  return {
    createSession,
    updateSession,
    data,
    isLoading,
    formatted,
    totalSeconds,
    isSuccess,
    sessionIsLoading,
  }
}
