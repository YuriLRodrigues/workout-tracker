import { createExercise } from './createExercise'
import { deleteExercise } from './deleteExercise'
import { findAllExercisesByWorkoutId } from './findAllExercisesByWorkoutId'
import { findExerciseById } from './findExerciseById'

export function exerciseController() {
  return { createExercise, deleteExercise, findExerciseById, findAllExercisesByWorkoutId }
}
