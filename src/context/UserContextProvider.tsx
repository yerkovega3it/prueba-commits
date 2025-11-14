import { useEffect, useState, type PropsWithChildren } from "react"
//import { type UserAuthCore } from "@/interfaces"
import { UserContext, type AuthStatus } from "@/context"
import { users, type User } from "@/data/user-mock.data"

export const UserContextProvider = ({children}: PropsWithChildren) => {

  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking')
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = (userId: number) => {
    const user = users.find((user) => user.id === userId)
    if (!user) {
      console.log(`User not found ${userId}`)
      setUser(null)
      setAuthStatus('not-authenticated')
      return false
    }
    setUser(user)
    setAuthStatus('authenticated')
    localStorage.setItem('userId', userId.toString())
    console.log(`User logged in ${user.name}`)
    return true
  }

  const handleLogout = () => {
    console.log('Logout')
    setAuthStatus('not-authenticated')
    setUser(null)
    localStorage.removeItem('userId')
  }

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if(storedUserId) {
      handleLogin(+storedUserId)
      return
    }

    handleLogout()
  }, [])


  return(
    <UserContext value={{
      authStatus: authStatus,
      isAuthenticated: authStatus === 'authenticated',
      user: user,
      
      login: handleLogin,
      logout: handleLogout
    }}>
      {children}
    </UserContext>
  )
}