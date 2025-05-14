import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { UpdateSessionBodyDtoType } from '../types/UpdateSessionBodyDtoType'

export const updateSessionBodyDtoSchema = z.object({
  workoutId: z.coerce.string().describe('WorkoutId to be found session and update'),
}) as unknown as ToZod<UpdateSessionBodyDtoType>
