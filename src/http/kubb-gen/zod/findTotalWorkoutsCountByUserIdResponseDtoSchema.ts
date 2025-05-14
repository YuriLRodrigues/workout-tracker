import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { FindTotalWorkoutsCountByUserIdResponseDtoType } from '../types/FindTotalWorkoutsCountByUserIdResponseDtoType'

export const findTotalWorkoutsCountByUserIdResponseDtoSchema = z.object({
  totalCount: z.coerce.number().describe('Total count of workouts'),
  since: z.string().datetime().describe('Date of the first training session').nullable(),
}) as unknown as ToZod<FindTotalWorkoutsCountByUserIdResponseDtoType>
