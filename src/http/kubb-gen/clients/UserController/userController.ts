import { changeMyUserPassword } from './changeMyUserPassword'
import { deleteUser } from './deleteUser'
import { me } from './me'
import { signIn } from './signIn'
import { signUp } from './signUp'
import { updatePersonalInfo } from './updatePersonalInfo'

export function userController() {
  return { deleteUser, me, signIn, signUp, updatePersonalInfo, changeMyUserPassword }
}
