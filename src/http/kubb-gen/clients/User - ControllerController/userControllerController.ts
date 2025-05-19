import { forgotPassword } from './forgotPassword'
import { newPassword } from './newPassword'

export function userControllerController() {
  return { forgotPassword, newPassword }
}
