export type CreateWorkoutBodyDtoType = {
  /**
   * @description The name of the workout
   * @type string
   */
  name: string
  /**
   * @description A brief description of the workout
   * @type string
   */
  description: string
  /**
   * @description An icon representing the workout
   * @type string
   */
  icon: string
  /**
   * @description An color representing the workout icon
   * @type string
   */
  color: string
  /**
   * @description Optional banner ID associated with the workout
   * @type string | undefined
   */
  bannerId?: string | undefined
}
