import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  UpdateSessionMutationRequestType,
  UpdateSessionMutationResponseType,
  UpdateSessionPathParamsType,
  UpdateSession400Type,
  UpdateSession403Type,
  UpdateSession404Type,
} from '../../types/UpdateSessionType'

function getUpdateSessionUrl({ sessionId }: { sessionId: UpdateSessionPathParamsType['sessionId'] }) {
  return `/session/${sessionId}` as const
}

/**
 * {@link /session/:sessionId}
 */
export async function updateSession(
  { sessionId, data }: { sessionId: UpdateSessionPathParamsType['sessionId']; data: UpdateSessionMutationRequestType },
  config: Partial<RequestConfig<UpdateSessionMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    UpdateSessionMutationResponseType,
    ResponseErrorConfig<UpdateSession400Type | UpdateSession403Type | UpdateSession404Type>,
    UpdateSessionMutationRequestType
  >({ method: 'PATCH', url: getUpdateSessionUrl({ sessionId }).toString(), data, ...requestConfig })
  return res.data
}
