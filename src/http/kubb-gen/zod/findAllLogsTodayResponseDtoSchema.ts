import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindAllLogsTodayResponseDtoType } from '../types/FindAllLogsTodayResponseDtoType'

export const findAllLogsTodayResponseDtoSchema = z.object({
  totalCompleted: z.coerce.number().describe('Total of logs completed today'),
  totalExercises: z.coerce.number().describe('Total of exercises in workout'),
}) as unknown as ToZod<FindAllLogsTodayResponseDtoType>
