'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { ExecutionType, MuscleType } from '@/@types/exercise'
import { createExercise } from '@/http/kubb-gen'

type CreateExerciseActionsProps = {
  name: string
  description: string
  executionType: ExecutionType
  muscleType: MuscleType
  targetRepetitions: number
  targetResTime: number
  targetSets: number
  videoReference?: string
  workoutId: string
  bannerId?: string
}

export const createExerciseActions = async ({
  name,
  description,
  executionType,
  muscleType,
  targetRepetitions,
  targetResTime,
  targetSets,
  videoReference,
  workoutId,
  bannerId,
}: CreateExerciseActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { message } = await createExercise({
      workoutId,
      data: {
        name,
        description,
        executionType,
        muscleType,
        targetRepetitions,
        targetResTime,
        targetSets,
        videoReference,
        bannerId,
      },
    })

    revalidateTag('findAllExercisesByWorkoutId')

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
