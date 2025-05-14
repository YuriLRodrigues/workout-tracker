import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindTodayWorkoutSessionResponseDtoType } from '../types/FindTodayWorkoutSessionResponseDtoType'
import { sessionDtoSchema } from './sessionDtoSchema'

export const findTodayWorkoutSessionResponseDtoSchema = z.object({
  data: z
    .lazy(() => sessionDtoSchema)
    .describe('Data found or not of the today session')
    .nullable(),
}) as unknown as ToZod<FindTodayWorkoutSessionResponseDtoType>
