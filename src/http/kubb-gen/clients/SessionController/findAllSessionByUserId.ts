import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindAllSessionByUserIdQueryResponseType,
  FindAllSessionByUserIdPathParamsType,
  FindAllSessionByUserId400Type,
  FindAllSessionByUserId404Type,
} from '../../types/FindAllSessionByUserIdType'

function getFindAllSessionByUserIdUrl({
  page,
  limit,
}: {
  page: FindAllSessionByUserIdPathParamsType['page']
  limit: FindAllSessionByUserIdPathParamsType['limit']
}) {
  return `/session/all` as const
}

/**
 * {@link /session/all}
 */
export async function findAllSessionByUserId(
  {
    page,
    limit,
  }: { page: FindAllSessionByUserIdPathParamsType['page']; limit: FindAllSessionByUserIdPathParamsType['limit'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindAllSessionByUserIdQueryResponseType,
    ResponseErrorConfig<FindAllSessionByUserId400Type | FindAllSessionByUserId404Type>,
    unknown
  >({ method: 'GET', url: getFindAllSessionByUserIdUrl({ page, limit }).toString(), ...requestConfig })
  return res.data
}
