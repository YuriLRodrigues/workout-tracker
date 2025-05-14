import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindSessionTodayByUserIdResponseDtoType } from '../types/FindSessionTodayByUserIdResponseDtoType'

export const findSessionTodayByUserIdResponseDtoSchema = z.object({
  id: z.coerce.string().describe('Unique identifier of the session').nullable(),
}) as unknown as ToZod<FindSessionTodayByUserIdResponseDtoType>
