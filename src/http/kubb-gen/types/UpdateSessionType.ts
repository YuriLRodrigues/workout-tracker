import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerNotAllowedDtoType } from './SwaggerNotAllowedDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'
import type { UpdateSessionBodyDtoType } from './UpdateSessionBodyDtoType'
import type { UpdateSessionResponseDtoType } from './UpdateSessionResponseDtoType'

export type UpdateSessionPathParamsType = {
  /**
   * @type string
   */
  sessionId: string
}

/**
 * @description Log successfully updated
 */
export type UpdateSession200Type = UpdateSessionResponseDtoType

/**
 * @description Bad request
 */
export type UpdateSession400Type = SwaggerBadRequestDtoType

/**
 * @description Not allowed
 */
export type UpdateSession403Type = SwaggerNotAllowedDtoType

/**
 * @description Resource not found
 */
export type UpdateSession404Type = SwaggerResourceNotFoundDtoType

export type UpdateSessionMutationRequestType = UpdateSessionBodyDtoType

export type UpdateSessionMutationResponseType = UpdateSession200Type

export type UpdateSessionTypeMutation = {
  Response: UpdateSession200Type
  Request: UpdateSessionMutationRequestType
  PathParams: UpdateSessionPathParamsType
  Errors: UpdateSession400Type | UpdateSession403Type | UpdateSession404Type
}
