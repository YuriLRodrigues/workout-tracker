import type { ChangeMyUserPasswordBodyDtoType } from './ChangeMyUserPasswordBodyDtoType'
import type { ChangeMyUserPasswordResponseDtoType } from './ChangeMyUserPasswordResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

/**
 * @description Password successfully modified
 */
export type ChangeMyUserPassword200Type = ChangeMyUserPasswordResponseDtoType

/**
 * @description Bad request
 */
export type ChangeMyUserPassword400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type ChangeMyUserPassword404Type = SwaggerResourceNotFoundDtoType

export type ChangeMyUserPasswordMutationRequestType = ChangeMyUserPasswordBodyDtoType

export type ChangeMyUserPasswordMutationResponseType = ChangeMyUserPassword200Type

export type ChangeMyUserPasswordTypeMutation = {
  Response: ChangeMyUserPassword200Type
  Request: ChangeMyUserPasswordMutationRequestType
  Errors: ChangeMyUserPassword400Type | ChangeMyUserPassword404Type
}
