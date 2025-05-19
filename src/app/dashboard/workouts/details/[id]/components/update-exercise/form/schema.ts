import { ExecutionType, MuscleType } from '@/@types/exercise'
import { z } from 'zod'

export const updateExerciseSchema = z.object({
  name: z
    .string({
      required_error: 'O nome do exercício é obrigatório.',
      invalid_type_error: 'O nome do exercício deve ser um texto.',
    })
    .max(100, 'Nome pode conter no máximo 100 caracteres')
    .optional(),
  description: z
    .string({
      required_error: 'A descrição do exercício precisa ser informada.',
      invalid_type_error: 'A descrição do exercício deve ser um texto.',
    })
    .max(255, 'Descrição pode conter no máximo 255 caracteres')
    .optional(),
  executionType: z
    .nativeEnum(ExecutionType, {
      required_error: 'Selecione o tipo de execução do exercício.',
      invalid_type_error: 'O tipo de execução selecionado é inválido.',
    })
    .optional(),
  muscleType: z
    .nativeEnum(MuscleType, {
      required_error: 'Selecione o grupo muscular trabalhado.',
      invalid_type_error: 'O grupo muscular selecionado é inválido.',
    })
    .optional(),
  targetRepetitions: z.coerce
    .number({
      required_error: 'Informe o número de repetições alvo.',
      invalid_type_error: 'O número de repetições deve ser um número.',
    })
    .optional(),
  targetResTime: z.coerce
    .number({
      required_error: 'Informe o tempo de descanso entre séries.',
      invalid_type_error: 'O tempo de descanso deve ser um número.',
    })
    .optional(),
  targetSets: z.coerce
    .number({
      required_error: 'Informe o número de séries alvo.',
      invalid_type_error: 'O número de séries deve ser um número.',
    })
    .optional(),
  videoReference: z.string().max(255, 'A referência de vídeo só pode conter no máximo 255 caracteres').optional(),
  bannerId: z.string().optional(),
})

export type UpdateExerciseSchemaType = z.infer<typeof updateExerciseSchema>
