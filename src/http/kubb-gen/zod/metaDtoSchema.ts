import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { MetaDtoType } from '../types/MetaDtoType'

export const metaDtoSchema = z.object({
  page: z.coerce.number().describe('Page index'),
  perPage: z.coerce.number().describe('Total itens per page'),
  totalCount: z.coerce.number().describe('Total itens found in database'),
  totalPages: z.coerce.number().describe('Total pages found in database'),
}) as unknown as ToZod<MetaDtoType>
