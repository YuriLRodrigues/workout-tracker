import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { SwaggerResourceNotFoundDtoType } from '../types/SwaggerResourceNotFoundDtoType'

export const swaggerResourceNotFoundDtoSchema = z.object({
  message: z.coerce.string().default('Resource not found'),
  error: z.coerce.string().default('ResourceNotFoundError'),
  statusCode: z.coerce.number().default(404),
}) as unknown as ToZod<SwaggerResourceNotFoundDtoType>
