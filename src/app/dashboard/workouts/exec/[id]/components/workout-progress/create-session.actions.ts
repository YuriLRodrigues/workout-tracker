'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { createSession } from '@/http/kubb-gen'

type CreateSessionActionsProps = {
  workoutId: string
}

export const createSessionActions = async ({
  workoutId,
}: CreateSessionActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { message } = await createSession({ workoutId })

    revalidateTag('findTodayWorkoutSession')

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow error', data: null }
  }
}
