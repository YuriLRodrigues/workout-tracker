import type { NewPasswordBodyDtoType } from './NewPasswordBodyDtoType'
import type { NewPasswordResponseDtoType } from './NewPasswordResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerInvalidPasswordResetTokenDtoType } from './SwaggerInvalidPasswordResetTokenDtoType'

export type NewPasswordQueryParamsType = {
  /**
   * @description The reset or authorization token for the new password
   * @type string
   */
  token: string
}

/**
 * @description Password changed successfully
 */
export type NewPassword200Type = NewPasswordResponseDtoType

/**
 * @description Bad request
 */
export type NewPassword400Type = SwaggerBadRequestDtoType

/**
 * @description Invalid password to reset token
 */
export type NewPassword401Type = SwaggerInvalidPasswordResetTokenDtoType

/**
 * @description Body to change password
 */
export type NewPasswordMutationRequestType = NewPasswordBodyDtoType

export type NewPasswordMutationResponseType = NewPassword200Type

export type NewPasswordTypeMutation = {
  Response: NewPassword200Type
  Request: NewPasswordMutationRequestType
  QueryParams: NewPasswordQueryParamsType
  Errors: NewPassword400Type | NewPassword401Type
}
