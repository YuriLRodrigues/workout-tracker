import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { MeDtoType } from '../types/MeDtoType'

export const meDtoSchema = z.object({
  id: z.coerce.string().describe('User ID'),
  role: z.coerce.string().describe('User role'),
  name: z.coerce.string().describe('User name'),
  lastName: z.coerce.string().describe('User last name'),
  email: z.coerce.string().describe('User email'),
  phone: z.coerce.string().describe('User phone number').nullable().nullish(),
  birthDate: z.string().datetime().describe('User birth date (YYYY-MM-DD)').nullable().nullish(),
  gender: z
    .enum(['MALE', 'FEMALE', 'NON_BINARY', 'TRANSGENDER', 'PREFER_NOT_TO_SAY', 'OTHER'])
    .describe('User gender')
    .nullable()
    .nullish(),
  avatar: z.coerce.string().describe('Avatar image URL').nullable().nullish(),
  blurHash: z.coerce.string().describe('BlurHash for avatar image').nullable().nullish(),
  createdAt: z.string().datetime().describe('Date the user was created'),
}) as unknown as ToZod<MeDtoType>
