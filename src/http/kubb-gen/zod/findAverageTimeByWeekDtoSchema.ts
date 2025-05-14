import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindAverageTimeByWeekDtoType } from '../types/FindAverageTimeByWeekDtoType'

export const findAverageTimeByWeekDtoSchema = z.object({
  timeDiffSeconds: z.coerce.number().describe('Difference in seconds compared to the previous week'),
  totalThisWeekSeconds: z.coerce.number().describe('Total seconds accumulated this week'),
}) as unknown as ToZod<FindAverageTimeByWeekDtoType>
