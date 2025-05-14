'use client'

import { UserRoles } from '@/@types/user'
import { TokenPayload } from '@/auth'
import { AUTH_COOKIE_NAME, USER_COOKIE_NAME } from '@/utils/constants'
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client'
import { decode } from 'jsonwebtoken'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const defaultUserPayload: TokenPayload = {
  email: '',
  name: '',
  sub: '',
  avatar: '',
  blurHash: '',
  role: '' as UserRoles,
  exp: 0,
}

type UserPayload = typeof defaultUserPayload

type ActionsProps = {
  addUserPayload: (userPayload?: Partial<TokenPayload>) => void
  updateUserAvatar: (avatarUrl: string) => void
  deleteUserPayload: VoidFunction
  getUserPayload: () => TokenPayload
  isAuthenticated: () => boolean
}

const decodeToken = (): TokenPayload | null => {
  const token = getCookie(AUTH_COOKIE_NAME)
  if (!token) return null

  return decode(token) as TokenPayload
}

type UserPayloadStore = {
  user: UserPayload
  actions: ActionsProps
}

const getUserFromCookie = (): TokenPayload => {
  const userFromCookie = getCookie(USER_COOKIE_NAME)

  if (userFromCookie) {
    return JSON.parse(userFromCookie) as TokenPayload
  }

  return defaultUserPayload
}

export const useUserPayloadStore = create<UserPayloadStore>()(
  persist(
    (set, get) => ({
      user: getUserFromCookie(),

      actions: {
        addUserPayload: (userPayload?: Partial<TokenPayload>) => {
          const payloadDecoded = userPayload ?? decodeToken()

          if (!payloadDecoded) return

          const fullPayload = {
            email: payloadDecoded.email ?? '',
            name: payloadDecoded.name ?? '',
            sub: payloadDecoded.sub ?? '',
            avatar: payloadDecoded.avatar ?? '',
            role: payloadDecoded.role ?? ('' as UserRoles),
            exp: payloadDecoded.exp ?? 0,
          }

          set({ user: fullPayload })

          setCookie(USER_COOKIE_NAME, JSON.stringify(fullPayload), {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 dias
          })
        },

        isAuthenticated: () => {
          const { email, name, sub, role } = get().user

          if (!(email && name && sub && role)) {
            return false
          }

          const userFromCookie = getCookie(USER_COOKIE_NAME)

          if (!userFromCookie) {
            get().actions.deleteUserPayload()
            return false
          }

          return true
        },

        getUserPayload: () => get().user,

        updateUserAvatar: (avatarUrl: string) => {
          set((state) => {
            const updatedUser = { ...state.user, avatar: avatarUrl }
            setCookie(USER_COOKIE_NAME, JSON.stringify(updatedUser), {
              path: '/',
              maxAge: 60 * 60 * 24 * 7, // 7 dias
            })
            return { user: updatedUser }
          })
        },

        deleteUserPayload: () => {
          deleteCookie(AUTH_COOKIE_NAME)
          deleteCookie(USER_COOKIE_NAME)
          set({ user: defaultUserPayload })
        },
      },
    }),
    {
      name: 'wt-user-payload-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }) as Partial<UserPayloadStore>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        user: persistedState?.user ?? getUserFromCookie(), // Pega do cookie
      }),
    },
  ),
)
