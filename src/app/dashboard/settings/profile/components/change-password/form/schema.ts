import { z } from 'zod'

export const phoneRegex = /^\+55\d{10,11}$/

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({ required_error: 'Campo obrigatório' })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, { message: 'Senha inválida.' }),
    newPassword: z
      .string({ required_error: 'Campo obrigatório' })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, { message: 'Senha inválida.' }),
    confirmNewPassword: z
      .string({ required_error: 'Campo obrigatório' })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, { message: 'Senha inválida.' }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmNewPassword'],
        message: 'As senhas não coincidem.',
      })
    }
  })

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>
