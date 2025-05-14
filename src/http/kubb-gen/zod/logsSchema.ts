import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { LogsType } from '../types/LogsType'

export const logsSchema = z.object({
  id: z.coerce.string().describe('Unique identifier for the log'),
  maxSeries: z.coerce.number().describe('Maximum number of sets performed during the exercise'),
  maxWeight: z.coerce.number().describe('Maximum weight lifted during the exercise (in kilograms)'),
  effortLevel: z.coerce.number().describe('Indicates the perceived level of effort during the workout.'),
  maxRepeat: z.coerce.number().describe('Maximum number of repetitions achieved in a single set'),
  averageRestTime: z.coerce.number().describe('Average rest time between sets (in seconds)'),
  notes: z.coerce.string().describe('Optional notes or observations about the exercise session').optional(),
  sessionId: z.coerce.string().describe('ID of the related workout session (optional)').optional(),
  exerciseId: z.coerce.string().describe('ID of the exercise being logged'),
  userId: z.coerce.string().describe('ID of the user who performed the exercise'),
  createdAt: z.string().datetime().describe('Date and time when the log was created'),
  exerciseExecutionType: z.enum(['REPETITION', 'TIME']).describe('Exercise execution type'),
}) as unknown as ToZod<LogsType>
