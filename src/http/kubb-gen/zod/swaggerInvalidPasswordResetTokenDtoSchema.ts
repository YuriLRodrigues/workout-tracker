import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { SwaggerInvalidPasswordResetTokenDtoType } from '../types/SwaggerInvalidPasswordResetTokenDtoType'

export const swaggerInvalidPasswordResetTokenDtoSchema = z.object({
  message: z.coerce.string().default('Invalid password to reset token'),
  statusCode: z.coerce.number().default(401),
}) as unknown as ToZod<SwaggerInvalidPasswordResetTokenDtoType>
