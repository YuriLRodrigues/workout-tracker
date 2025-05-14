import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { CreateSessionResponseDtoType } from '../types/CreateSessionResponseDtoType'

export const createSessionResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<CreateSessionResponseDtoType>
