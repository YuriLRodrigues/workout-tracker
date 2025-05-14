import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindWorkoutsHistoryByUserIdQueryResponseType,
  FindWorkoutsHistoryByUserIdQueryParamsType,
  FindWorkoutsHistoryByUserId400Type,
  FindWorkoutsHistoryByUserId404Type,
} from '../../types/FindWorkoutsHistoryByUserIdType'

function getFindWorkoutsHistoryByUserIdUrl() {
  return `/workout/history` as const
}

/**
 * {@link /workout/history}
 */
export async function findWorkoutsHistoryByUserId(
  { params }: { params?: FindWorkoutsHistoryByUserIdQueryParamsType },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindWorkoutsHistoryByUserIdQueryResponseType,
    ResponseErrorConfig<FindWorkoutsHistoryByUserId400Type | FindWorkoutsHistoryByUserId404Type>,
    unknown
  >({ method: 'GET', url: getFindWorkoutsHistoryByUserIdUrl().toString(), params, ...requestConfig })
  return res.data
}
