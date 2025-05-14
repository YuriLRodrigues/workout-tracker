import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { SignUpBodyDtoType } from '../types/SignUpBodyDtoType'

export const signUpBodyDtoSchema = z.object({
  email: z.coerce.string().describe('The user email'),
  name: z.coerce.string().describe("The user's first name"),
  lastName: z.coerce.string().describe("The user's last name"),
  password: z.coerce.string().describe('The user password'),
}) as unknown as ToZod<SignUpBodyDtoType>
