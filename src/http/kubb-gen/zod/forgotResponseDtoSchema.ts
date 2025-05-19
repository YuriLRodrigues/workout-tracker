import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { ForgotResponseDtoType } from '../types/ForgotResponseDtoType'

export const forgotResponseDtoSchema = z.object({
  message: z.coerce.string().default('Password recovery sent to your email'),
}) as unknown as ToZod<ForgotResponseDtoType>
