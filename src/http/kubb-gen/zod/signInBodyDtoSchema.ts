import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { SignInBodyDtoType } from '../types/SignInBodyDtoType'

export const signInBodyDtoSchema = z.object({
  email: z.coerce.string().describe('The user email'),
  password: z.coerce.string().describe('The user password'),
}) as unknown as ToZod<SignInBodyDtoType>
