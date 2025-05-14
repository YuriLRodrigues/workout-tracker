export type FindAverageTimeByWeekDtoType = {
  /**
   * @description Difference in seconds compared to the previous week
   * @type number
   */
  timeDiffSeconds: number
  /**
   * @description Total seconds accumulated this week
   * @type number
   */
  totalThisWeekSeconds: number
}
