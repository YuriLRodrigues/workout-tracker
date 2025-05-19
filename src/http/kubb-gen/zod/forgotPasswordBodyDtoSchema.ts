import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { ForgotPasswordBodyDtoType } from '../types/ForgotPasswordBodyDtoType'

export const forgotPasswordBodyDtoSchema = z.object({
  email: z.coerce.string().describe('The user email'),
}) as unknown as ToZod<ForgotPasswordBodyDtoType>
