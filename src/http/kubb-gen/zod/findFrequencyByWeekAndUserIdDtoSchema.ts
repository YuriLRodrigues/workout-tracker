import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindFrequencyByWeekAndUserIdDtoType } from '../types/FindFrequencyByWeekAndUserIdDtoType'

export const findFrequencyByWeekAndUserIdDtoSchema = z.object({
  frequency: z.coerce.number().describe('Average frequency by week'),
}) as unknown as ToZod<FindFrequencyByWeekAndUserIdDtoType>
