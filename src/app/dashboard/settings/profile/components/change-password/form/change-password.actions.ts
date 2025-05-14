'use server'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { changeMyUserPassword } from '@/http/kubb-gen'

type ChangePasswordActionsProps = {
  oldPassword: string
  newPassword: string
}

export const changePasswordActions = async ({
  newPassword,
  oldPassword,
}: ChangePasswordActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { message } = await changeMyUserPassword({ data: { newPassword, oldPassword } })

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
