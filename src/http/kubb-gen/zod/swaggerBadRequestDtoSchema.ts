import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { SwaggerBadRequestDtoType } from '../types/SwaggerBadRequestDtoType'

export const swaggerBadRequestDtoSchema = z.object({
  message: z.coerce.string().default('Bad request'),
  error: z.coerce.string().default('BadRequestError'),
  statusCode: z.coerce.number().default(400),
}) as unknown as ToZod<SwaggerBadRequestDtoType>
