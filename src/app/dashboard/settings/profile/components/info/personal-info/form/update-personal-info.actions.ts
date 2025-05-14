'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { UserGender } from '@/@types/user'
import { updatePersonalInfo } from '@/http/kubb-gen'

type UpdatePersonalInfoActionsProps = {
  name?: string
  lastName?: string
  phone?: string
  birthDate?: Date
  gender?: UserGender
}

export const updatePersonalInfoActions = async ({
  name,
  birthDate,
  gender,
  lastName,
  phone,
}: UpdatePersonalInfoActionsProps): Promise<ActionResponse<string | null>> => {
  'use server'
  try {
    const { message } = await updatePersonalInfo({ data: { name, birthDate, gender, lastName, phone } })

    revalidateTag('me')

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
