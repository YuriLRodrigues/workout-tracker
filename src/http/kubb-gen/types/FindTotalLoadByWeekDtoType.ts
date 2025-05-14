export type FindTotalLoadByWeekDtoType = {
  /**
   * @description Difference in load compared to the previous week
   * @type number
   */
  loadDiff: number
  /**
   * @description Load counting this week
   * @type number
   */
  thisWeekTotal: number
}
