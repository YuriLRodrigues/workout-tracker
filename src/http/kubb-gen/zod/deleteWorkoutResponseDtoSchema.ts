import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { DeleteWorkoutResponseDtoType } from '../types/DeleteWorkoutResponseDtoType'

export const deleteWorkoutResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<DeleteWorkoutResponseDtoType>
