import { ExecutionType, MuscleType } from '@/@types/exercise'
import { z } from 'zod'

export const createExerciseSchema = z.object({
  name: z.string({
    required_error: 'O nome do exercício é obrigatório.',
    invalid_type_error: 'O nome do exercício deve ser um texto.',
  }),
  description: z.string({
    required_error: 'A descrição do exercício precisa ser informada.',
    invalid_type_error: 'A descrição do exercício deve ser um texto.',
  }),
  executionType: z.nativeEnum(ExecutionType, {
    required_error: 'Selecione o tipo de execução do exercício.',
    invalid_type_error: 'O tipo de execução selecionado é inválido.',
  }),
  muscleType: z.nativeEnum(MuscleType, {
    required_error: 'Selecione o grupo muscular trabalhado.',
    invalid_type_error: 'O grupo muscular selecionado é inválido.',
  }),
  targetRepetitions: z.coerce.number({
    required_error: 'Informe o número de repetições alvo.',
    invalid_type_error: 'O número de repetições deve ser um número.',
  }),
  targetResTime: z.coerce.number({
    required_error: 'Informe o tempo de descanso entre séries.',
    invalid_type_error: 'O tempo de descanso deve ser um número.',
  }),
  targetSets: z.coerce.number({
    required_error: 'Informe o número de séries alvo.',
    invalid_type_error: 'O número de séries deve ser um número.',
  }),
  videoReference: z.string().optional(),
  bannerId: z.string().optional(),
})

export type CreateExerciseSchemaType = z.infer<typeof createExerciseSchema>
