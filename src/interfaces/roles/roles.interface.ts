import type { AxiosError } from 'axios'
import type { TableData, FiltersCore, ErrorBack, AlertsCore, SelectOption, Permission } from 'uikit-3it-react'
import type { MetaDataBase, QueryParamsCore } from '@/interfaces'
import { createTableData } from '@/factories'

//GET
export interface RolesDTO {
  data: RoleRaw[]
  meta: { 
    pagination: { 
      pageCount: number
      total: number
      size: number
      page: number
    } 
  }
}
export interface RoleDTO {
  data: RoleRaw
}

//POST/PUT
export interface RolePayload {
  id?: number | null
  name: string
  description: string
  subModules: Array<{
    subModuleId: number
    canRead: boolean
    canCreate: boolean
    canUpdate: boolean
    canDelete: boolean
  }> | null
}

export interface RoleStatusPayload {
  roleId: number
  status: boolean
  newRoleId?: string | number | null
}

//STORE
export interface RolesState {
  roles: ReturnType<typeof createTableData<Role>>
  setRoles: (data: Omit<Partial<TableData<Role>>, 'columns'>) => void
  role: Role
  setRole: (data: Partial<Role>) => void
  roleForm: RoleForm
  setRoleForm: (data: Partial<RoleForm>) => void
  roleFormModules: SubModuleRoleForm[]
  setRoleFormModules: (data: SubModuleRoleForm[]) => void
  //Filters
  defaultFilters: RoleFilters
  setDefaultFilters: (data: Partial<RoleFilters>) => void
  //Query params
  queryParams: RoleQueryParams
  setQueryParams: (params: Partial<RoleQueryParams>) => void
  //loading
  loadingTable: boolean
  setLoadingTable: (value: boolean) => void
  loadingDetail: boolean
  setLoadingDetail: (value: boolean) => void
  //Detail
  slideFilter: boolean
  setSlideFilter: (value: boolean) => void
  slideDetail: boolean
  setSlideDetail: (value: boolean) => void
  //Message
  messageToast: Record<string, unknown>
  setMessageToast: (data: Record<string, unknown>) => void
  messageAlert: AlertsCore
  setMessageAlert: (data: AlertsCore) => void
  messageDialogAlert: AlertsCore
  setMessageDialogAlert: (data: AlertsCore) => void
  //Error
  errorBack: AxiosError<ErrorBack> | null
  setErrorBack: (error: AxiosError<ErrorBack> | null) => void
}

//Types
export type SubModuleSelectable = SelectOption | SubModuleRoleForm

export interface SubModuleRoleForm extends Permission {
  id?: number | null
}

export interface SubModuleRoleRaw extends Permission {
  subModuleId: number
  subModuleName: string
}

export type RoleCounts<T extends number | string> = {
  totalUsers: T
  totalModules: T
}

export interface RoleRaw extends RoleCounts<number> {
  id: number
  name: string
  description: string
  subModules: SubModuleRoleRaw[] | null
  status: boolean
  [key: string]: unknown
} 

export interface RoleBase extends MetaDataBase, RoleCounts<string> {
  id: string
  name: string
}

export interface Role extends MetaDataBase, RoleBase {
  description?: string
  subModules?: SubModuleRoleForm[] | null
  [key: string]: unknown
}

export interface RoleForm {
  id?: number | null
  name: string
  description: string
  subModules: SelectOption[] | null
}

export interface RoleStatus {
  id: number
  status: boolean
  newRoleId?: number | null
}

export interface RoleQueryParams extends QueryParamsCore {
  subModuleId: number | null
  status: boolean | null
}

export interface RoleFilters extends FiltersCore {
  module: SelectOption | null
  status: SelectOption | null
}