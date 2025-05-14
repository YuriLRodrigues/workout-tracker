import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { CreateWorkoutResponseDtoType } from '../types/CreateWorkoutResponseDtoType'

export const createWorkoutResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<CreateWorkoutResponseDtoType>
