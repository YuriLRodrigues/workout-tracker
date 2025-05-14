export type SwaggerNotAllowedDtoType = {
  /**
   * @default "Not allowed"
   * @type string
   */
  message: string
  /**
   * @default "NotAllowedError"
   * @type string
   */
  error: string
  /**
   * @default 403
   * @type number
   */
  statusCode: number
}
