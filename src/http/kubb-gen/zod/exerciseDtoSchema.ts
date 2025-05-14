import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { ExerciseDtoType } from '../types/ExerciseDtoType'
import { exerciseLogsDtoSchema } from './exerciseLogsDtoSchema'

export const exerciseDtoSchema = z.object({
  id: z.coerce.string().describe('Unique identifier for the exercise'),
  name: z.coerce.string().describe('The name of the exercise'),
  description: z.coerce.string().describe('A brief description of the exercise'),
  muscleType: z
    .enum(['CHEST', 'BACK', 'BICEPS', 'TRICEPS', 'SHOULDERS', 'LEGS', 'CALVES', 'ABS', 'FULL_BODY'])
    .describe('The muscle group targeted by the exercise'),
  executionType: z.enum(['REPETITION', 'TIME']).describe('Type of execution for the exercise (REPETITION or TIME)'),
  targetSets: z.coerce.number().describe('Target number of sets'),
  targetResTime: z.coerce.number().describe('Target rest time between sets (in seconds)'),
  targetRepetitions: z.coerce.number().describe('Target number of repetitions'),
  maxWeight: z.coerce.number().describe('Max weight of exercise'),
  lastWeight: z.coerce.number().describe('Last weight of exercise'),
  videoReference: z.coerce.string().describe('Optional video reference URL for the exercise').optional(),
  userId: z.coerce.string().describe('ID of the user who created the exercise'),
  workoutId: z.coerce.string().describe('ID of the workout this exercise belongs to'),
  logs: z.array(z.lazy(() => exerciseLogsDtoSchema)).describe('List of logs related to the exercise'),
  createdAt: z.string().datetime().describe('Date when the exercise was created'),
  updatedAt: z.string().datetime().describe('Date when the exercise was last updated').optional(),
}) as unknown as ToZod<ExerciseDtoType>
