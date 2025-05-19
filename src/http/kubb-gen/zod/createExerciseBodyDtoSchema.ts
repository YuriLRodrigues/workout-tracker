import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { CreateExerciseBodyDtoType } from '../types/CreateExerciseBodyDtoType'

export const createExerciseBodyDtoSchema = z.object({
  name: z.coerce.string().describe('The name of the exercise'),
  description: z.coerce.string().describe('A brief description of the exercise'),
  executionType: z.enum(['REPETITION', 'TIME']).describe('Type of execution: repetition or time'),
  muscleType: z
    .enum([
      'CHEST',
      'BACK',
      'BICEPS',
      'TRICEPS',
      'SHOULDERS',
      'LEGS',
      'CALVES',
      'ABS',
      'FULL_BODY',
      'GLUTES',
      'HAMSTRINGS',
      'QUADRICEPS',
      'ADDUCTORS_ABDUCTORS',
    ])
    .describe('The muscle group targeted by the exercise'),
  targetRepetitions: z.coerce.number().describe('Target number of repetitions'),
  targetResTime: z.coerce.number().describe('Target rest time between sets (in seconds)'),
  targetSets: z.coerce.number().describe('Target number of sets'),
  videoReference: z.coerce.string().describe('Optional video reference for the exercise').optional(),
  bannerId: z.coerce.string().describe('Optional banner ID associated with the exercise').optional(),
}) as unknown as ToZod<CreateExerciseBodyDtoType>
