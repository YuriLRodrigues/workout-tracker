import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { NewPasswordResponseDtoType } from '../types/NewPasswordResponseDtoType'

export const newPasswordResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<NewPasswordResponseDtoType>
