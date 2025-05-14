export type SwaggerResourceAlreadyExistsDtoType = {
  /**
   * @default "Resource already exists"
   * @type string
   */
  message: string
  /**
   * @default "ResourceAlweadyExistsError"
   * @type string
   */
  error: string
  /**
   * @default 409
   * @type number
   */
  statusCode: number
}
