import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { WorkoutDtoType } from '../types/WorkoutDtoType'

export const workoutDtoSchema = z.object({
  id: z.coerce.string().describe('Unique identifier for the workout'),
  userId: z.coerce.string().describe('Unique identifier for the user who created the workout'),
  name: z.coerce.string().describe('The name of the workout'),
  description: z.coerce.string().describe('A brief description of the workout'),
  icon: z.coerce.string().describe('An icon representing the workout'),
  color: z.coerce.string().describe('A color representing the workout icon'),
  bannerUrl: z.coerce.string().describe('URL of the workout banner image'),
  bannerBlurHash: z.coerce.string().describe('Blur hash representation of the banner image for preview purposes'),
  createdAt: z.coerce.string().describe('Date when the workout was created'),
  updatedAt: z.coerce.string().describe('Date when the workout was last updated').optional(),
  totalExercises: z.coerce.number().describe('Total number of exercises in the workout'),
  totalSets: z.coerce.number().describe('Total number of sets in the workout'),
  totalRepetitions: z.coerce.number().describe('Total number of repetitions in the workout'),
}) as unknown as ToZod<WorkoutDtoType>
