import type { AlertsCore, ModulePermission } from 'uikit-3it-react'

export type AuthStatus = "checking" | "authenticated" | "not-authenticated"

export type AuthState = {
  authStatus: AuthStatus    
  user: UserAuthCore | null
  token: string | null

  //Permissions
  permissions: ReadonlyArray<ModulePermission> 

  //Configuration
  config: UserAuthConfig
  
  //Menu
  menu: unknown | null
  sidebar: { toggleMobile: boolean, toggleCollapse: boolean }

  //Login
  loginSubmitting: boolean
  setLoginSubmitting: (value: boolean) => void
  loginError: boolean
  setLoginError: (value: boolean) => void

  //Messages
  messageAlert: AlertsCore
  setMessageAlert: (alert: AlertsCore) => void
  successMessage: string | null
  errorMessage: string | null

  //Loading
  loadingUser: boolean

  //Errors
  errorBack: Error | null
}

export interface UserAuthRole {
  id: number
  name: string
  description: string
  status: boolean
}

export interface UserAuthIdentity {
  id: number
  name: string
  description: string
}

export interface UserAuthCore {
  id: number
  firstName: string
  lastName: string
  email: string
  address: string
  phoneNumber: string
  identification: string
  identificationType: UserAuthIdentity
  role: UserAuthRole
}
export interface UserAuthConfig {
  darkTheme: boolean
}

export interface UserAuthMenuBase {
  id: number
  name: string
  url: string | null
  requiresPermissions: boolean
  module: string
}
export interface UserAuthMenuCore extends UserAuthMenuBase {
  icon: string | null
  subMenu: UserAuthMenuBase[] | []
}
export interface UserAuthMenuSidebar {
  main: UserAuthMenuCore[]
  admin?: UserAuthMenuCore[]
}
