import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindTotalSeriesByWeekDtoType } from '../types/FindTotalSeriesByWeekDtoType'

export const findTotalSeriesByWeekDtoSchema = z.object({
  seriesDiff: z.coerce.number().describe('Difference in series compared to the previous week'),
  thisWeekTotal: z.coerce.number().describe('Series counting this week'),
}) as unknown as ToZod<FindTotalSeriesByWeekDtoType>
