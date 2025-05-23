'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

import { calculateElapsedTime } from '@/utils/calculate-elapsed-time'

import { createSessionActions } from './create-session.actions'
import { updateSessionActions } from './update-session.actions'

type UseWorkoutStartEndProps = {
  sessionHasStarted?: {
    startTime?: Date | string
    endTime?: Date | string
    string?: string
  } | null
}

export const useWorkoutStartEnd = ({ sessionHasStarted }: UseWorkoutStartEndProps) => {
  const { id } = useParams<{ id: string }>()
  const [sessionIsLoading, setSessionIsLoading] = useState<boolean>()

  const { formatted, totalSeconds } = calculateElapsedTime({
    startTime: sessionHasStarted?.startTime,
    endTime: sessionHasStarted?.endTime,
  })

  const createSession = async () => {
    setSessionIsLoading(true)
    await createSessionActions({ workoutId: id })
    setSessionIsLoading(false)
    return
  }

  const updateSession = async (sessionId?: string) => {
    if (!sessionId) return
    setSessionIsLoading(true)
    await updateSessionActions({ sessionId, workoutId: id })
    setSessionIsLoading(false)
    return
  }

  return {
    createSession,
    updateSession,
    formatted,
    totalSeconds,
    sessionIsLoading,
  }
}
