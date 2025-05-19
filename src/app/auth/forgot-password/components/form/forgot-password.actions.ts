'use server'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { forgotPassword } from '@/http/kubb-gen'

type ForgotPasswordActionsProps = {
  email: string
}

export const forgotPasswordActions = async ({
  email,
}: ForgotPasswordActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { message } = await forgotPassword({ data: { email } })

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
