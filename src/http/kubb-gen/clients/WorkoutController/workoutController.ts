import { createWorkout } from './createWorkout'
import { deleteWorkout } from './deleteWorkout'
import { findAllWorkoutsByUserId } from './findAllWorkoutsByUserId'
import { findTotalAndAvgTimeByUserId } from './findTotalAndAvgTimeByUserId'
import { findTotalWorkoutsCountByUserId } from './findTotalWorkoutsCountByUserId'
import { findWorkoutById } from './findWorkoutById'
import { findWorkoutsHistoryByUserId } from './findWorkoutsHistoryByUserId'

export function workoutController() {
  return {
    createWorkout,
    deleteWorkout,
    findAllWorkoutsByUserId,
    findWorkoutById,
    findWorkoutsHistoryByUserId,
    findTotalAndAvgTimeByUserId,
    findTotalWorkoutsCountByUserId,
  }
}
