import { z } from 'zod'

export const editWorkoutSchema = z.object({
  name: z
    .string({ required_error: 'Por favor, informe o nome do treino' })
    .max(100, 'Nome pode conter no máximo 100 caracteres')
    .optional(),
  description: z
    .string({ required_error: 'Por favor, informe a descrição do treino' })
    .max(255, 'Descrição pode conter no máximo 255 caracteres')
    .optional(),
  icon: z.string({ required_error: 'Por favor, selecione um ícone' }).optional(),
  color: z.string({ required_error: 'Por favor, selecione uma cor' }).optional(),
  bannerId: z.string().optional(),
})

export type EditWorkoutSchemaType = z.infer<typeof editWorkoutSchema>
