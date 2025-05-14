import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { PaginatedDtoType } from '../types/PaginatedDtoType'
import { metaDtoSchema } from './metaDtoSchema'

export const paginatedDtoSchema = z.object({
  meta: z.lazy(() => metaDtoSchema).describe('Metadata of the data found'),
}) as unknown as ToZod<PaginatedDtoType>
