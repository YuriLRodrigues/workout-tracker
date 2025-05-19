import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { UpdateWorkoutResponseDtoType } from '../types/UpdateWorkoutResponseDtoType'

export const updateWorkoutResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<UpdateWorkoutResponseDtoType>
