'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { createLog, findTodaySessionByUserId } from '@/http/kubb-gen'

type SaveLogActionsProps = {
  averageRestTime: number
  maxRepeat: number
  maxSeries: number
  maxWeight: number
  effortLevel: number
  notes?: string
  exerciseId: string
  workoutId: string
}

export const saveLogActions = async ({
  averageRestTime,
  exerciseId,
  workoutId,
  maxRepeat,
  maxSeries,
  maxWeight,
  effortLevel,
  notes,
}: SaveLogActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { id } = await findTodaySessionByUserId({ workoutId })

    const { message } = await createLog({
      exerciseId,
      data: { averageRestTime, maxRepeat, maxSeries, maxWeight, notes, sessionId: id, effortLevel },
    })

    revalidateTag('findAllWorkoutsByUserId')
    revalidateTag('findAllLogsToday')

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
