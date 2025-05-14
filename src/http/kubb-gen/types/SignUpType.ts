import type { SignUpBodyDtoType } from './SignUpBodyDtoType'
import type { SignUpResponseDtoType } from './SignUpResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceAlreadyExistsDtoType } from './SwaggerResourceAlreadyExistsDtoType'

/**
 * @description User created successfully
 */
export type SignUp201Type = SignUpResponseDtoType

/**
 * @description Bad request
 */
export type SignUp400Type = SwaggerBadRequestDtoType

/**
 * @description Resource already exists
 */
export type SignUp409Type = SwaggerResourceAlreadyExistsDtoType

export type SignUpMutationRequestType = SignUpBodyDtoType

export type SignUpMutationResponseType = SignUp201Type

export type SignUpTypeMutation = {
  Response: SignUp201Type
  Request: SignUpMutationRequestType
  Errors: SignUp400Type | SignUp409Type
}
