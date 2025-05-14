import { createLog } from './createLog'
import { deleteLog } from './deleteLog'
import { findAllLogsByExerciseId } from './findAllLogsByExerciseId'
import { findAllLogsToday } from './findAllLogsToday'
import { findLogTodayByExerciseId } from './findLogTodayByExerciseId'

export function logController() {
  return { createLog, deleteLog, findAllLogsByExerciseId, findAllLogsToday, findLogTodayByExerciseId }
}
