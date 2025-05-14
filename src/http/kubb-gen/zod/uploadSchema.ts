import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { UploadType } from '../types/UploadType'

export const uploadSchema = z.object({
  id: z.coerce.string().describe('Unique identifier of the image'),
  url: z.coerce.string().describe('URL of the uploaded image'),
  createdAt: z.string().datetime().describe('Creation date of the image'),
  updatedAt: z.string().datetime().describe('Last update date of the image'),
}) as unknown as ToZod<UploadType>
