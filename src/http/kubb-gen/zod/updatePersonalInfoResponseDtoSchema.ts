import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { UpdatePersonalInfoResponseDtoType } from '../types/UpdatePersonalInfoResponseDtoType'

export const updatePersonalInfoResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<UpdatePersonalInfoResponseDtoType>
