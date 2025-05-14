import { cookies } from 'next/headers'

import { UserGender } from '@/@types/user'
import { envT3Oss } from '@/env.mjs'
import { AUTH_COOKIE_NAME } from '@/utils/constants'

type UpdatePersonalInfoBodyProps = {
  name?: string
  lastName?: string
  phone?: string
  birthDate?: Date
  gender?: UserGender
}

type UpdatePersonalInfoDataProps = UpdatePersonalInfoBodyProps

export type UpdatePersonalInfoResponseProps = {
  message: string
}

export const updatePersonalInfo = async (
  data: UpdatePersonalInfoDataProps,
): Promise<UpdatePersonalInfoResponseProps> => {
  const { birthDate, gender, lastName, name, phone } = data

  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get(AUTH_COOKIE_NAME)?.value

    const response = await fetch(`${envT3Oss.NEXT_PUBLIC_API_URL}/user/personal-info`, {
      method: 'PATCH',
      body: JSON.stringify({
        birthDate,
        gender,
        lastName,
        name,
        phone,
      }),
      headers: {
        Authorization: `Bearer ${authToken || ''}`,
      },
    })

    if (!response.ok) {
      const errorBody = await response.json()

      const errorResponse = {
        error: errorBody,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      }

      throw new Error(errorResponse.statusText)
    }

    const { message } = (await response.json()) as UpdatePersonalInfoResponseProps

    return { message }
  } catch (error) {
    const _error = error as Error
    throw new Error(_error.message || _error.name)
  }
}
