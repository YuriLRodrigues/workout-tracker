import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { CreateLogResponseDtoType } from '../types/CreateLogResponseDtoType'

export const createLogResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<CreateLogResponseDtoType>
