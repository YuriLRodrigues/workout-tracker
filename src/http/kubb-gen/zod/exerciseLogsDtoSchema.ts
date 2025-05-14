import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { ExerciseLogsDtoType } from '../types/ExerciseLogsDtoType'

export const exerciseLogsDtoSchema = z.object({
  id: z.coerce.string().describe('Unique identifier of the log'),
  maxRepeat: z.coerce.number().describe('Highest number of repetitions achieved'),
  maxSeries: z.coerce.number().describe('Highest number of sets achieved'),
  averageRestTime: z.coerce.number().describe('Average rest time between sets (in seconds)'),
  notes: z.coerce.string().describe('Additional notes or observations about the exercise log'),
  createdAt: z.string().datetime().describe('Timestamp when the log was created'),
}) as unknown as ToZod<ExerciseLogsDtoType>
