import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { DeleteImageResponseDtoType } from '../types/DeleteImageResponseDtoType'

export const deleteImageResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<DeleteImageResponseDtoType>
