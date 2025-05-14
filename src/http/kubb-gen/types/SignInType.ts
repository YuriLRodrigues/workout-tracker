import type { SignInBodyDtoType } from './SignInBodyDtoType'
import type { SignInResponseDtoType } from './SignInResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceAlreadyExistsDtoType } from './SwaggerResourceAlreadyExistsDtoType'

/**
 * @description User successfully authenticated
 */
export type SignIn200Type = SignInResponseDtoType

/**
 * @description Bad request
 */
export type SignIn400Type = SwaggerBadRequestDtoType

/**
 * @description Resource already exists
 */
export type SignIn409Type = SwaggerResourceAlreadyExistsDtoType

/**
 * @description Body to sign in
 */
export type SignInMutationRequestType = SignInBodyDtoType

export type SignInMutationResponseType = SignIn200Type

export type SignInTypeMutation = {
  Response: SignIn200Type
  Request: SignInMutationRequestType
  Errors: SignIn400Type | SignIn409Type
}
