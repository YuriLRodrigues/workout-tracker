'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { ActionResponse } from '@/@types/actions'
import { CustomFetchError } from '@/@types/custom-error'
import { authToken, TokenPayload } from '@/auth'
import { signIn } from '@/http/kubb-gen'
import { AUTH_COOKIE_NAME, SIGNIN_COOKIE_MAX_AGE } from '@/utils/constants'

type SignInActionsProps = {
  email: string
  password: string
}

export const signInActions = async ({
  email,
  password,
}: SignInActionsProps): Promise<ActionResponse<TokenPayload | null>> => {
  'use server'
  try {
    const { token } = await signIn({ data: { email, password } })

    const cookiesStore = await cookies()
    cookiesStore.set(AUTH_COOKIE_NAME, token, {
      maxAge: SIGNIN_COOKIE_MAX_AGE,
      path: '/',
      httpOnly: false,
    })

    revalidateTag('me')
    const tokenPayload = await authToken()

    return { success: true, data: tokenPayload }
  } catch (error) {
    return { success: false, error: (error as CustomFetchError)?.response?.error?.error || 'Unknow Error', data: null }
  }
}
