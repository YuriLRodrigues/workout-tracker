import { z } from 'zod'

export const createWorkoutSchema = z.object({
  name: z
    .string({ required_error: 'Por favor, informe o nome do treino' })
    .max(100, 'Nome pode conter no máximo 100 caracteres'),
  description: z
    .string({ required_error: 'Por favor, informe a descrição do treino' })
    .max(255, 'Descrição pode conter no máximo 255 caracteres'),
  icon: z.string({ required_error: 'Por favor, selecione um ícone' }),
  color: z.string({ required_error: 'Por favor, selecione uma cor' }),
  bannerId: z.string().optional(),
})

export type CreateWorkoutSchemaType = z.infer<typeof createWorkoutSchema>
