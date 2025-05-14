export type SessionDtoType = {
  /**
   * @description Unique identifier of the session
   * @type string
   */
  id: string
  /**
   * @description Start time of the workout log
   * @type string, date-time
   */
  startTime: Date
  /**
   * @description End time of the workout log
   * @type string | undefined, date-time
   */
  endTime?: Date | undefined
  /**
   * @description Unique identifier of the workout
   * @type string
   */
  workoutId: string
  /**
   * @description Unique identifier of the user
   * @type string
   */
  userId: string
}
