import { UserGender } from '@/@types/user'
import { z } from 'zod'

export const phoneRegex = /^\+55\d{10,11}$/

export const updatePersonalInfoSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Nome deve conter apenas caracteres válidos',
    })
    .min(1, 'Nome deve ter pelo menos 1 caractere')
    .optional(),

  lastName: z
    .string({
      invalid_type_error: 'Sobrenome deve conter apenas caracteres válidos',
    })
    .min(1, 'Sobrenome deve ter pelo menos 1 caractere')
    .optional(),

  phone: z
    .string({
      invalid_type_error: 'Telefone deve conter apenas números',
    })
    .regex(phoneRegex, 'Telefone inválido.')
    .optional(),

  birthDate: z
    .date({
      invalid_type_error: 'Data de nascimento inválida',
    })
    .refine((val) => !isNaN(val.getTime()), {
      message: 'Data inválida',
      path: ['birthDate'],
    })
    .optional(),

  gender: z
    .nativeEnum(UserGender, {
      invalid_type_error: 'Gênero inválido',
    })
    .optional(),
})

export type UpdatePersonalInfoSchemaType = z.infer<typeof updatePersonalInfoSchema>
