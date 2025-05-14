import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { ChangeMyUserPasswordBodyDtoType } from '../types/ChangeMyUserPasswordBodyDtoType'

export const changeMyUserPasswordBodyDtoSchema = z.object({
  oldPassword: z.coerce.string().describe('The old user password'),
  newPassword: z.coerce.string().describe('The new user password'),
}) as unknown as ToZod<ChangeMyUserPasswordBodyDtoType>
