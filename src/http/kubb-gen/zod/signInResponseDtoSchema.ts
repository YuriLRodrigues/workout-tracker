import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { SignInResponseDtoType } from '../types/SignInResponseDtoType'

export const signInResponseDtoSchema = z.object({
  token: z.coerce.string().describe('Bearer token for authorization'),
}) as unknown as ToZod<SignInResponseDtoType>
