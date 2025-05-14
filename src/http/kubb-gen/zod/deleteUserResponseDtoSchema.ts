import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { DeleteUserResponseDtoType } from '../types/DeleteUserResponseDtoType'

export const deleteUserResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<DeleteUserResponseDtoType>
