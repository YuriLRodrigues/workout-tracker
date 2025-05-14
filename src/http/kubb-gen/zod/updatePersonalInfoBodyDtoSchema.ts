import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { UpdatePersonalInfoBodyDtoType } from '../types/UpdatePersonalInfoBodyDtoType'

export const updatePersonalInfoBodyDtoSchema = z.object({
  name: z.coerce.string().describe("The user's first name").optional(),
  lastName: z.coerce.string().describe("The user's last name").optional(),
  phone: z.coerce.string().describe('The user phone number').optional(),
  birthDate: z.string().datetime().describe('The user birth date (YYYY-MM-DD)').optional(),
  gender: z
    .enum(['MALE', 'FEMALE', 'NON_BINARY', 'TRANSGENDER', 'PREFER_NOT_TO_SAY', 'OTHER'])
    .describe('The user gender')
    .optional(),
}) as unknown as ToZod<UpdatePersonalInfoBodyDtoType>
