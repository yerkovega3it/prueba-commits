import { createContext } from "react"
//import { type UserAuthCore } from "@/interfaces"
import { type User } from "@/data/user-mock.data"

export type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated'

export interface UserContextProps {

  //State
  authStatus: AuthStatus
  user: User | null
  isAuthenticated: boolean

  //Methods
  login: (userId: number) => boolean
  logout: () => void
}

export const UserContext = createContext({} as UserContextProps)