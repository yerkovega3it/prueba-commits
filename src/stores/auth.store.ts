import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
//Interface
import type { AuthState } from '@/interfaces'
//Factories
import { 
  initialUserConfig, 
  initialAlert, 
  initialUserMenuSidebar 
} from '@/factories'

export const useStoreAuth = create<AuthState>()(
  devtools(subscribeWithSelector((set) => ({
    authStatus: "checking",
    user: null,
    token: null,
    
    //Permissions
    permissions: [],

    //Configuration
    config: JSON.parse(localStorage.getItem('config') || 'null') || { ...initialUserConfig },
 
    //Menu
    menu: JSON.parse(localStorage.getItem('menu') || 'null') || { ...initialUserMenuSidebar },
    sidebar: { toggleMobile: false, toggleCollapse: false },

    //Login
    loginError: false,
    loginSubmitting: false,
    setLoginError: (value: boolean) => set({ loginError: value }),
    setLoginSubmitting: (value: boolean) => set({ loginSubmitting: value }),

    //Messages
    messageAlert: { ...initialAlert },
    setMessageAlert: (alert) => set(() => ({ messageAlert: alert })),
    successMessage: null,
    errorMessage: null,

    //Loading
    loadingUser: false,

    //Errors
    errorBack: null,
}))))
