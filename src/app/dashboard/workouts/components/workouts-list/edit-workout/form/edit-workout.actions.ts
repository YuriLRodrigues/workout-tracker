'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { updateWorkout } from '@/http/kubb-gen'

type EditWorkoutActionsProps = {
  workoutId: string
  color?: string
  description?: string
  icon?: string
  name?: string
}

export const editWorkoutActions = async ({
  color,
  description,
  icon,
  name,
  workoutId,
}: EditWorkoutActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { message } = await updateWorkout({ data: { color, description, icon, name }, workoutId })

    revalidateTag('findAllWorkoutsByUserId')

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
