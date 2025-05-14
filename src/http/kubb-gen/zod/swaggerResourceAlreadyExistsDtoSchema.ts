import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { SwaggerResourceAlreadyExistsDtoType } from '../types/SwaggerResourceAlreadyExistsDtoType'

export const swaggerResourceAlreadyExistsDtoSchema = z.object({
  message: z.coerce.string().default('Resource already exists'),
  error: z.coerce.string().default('ResourceAlweadyExistsError'),
  statusCode: z.coerce.number().default(409),
}) as unknown as ToZod<SwaggerResourceAlreadyExistsDtoType>
