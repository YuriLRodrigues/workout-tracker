import { z } from 'zod'

export const signUpSchema = z
  .object({
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, { message: 'Senha inválida.' }),
    confirmPassword: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, { message: 'Senha inválida.' }),
    email: z
      .string({
        required_error: 'E-mail é obrigatório.',
      })
      .email({
        message: 'E-mail inválido.',
      }),
    name: z
      .string({
        required_error: 'Nome é obrigatório.',
      })
      .min(2, {
        message: 'Nome deve ter pelo menos 2 caracteres.',
      }),
    lastName: z
      .string({
        required_error: 'Sobrenome é obrigatório.',
      })
      .min(3, {
        message: 'Sobrenome deve ter pelo menos 3 caracteres.',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'As senhas não coincidem.',
      })
    }
  })

export type SignUpSchemaType = z.infer<typeof signUpSchema>
