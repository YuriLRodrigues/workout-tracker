'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { updateSession } from '@/http/kubb-gen'

type UpdateSessionActionsProps = {
  workoutId: string
  sessionId: string
}

export const updateSessionActions = async ({
  workoutId,
  sessionId,
}: UpdateSessionActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { message } = await updateSession({ data: { workoutId }, sessionId })

    revalidateTag('findTodayWorkoutSession')

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow error', data: null }
  }
}
