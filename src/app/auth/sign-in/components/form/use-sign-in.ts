import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { signInSchema, SignInSchemaType } from './schema'
import { signInActions } from './sign-in.actions'

export const UseSignInForm = () => {
  const router = useRouter()
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInSchemaType) => {
    const { email, password } = data

    const { success, error } = await signInActions({ email, password })

    if (success) {
      toast.success('Usuário conectado ao sistema, seja bem vindo!')
      router.replace('/')
    } else {
      switch (error) {
        case 'Invalid credentials':
          toast.error('Credenciais inválidas.')
          break
        case 'Inactive resource':
          toast.error('Usuário inativo.')
          break
        case 'Resource not found':
          toast.error('Usuário não encontrado.')
          break
        default:
          toast.error(`Falha ao accesar o usuário: ${error}`)
      }
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
  }
}
