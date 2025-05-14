import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindPhysicalStatsByUserIdResponseDtoType } from '../types/FindPhysicalStatsByUserIdResponseDtoType'
import { physicalDtoSchema } from './physicalDtoSchema'

export const findPhysicalStatsByUserIdResponseDtoSchema = z.object({
  data: z
    .lazy(() => physicalDtoSchema)
    .describe('Data found or not of the physical stats by user id')
    .nullable(),
}) as unknown as ToZod<FindPhysicalStatsByUserIdResponseDtoType>
