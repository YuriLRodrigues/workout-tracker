import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { CreateExerciseResponseDtoType } from '../types/CreateExerciseResponseDtoType'

export const createExerciseResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<CreateExerciseResponseDtoType>
