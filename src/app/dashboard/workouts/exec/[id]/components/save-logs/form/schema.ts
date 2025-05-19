import { z } from 'zod'

export const saveLogSchema = z.object({
  averageRestTime: z.coerce
    .number({
      required_error: 'Informe o tempo de descanso realizado neste exercício.',
      invalid_type_error: 'O tempo de descanso deve ser um número.',
    })
    .refine((val) => !isNaN(val), 'Informe o tempo de descanso realizado neste exercício.'),

  maxRepeat: z.coerce
    .number({
      required_error: 'Contabilize o número total de repetições.',
      invalid_type_error: 'O número de repetições deve ser um número.',
    })
    .refine((val) => !isNaN(val), 'Contabilize o número total de repetições.'),

  maxSeries: z.coerce
    .number({
      required_error: 'Contabilize o número total de séries.',
      invalid_type_error: 'O número de séries deve ser um número.',
    })
    .refine((val) => !isNaN(val), 'Contabilize o número total de séries.'),

  maxWeight: z.coerce
    .number({
      required_error: 'Informe o valor máximo realizado.',
      invalid_type_error: 'O valor máximo deve ser um número.',
    })
    .refine((val) => !isNaN(val), 'Informe o valor máximo realizado.'),

  notes: z
    .string({
      invalid_type_error: 'As observações devem ser um texto.',
    })
    .max(255, 'Notas podem conter no máximo 255 caracteres')
    .optional(),
})

export type SaveLogSchemaType = z.infer<typeof saveLogSchema>
