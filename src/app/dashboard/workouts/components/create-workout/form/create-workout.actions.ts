'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { createWorkout } from '@/http/kubb-gen'

type CreateWorkoutActionsProps = {
  bannerId?: string
  color: string
  description: string
  icon: string
  name: string
}

export const createWorkoutActions = async ({
  bannerId,
  color,
  description,
  icon,
  name,
}: CreateWorkoutActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { message } = await createWorkout({ data: { color, description, icon, name, bannerId } })

    revalidateTag('findAllWorkoutsByUserId')

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
