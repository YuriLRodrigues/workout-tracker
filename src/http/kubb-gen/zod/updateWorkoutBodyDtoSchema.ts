import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { UpdateWorkoutBodyDtoType } from '../types/UpdateWorkoutBodyDtoType'

export const updateWorkoutBodyDtoSchema = z.object({
  name: z.coerce.string().describe('The name of the workout').optional(),
  description: z.coerce.string().describe('A brief description of the workout').optional(),
  icon: z.coerce.string().describe('An icon representing the workout').optional(),
  color: z.coerce.string().describe('An color representing the workout icon').optional(),
}) as unknown as ToZod<UpdateWorkoutBodyDtoType>
