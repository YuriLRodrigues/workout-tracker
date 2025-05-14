import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  DeleteUserMutationResponseType,
  DeleteUserPathParamsType,
  DeleteUser400Type,
  DeleteUser403Type,
  DeleteUser404Type,
} from '../../types/DeleteUserType'

function getDeleteUserUrl({ id }: { id: DeleteUserPathParamsType['id'] }) {
  return `/user/manager/${id}` as const
}

/**
 * {@link /user/manager/:id}
 */
export async function deleteUser(
  { id }: { id: DeleteUserPathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteUserMutationResponseType,
    ResponseErrorConfig<DeleteUser400Type | DeleteUser403Type | DeleteUser404Type>,
    unknown
  >({
    method: 'DELETE',
    url: getDeleteUserUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}
