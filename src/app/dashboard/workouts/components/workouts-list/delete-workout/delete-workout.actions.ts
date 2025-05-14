'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { deleteWorkout } from '@/http/kubb-gen'

type DeleteWorkoutActionsProps = {
  id: string
}

export const deleteWorkoutActions = async ({
  id,
}: DeleteWorkoutActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { message } = await deleteWorkout({ id })

    revalidateTag('findAllWorkoutsByUserId')

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
