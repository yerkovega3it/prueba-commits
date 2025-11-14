import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import type { User, UsersState } from '@/interfaces'
import { 
  createTableData, 
  initialQueryParamsUser, 
  initialAlert, 
  initialUser, 
  initialUserForm,
  initialFiltersUser
} from '@/factories'
import type { AlertsCore } from 'uikit-3it-react'

export const useStoreUsers = create<UsersState>()(
  devtools(subscribeWithSelector((set) => ({
  users: createTableData<User>(['ID', 'Nombre', 'RUT', 'Rol', 'Estado']),
  setUsers: (data) => set((state) => ({ users: { ...state.users, ...data, columns: state.users.columns }})),
  user: { ...initialUser },
  setUser: (data) => set((state) => ({ user: { ...state.user, ...data }})),
  userForm: { ...initialUserForm },
  setUserForm: (data) => set((state) => ({ userForm: { ...state.userForm, ...data }})),

  defaultFilters: { ...initialFiltersUser },
  setDefaultFilters: (data) => set((state) => ({ defaultFilters: { ...state.defaultFilters, ...data }})),
  queryParams: { ...initialQueryParamsUser },
  setQueryParams: (params) => set((state) => ({ queryParams: { ...state.queryParams, ...params } })),

  //loading
  loadingTable: false,
  setLoadingTable: (value: boolean) => set(() => ({ loadingTable: value })),
  loadingDetail: false,
  setLoadingDetail: (value: boolean) => set(() => ({ loadingDetail: value })),

  //Detail
  slideFilter: false,
  setSlideFilter: (value: boolean) => set(() => ({ slideFilter: value })),
  slideDetail: false,
  setSlideDetail: (value: boolean) => set(() => ({ slideDetail: value })),

  //Message
  messageToast: {},
  setMessageToast: (data) => set(() => ({ messageToast: data })),
  messageAlert: { ...initialAlert },
  setMessageAlert: (data: AlertsCore) => set(() => ({ messageAlert: data })),
  messageDialogAlert: { ...initialAlert },
  setMessageDialogAlert: (data: AlertsCore) => set(() => ({ messageDialogAlert: data })),

  //Errors
  errorBack: null,
  setErrorBack: (error) => set(() => ({ errorBack: error })),
}))))
