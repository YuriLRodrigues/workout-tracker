import type { SessionDtoType } from './SessionDtoType'

export type FindTodayWorkoutSessionResponseDtoType = {
  /**
   * @description Data found or not of the today session
   */
  data: SessionDtoType | null
}
