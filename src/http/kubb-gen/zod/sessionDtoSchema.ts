import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { SessionDtoType } from '../types/SessionDtoType'

export const sessionDtoSchema = z.object({
  id: z.coerce.string().describe('Unique identifier of the session'),
  startTime: z.string().datetime().describe('Start time of the workout log'),
  endTime: z.string().datetime().describe('End time of the workout log').optional(),
  workoutId: z.coerce.string().describe('Unique identifier of the workout'),
  userId: z.coerce.string().describe('Unique identifier of the user'),
}) as unknown as ToZod<SessionDtoType>
