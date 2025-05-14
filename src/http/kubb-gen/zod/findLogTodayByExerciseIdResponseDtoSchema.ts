import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindLogTodayByExerciseIdResponseDtoType } from '../types/FindLogTodayByExerciseIdResponseDtoType'

export const findLogTodayByExerciseIdResponseDtoSchema = z.object({
  id: z.coerce.string().describe('Unique identifier for the log').nullable(),
}) as unknown as ToZod<FindLogTodayByExerciseIdResponseDtoType>
