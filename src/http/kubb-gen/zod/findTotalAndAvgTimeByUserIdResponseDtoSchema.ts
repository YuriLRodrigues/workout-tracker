import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindTotalAndAvgTimeByUserIdResponseDtoType } from '../types/FindTotalAndAvgTimeByUserIdResponseDtoType'

export const findTotalAndAvgTimeByUserIdResponseDtoSchema = z.object({
  avgSeconds: z.coerce.number().describe('Average time in seconds'),
  totalSeconds: z.coerce.number().describe('Total time in seconds'),
}) as unknown as ToZod<FindTotalAndAvgTimeByUserIdResponseDtoType>
