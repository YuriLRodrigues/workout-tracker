import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindAverageWorkoutByWeekDtoType } from '../types/FindAverageWorkoutByWeekDtoType'

export const findAverageWorkoutByWeekDtoSchema = z.object({
  workoutDiffCount: z.coerce.number().describe('Difference in workout compared to the previous week'),
  thisWeekCount: z.coerce.number().describe('Count of workouts this week'),
}) as unknown as ToZod<FindAverageWorkoutByWeekDtoType>
