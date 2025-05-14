'use server'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { signUp } from '@/http/kubb-gen'

type SignUpActionsProps = {
  email: string
  password: string
  name: string
  lastName: string
}

export const signUpActions = async ({
  email,
  password,
  name,
  lastName,
}: SignUpActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    await signUp({ data: { email, name, password, lastName } })

    return { success: true, data: 'Sucesso ao registrar o usuário', error: undefined }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
