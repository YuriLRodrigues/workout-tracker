import { envT3Oss } from '@/env.mjs'
import { AUTH_COOKIE_NAME } from '@/utils/constants'
import type {
  RequestConfig as RequestConfigFetch,
  ResponseConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/fetch'
import {
  useMutation,
  type UseMutationOptions,
  QueryClient,
  queryOptions,
  type SuspenseQueriesOptions,
  useSuspenseQuery,
  type QueryKey,
  type UseSuspenseQueryOptions,
  type UseSuspenseQueryResult,
  type QueryObserverOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

type RequestConfig<TVariables = unknown> = RequestConfigFetch<TVariables> & {
  next?: NextFetchRequestConfig
}

const BASE_URL = envT3Oss.NEXT_PUBLIC_API_URL || ''

function buildQueryString(params?: unknown): string {
  if (!params) return ''
  return '?' + new URLSearchParams(params as Record<string, string>).toString()
}

async function getHeaders(headers?: HeadersInit, body?: BodyInit | null | undefined): Promise<HeadersInit> {
  let authToken: string | undefined

  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')
    const serverCookies = await cookies()
    authToken = serverCookies.get(AUTH_COOKIE_NAME)?.value
  } else {
    authToken = getCookie(AUTH_COOKIE_NAME)?.toString()
  }

  const defaultHeaders: HeadersInit =
    body instanceof FormData || body instanceof URLSearchParams
      ? { Authorization: `Bearer ${authToken || ''}` }
      : {
          Authorization: `Bearer ${authToken || ''}`,
          'Content-Type': 'application/json',
        }

  return {
    ...defaultHeaders,
    ...headers,
  }
}

async function parseResponse<TData>(response: Response, responseType: RequestConfig['responseType']): Promise<TData> {
  switch (responseType) {
    case 'arraybuffer':
      return (await response.arrayBuffer()) as TData
    case 'blob':
      return (await response.blob()) as TData
    case 'document':
      return (await response.text()) as TData
    case 'text':
      return (await response.text()) as TData
    case 'stream':
      return response.body as any as TData
    case 'json':
    default:
      return (await response.json()) as TData
  }
}

const client = async <TData = unknown, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData>> => {
  const {
    url = '',
    method = 'GET',
    params,
    data,
    responseType = 'json',
    headers,
    signal,
    credentials = 'include',
    baseURL = BASE_URL,
    ...rest
  } = config

  const queryString = buildQueryString(params)
  const finalUrl = `${baseURL}${url}${queryString}`

  const body: BodyInit | undefined = data
    ? data instanceof FormData || typeof data === 'string'
      ? (data as BodyInit)
      : JSON.stringify(data)
    : undefined

  const finalHeaders = await getHeaders(headers, body)

  const res = await fetch(finalUrl, {
    method,
    body: ['GET', 'HEAD'].includes(method.toUpperCase()) ? undefined : body,
    headers: finalHeaders,
    credentials,
    signal,
    // cache: 'force-cache',
    ...rest,
  })

  if (!res.ok) {
    let errorBody: TError

    try {
      errorBody = await res.json()
    } catch {
      errorBody = {} as TError
    }

    const errorResponse = {
      error: errorBody,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    }

    const error = new Error(res.statusText) as Error & { response: ResponseErrorConfig<TError> }
    error.response = errorResponse as ResponseErrorConfig<TError>

    throw error
  }

  const responseData = await parseResponse<TData>(res, responseType)

  return {
    data: responseData,
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  }
}

export default client

export {
  type RequestConfig,
  type ResponseConfig,
  type ResponseErrorConfig,
  useMutation,
  type UseMutationOptions,
  QueryClient,
  queryOptions,
  type SuspenseQueriesOptions,
  useSuspenseQuery,
  type QueryKey,
  type UseSuspenseQueryOptions,
  type UseSuspenseQueryResult,
  type QueryObserverOptions,
  type UseQueryResult,
  useQuery,
}
