'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { createPhysical, findPhysicalStatsByUserId, updatePhysical } from '@/http/kubb-gen'

type CreateOrUpdatePhysicalStatsActionsProps = {
  height: number
  weight: number
  age: number
  bodyFat?: number
  muscleMass?: number
  goal: string
}

export const createOrUpdatePhysicalStatsActions = async ({
  age,
  goal,
  height,
  weight,
  bodyFat,
  muscleMass,
}: CreateOrUpdatePhysicalStatsActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { data } = await findPhysicalStatsByUserId({
      next: { revalidate: 600, tags: ['findPhysicalStatsByUserId'] },
    })

    if (data) {
      const { message } = await updatePhysical({ data: { age, goal, height, weight, bodyFat, muscleMass } })

      return { success: true, data: message }
    }

    const { message } = await createPhysical({ data: { age, goal, height, weight, bodyFat, muscleMass } })
    revalidateTag('findPhysicalStatsByUserId')

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
