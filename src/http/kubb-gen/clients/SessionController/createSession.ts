import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  CreateSessionMutationResponseType,
  CreateSessionPathParamsType,
  CreateSession400Type,
  CreateSession404Type,
} from '../../types/CreateSessionType'

function getCreateSessionUrl({ workoutId }: { workoutId: CreateSessionPathParamsType['workoutId'] }) {
  return `/session/${workoutId}` as const
}

/**
 * {@link /session/:workoutId}
 */
export async function createSession(
  { workoutId }: { workoutId: CreateSessionPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    CreateSessionMutationResponseType,
    ResponseErrorConfig<CreateSession400Type | CreateSession404Type>,
    unknown
  >({
    method: 'POST',
    url: getCreateSessionUrl({ workoutId }).toString(),
    ...requestConfig,
  })
  return res.data
}
