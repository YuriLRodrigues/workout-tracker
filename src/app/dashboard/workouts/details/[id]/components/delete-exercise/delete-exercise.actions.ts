'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { deleteExercise } from '@/http/kubb-gen'

type DeleteExerciseActionsProps = {
  id: string
}

export const deleteExerciseActions = async ({
  id,
}: DeleteExerciseActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { message } = await deleteExercise({ id })

    revalidateTag('findAllExercisesByWorkoutId')

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
