import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { SignUpResponseDtoType } from '../types/SignUpResponseDtoType'

export const signUpResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<SignUpResponseDtoType>
