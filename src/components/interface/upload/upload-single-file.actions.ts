'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { ImageType } from '@/@types/image'
import { envT3Oss } from '@/env.mjs'
import { AUTH_COOKIE_NAME } from '@/utils/constants'

type UploadFileResponse<T> = {
  success: boolean
  error?: Error
  data: T | Error | null
}

type UploadSingleFileActionsProps = {
  file: File
  type: ImageType
  tagToRevalidate?: string
}

export const uploadSingleFileActions = async ({
  file,
  type,
  tagToRevalidate,
}: UploadSingleFileActionsProps): Promise<UploadFileResponse<string>> => {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get(AUTH_COOKIE_NAME)?.value

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${envT3Oss.NEXT_PUBLIC_API_URL}/image/upload/${type}`, {
      method: 'POST',
      body: formData,
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

    const { url } = await response.json()

    if (tagToRevalidate) revalidateTag(tagToRevalidate)

    return { success: true, data: url }
  } catch (error) {
    return { success: false, error: error as Error, data: null }
  }
}
