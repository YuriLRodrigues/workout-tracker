import { createSession } from './createSession'
import { findAllSessionByUserId } from './findAllSessionByUserId'
import { findAverageTimeByWeek } from './findAverageTimeByWeek'
import { findAverageWorkoutByWeek } from './findAverageWorkoutByWeek'
import { findFrequencyByWeekAndUserId } from './findFrequencyByWeekAndUserId'
import { findTodaySessionByUserId } from './findTodaySessionByUserId'
import { findTodayWorkoutSession } from './findTodayWorkoutSession'
import { findTotalLoadByWeek } from './findTotalLoadByWeek'
import { findTotalSeriesByWeek } from './findTotalSeriesByWeek'
import { updateSession } from './updateSession'

export function sessionController() {
  return {
    createSession,
    findTodayWorkoutSession,
    updateSession,
    findAverageTimeByWeek,
    findAverageWorkoutByWeek,
    findTotalLoadByWeek,
    findTotalSeriesByWeek,
    findAllSessionByUserId,
    findFrequencyByWeekAndUserId,
    findTodaySessionByUserId,
  }
}
