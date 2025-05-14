import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { UpdateSessionResponseDtoType } from '../types/UpdateSessionResponseDtoType'

export const updateSessionResponseDtoSchema = z.object({
  message: z.coerce.string().describe('Api response message according to request'),
}) as unknown as ToZod<UpdateSessionResponseDtoType>
