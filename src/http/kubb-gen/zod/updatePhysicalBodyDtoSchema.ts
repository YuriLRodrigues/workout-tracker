import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { UpdatePhysicalBodyDtoType } from '../types/UpdatePhysicalBodyDtoType'

export const updatePhysicalBodyDtoSchema = z.object({
  height: z.coerce.number().min(30).describe('Height in centimeters').nullable().nullish(),
  weight: z.coerce.number().min(1).describe('Weight in kilograms').nullable().nullish(),
  age: z.coerce.number().min(1).max(120).describe('Age in years').nullable().nullish(),
  bodyFat: z.coerce.number().min(1).max(100).describe('Body fat percentage (optional)').nullable().nullish(),
  muscleMass: z.coerce.number().min(1).describe('Muscle mass in kilograms (optional)').nullable().nullish(),
  goal: z.coerce.string().describe('User goal, such as "Lose weight", "Gain muscle", etc.').nullable().nullish(),
}) as unknown as ToZod<UpdatePhysicalBodyDtoType>
