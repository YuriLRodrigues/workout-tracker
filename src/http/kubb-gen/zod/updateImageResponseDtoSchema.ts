import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { UpdateImageResponseDtoType } from '../types/UpdateImageResponseDtoType'

export const updateImageResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<UpdateImageResponseDtoType>
