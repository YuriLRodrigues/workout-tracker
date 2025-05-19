import { z } from 'zod'

export const signInSchema = z.object({
  password: z
    .string({ required_error: 'Senha é obrigatória.' })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, { message: 'Senha inválida.' }),
  email: z
    .string({
      required_error: 'E-mail é obrigatório.',
    })
    .email({
      message: 'E-mail inválido.',
    }),
})

export type SignInSchemaType = z.infer<typeof signInSchema>
