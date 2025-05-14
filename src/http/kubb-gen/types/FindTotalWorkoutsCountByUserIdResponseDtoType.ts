export type FindTotalWorkoutsCountByUserIdResponseDtoType = {
  /**
   * @description Total count of workouts
   * @type number
   */
  totalCount: number
  /**
   * @description Date of the first training session
   * @type string, date-time
   */
  since: Date | null
}
