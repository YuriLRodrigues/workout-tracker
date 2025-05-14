import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerNotAllowedDtoType } from './SwaggerNotAllowedDtoType'
import type { UploadType } from './UploadType'

export type UploadImagePathParamsType = {
  /**
   * @type string
   */
  type: string
}

/**
 * @description Image successfully uploaded
 */
export type UploadImage201Type = UploadType

/**
 * @description Bad request
 */
export type UploadImage400Type = SwaggerBadRequestDtoType

/**
 * @description Not allowed
 */
export type UploadImage403Type = SwaggerNotAllowedDtoType

export type UploadImageMutationRequestType = {
  /**
   * @type string, binary
   */
  file: Blob
}

export type UploadImageMutationResponseType = UploadImage201Type

export type UploadImageTypeMutation = {
  Response: UploadImage201Type
  Request: UploadImageMutationRequestType
  PathParams: UploadImagePathParamsType
  Errors: UploadImage400Type | UploadImage403Type
}
