import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindTotalLoadByWeekDtoType } from '../types/FindTotalLoadByWeekDtoType'

export const findTotalLoadByWeekDtoSchema = z.object({
  loadDiff: z.coerce.number().describe('Difference in load compared to the previous week'),
  thisWeekTotal: z.coerce.number().describe('Load counting this week'),
}) as unknown as ToZod<FindTotalLoadByWeekDtoType>
