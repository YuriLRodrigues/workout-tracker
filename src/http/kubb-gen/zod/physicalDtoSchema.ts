import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { PhysicalDtoType } from '../types/PhysicalDtoType'

export const physicalDtoSchema = z.object({
  height: z.coerce.number().describe('User height in centimeters'),
  weight: z.coerce.number().describe('User weight in kilograms'),
  age: z.coerce.number().describe('User age in years'),
  bodyFat: z.coerce.number().describe('User body fat percentage').nullable().nullish(),
  muscleMass: z.coerce.number().describe('User muscle mass in kilograms').nullable().nullish(),
  goal: z.coerce.string().describe('User fitness goal'),
  userId: z.coerce.string().describe('User unique identifier'),
  createdAt: z.string().datetime().describe('Record creation timestamp'),
  updatedAt: z.string().datetime().describe('Record last update timestamp').nullable().nullish(),
}) as unknown as ToZod<PhysicalDtoType>
