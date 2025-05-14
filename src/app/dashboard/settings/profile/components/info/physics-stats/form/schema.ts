import { z } from 'zod'

export const createPhysicalStatsSchema = z.object({
  height: z.coerce
    .number({
      required_error: 'Altura é obrigatória',
      invalid_type_error: 'Altura deve ser um número',
    })
    .positive('Altura deve ser positiva'),

  weight: z.coerce
    .number({
      required_error: 'Peso é obrigatório',
      invalid_type_error: 'Peso deve ser um número',
    })
    .positive('Peso deve ser positivo'),

  age: z.coerce
    .number({
      required_error: 'Idade é obrigatória',
      invalid_type_error: 'Idade deve ser um número',
    })
    .min(1, 'Idade deve ser no mínimo 1')
    .max(120, 'Idade deve ser no máximo 120'),

  bodyFat: z.coerce
    .number({
      invalid_type_error: 'Percentual de gordura corporal deve ser um número',
    })
    .min(1, 'Mínimo 1% de gordura corporal')
    .max(100, 'Máximo 100% de gordura corporal')
    .optional(),

  muscleMass: z.coerce
    .number({
      invalid_type_error: 'Massa muscular deve ser um número',
    })
    .positive('Massa muscular deve ser positiva')
    .optional(),

  goal: z
    .string({
      required_error: 'Objetivo é obrigatório',
      invalid_type_error: 'Objetivo deve ser uma string',
    })
    .min(1, 'Objetivo não pode estar vazio'),
})

export type CreatePhysicalStatsSchemaType = z.infer<typeof createPhysicalStatsSchema>
