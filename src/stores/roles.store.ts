import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import type { Role, RolesState } from '@/interfaces'
import { 
  createTableData,
  initialQueryParamsRole, 
  initialAlert, 
  initialRole,
  initialRoleForm,
  initialFiltersRole
} from '@/factories'
import type { AlertsCore } from 'uikit-3it-react'

export const useStoreRoles = create<RolesState>()(
  devtools(subscribeWithSelector((set) => ({
  roles: createTableData<Role>(['ID', 'Nombre', 'Cantidad de usuarios', 'Cantidad de módulos', 'Estado']),
  setRoles: (data) => set((state) => ({ roles: { ...state.roles, ...data, columns: state.roles.columns }})),
  role: { ...initialRole },
  setRole: (data) => set((state) => ({ role: { ...state.role, ...data }})),
  roleForm: { ...initialRoleForm },
  setRoleForm: (data) => set((state) => ({ roleForm: { ...state.roleForm, ...data }})),
  roleFormModules: [],
  setRoleFormModules: (data) => set(() => ({ roleFormModules: data })),

  defaultFilters: { ...initialFiltersRole },
  setDefaultFilters: (data) => set((state) => ({ defaultFilters: { ...state.defaultFilters, ...data }})),
  queryParams: { ...initialQueryParamsRole },
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
