'use server'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { newPassword } from '@/http/kubb-gen'

type NewPasswordActionsProps = {
  password: string
  token: string
}

export const newPasswordActions = async ({
  password,
  token,
}: NewPasswordActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { message } = await newPassword({ data: { newPassword: password }, params: { token } })

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
