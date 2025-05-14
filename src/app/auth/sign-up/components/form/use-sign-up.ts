import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { signUpSchema, SignUpSchemaType } from './schema'
import { signUpActions } from './sign-up.actions'

export const UseSignUpForm = () => {
  const router = useRouter()

  const form = useForm<SignUpSchemaType>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
      name: undefined,
      confirmPassword: undefined,
      lastName: undefined,
    },
  })

  async function onSubmit(data: SignUpSchemaType) {
    const { email, password, name, lastName } = data

    const { success, error } = await signUpActions({ email, password, name, lastName })

    if (success) {
      toast.success('Usuário criado com sucesso! Realize o seu login')
      router.replace('/auth/sign-in')
    } else {
      switch (error) {
        case 'Resource already exists':
          toast.error('E-mail ou nome de usuário já em uso.')
          break
        default:
          toast.error(`Falha ao accesar o usuário: ${error}`)
      }
    }
  }

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
