import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { SwaggerNotAllowedDtoType } from '../types/SwaggerNotAllowedDtoType'

export const swaggerNotAllowedDtoSchema = z.object({
  message: z.coerce.string().default('Not allowed'),
  error: z.coerce.string().default('NotAllowedError'),
  statusCode: z.coerce.number().default(403),
}) as unknown as ToZod<SwaggerNotAllowedDtoType>
