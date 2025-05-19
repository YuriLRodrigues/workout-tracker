import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { NewPasswordBodyDtoType } from '../types/NewPasswordBodyDtoType'

export const newPasswordBodyDtoSchema = z.object({
  newPassword: z.coerce.string().describe('The user password'),
}) as unknown as ToZod<NewPasswordBodyDtoType>
