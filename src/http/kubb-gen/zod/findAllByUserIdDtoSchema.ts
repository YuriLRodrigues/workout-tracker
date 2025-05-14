import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindAllByUserIdDtoType } from '../types/FindAllByUserIdDtoType'

export const findAllByUserIdDtoSchema = z.object({
  id: z.coerce.string().describe('Unique identifier of the session'),
  startTime: z.string().datetime().describe('Start time of the session'),
  endTime: z.string().datetime().describe('End time of the session'),
  color: z.coerce.string().describe('Color associated with the session'),
  icon: z.coerce.string().describe('Icon representing the session'),
  workoutName: z.coerce.string().describe('Name of the workout'),
  workoutDescription: z.coerce.string().describe('Description of the workout'),
  workoutId: z.coerce.string().describe('Unique identifier of the workout'),
}) as unknown as ToZod<FindAllByUserIdDtoType>
