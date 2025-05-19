import type { ForgotPasswordBodyDtoType } from './ForgotPasswordBodyDtoType'
import type { ForgotResponseDtoType } from './ForgotResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

/**
 * @description Password recovery sent to your email
 */
export type ForgotPassword200Type = ForgotResponseDtoType

/**
 * @description Bad request
 */
export type ForgotPassword400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type ForgotPassword404Type = SwaggerResourceNotFoundDtoType

export type ForgotPasswordMutationRequestType = ForgotPasswordBodyDtoType

export type ForgotPasswordMutationResponseType = ForgotPassword200Type

export type ForgotPasswordTypeMutation = {
  Response: ForgotPassword200Type
  Request: ForgotPasswordMutationRequestType
  Errors: ForgotPassword400Type | ForgotPassword404Type
}
