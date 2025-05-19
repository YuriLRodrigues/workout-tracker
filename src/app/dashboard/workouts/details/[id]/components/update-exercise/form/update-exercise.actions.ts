'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { ExecutionType, MuscleType } from '@/@types/exercise'
import { updateExercise } from '@/http/kubb-gen'

type UpdateExerciseActionsProps = {
  exerciseId: string
  name?: string
  description?: string
  executionType?: ExecutionType
  muscleType?: MuscleType
  targetRepetitions?: number
  targetResTime?: number
  targetSets?: number
  videoReference?: string
  bannerId?: string
}

export const updateExerciseActions = async ({
  exerciseId,
  name,
  description,
  executionType,
  muscleType,
  targetRepetitions,
  targetResTime,
  targetSets,
  videoReference,
  bannerId,
}: UpdateExerciseActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { message } = await updateExercise({
      data: {
        bannerId,
        description,
        executionType,
        muscleType,
        name,
        targetRepetitions,
        targetResTime,
        targetSets,
        videoReference,
      },
      exerciseId,
    })

    revalidateTag('findAllExercisesByWorkoutId')

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
