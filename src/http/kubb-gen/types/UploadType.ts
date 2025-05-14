export type UploadType = {
  /**
   * @description Unique identifier of the image
   * @type string
   */
  id: string
  /**
   * @description URL of the uploaded image
   * @type string
   */
  url: string
  /**
   * @description Creation date of the image
   * @type string, date-time
   */
  createdAt: Date
  /**
   * @description Last update date of the image
   * @type string, date-time
   */
  updatedAt: Date
}
