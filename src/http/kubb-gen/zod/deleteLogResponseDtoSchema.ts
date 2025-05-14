import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { DeleteLogResponseDtoType } from '../types/DeleteLogResponseDtoType'

export const deleteLogResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<DeleteLogResponseDtoType>
