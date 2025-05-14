export type FindWorkoutsHistoryByUserIdResponseDtoType = {
  /**
   * @description Unique identifier of the session
   * @type string
   */
  id: string
  /**
   * @description Start time of the session
   * @type string, date-time
   */
  startTime: Date
  /**
   * @description End time of the session
   * @type string, date-time
   */
  endTime: Date
  /**
   * @description Color associated with the session
   * @type string
   */
  color: string
  /**
   * @description Icon representing the session
   * @type string
   */
  icon: string
  /**
   * @description Name of the workout
   * @type string
   */
  workoutName: string
  /**
   * @description Description of the workout
   * @type string
   */
  workoutDescription: string
  /**
   * @description Unique identifier of the workout
   * @type string
   */
  workoutId: string
  /**
   * @description Total load (sum of maxWeight across all logs)
   * @type number
   */
  totalLoad: number
  /**
   * @description Total number of exercises performed in the session
   * @type number
   */
  totalExercises: number
}
