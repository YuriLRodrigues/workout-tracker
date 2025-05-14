import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { CreateLogBodyDtoType } from '../types/CreateLogBodyDtoType'

export const createLogBodyDtoSchema = z.object({
  sessionId: z.coerce.string().describe('Unique identifier of the session').nullable().nullish(),
  averageRestTime: z.coerce.number().describe('Average rest time between sets (in seconds)'),
  maxRepeat: z.coerce.number().describe('Maximum number of repetitions achieved'),
  maxSeries: z.coerce.number().describe('Maximum number of sets achieved'),
  maxWeight: z.coerce.number().describe('Maximum weight lifted (in kilograms)'),
  effortLevel: z.coerce.number().describe('Indicates the perceived level of effort during the workout.'),
  notes: z.coerce.string().describe('Optional notes or observations about the log').optional(),
}) as unknown as ToZod<CreateLogBodyDtoType>
