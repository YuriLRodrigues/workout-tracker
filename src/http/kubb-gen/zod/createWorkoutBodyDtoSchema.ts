import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { CreateWorkoutBodyDtoType } from '../types/CreateWorkoutBodyDtoType'

export const createWorkoutBodyDtoSchema = z.object({
  name: z.coerce.string().describe('The name of the workout'),
  description: z.coerce.string().describe('A brief description of the workout'),
  icon: z.coerce.string().describe('An icon representing the workout'),
  color: z.coerce.string().describe('An color representing the workout icon'),
  bannerId: z.coerce.string().describe('Optional banner ID associated with the workout').optional(),
}) as unknown as ToZod<CreateWorkoutBodyDtoType>
