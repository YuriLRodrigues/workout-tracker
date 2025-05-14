import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { CreatePhysicalBodyDtoType } from '../types/CreatePhysicalBodyDtoType'

export const createPhysicalBodyDtoSchema = z.object({
  height: z.coerce.number().min(30).describe('Height in centimeters'),
  weight: z.coerce.number().min(1).describe('Weight in kilograms'),
  age: z.coerce.number().min(1).max(120).describe('Age in years'),
  bodyFat: z.coerce.number().min(1).max(100).describe('Body fat percentage (optional)').nullable().nullish(),
  muscleMass: z.coerce.number().min(1).describe('Muscle mass in kilograms (optional)').nullable().nullish(),
  goal: z.coerce.string().describe('User goal, such as "Lose weight", "Gain muscle", etc.'),
}) as unknown as ToZod<CreatePhysicalBodyDtoType>
