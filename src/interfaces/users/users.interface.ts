import type { AxiosError } from 'axios'
import type { TableData, FiltersCore, ErrorBack, AlertsCore, SelectOption } from 'uikit-3it-react'
import type { QueryParamsCore, IdentificationData, PersonalInfo } from '@/interfaces'
import { createTableData } from '@/factories'

//GET
export interface UsersDTO {
  data: UserRaw[]
  meta: { 
    pagination: { 
      pageCount: number
      total: number
      size: number
      page: number
    } 
  }
}
export interface UserDTO {
  data: UserRaw
}

//POST/PUT
export interface UserPayload {
  id?: number | null
  email?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  identification?: string
  identificationTypeId?: number
  roleId?: number | null
  loginViaSso?: boolean
  status?: boolean
}

//STORE
export interface UsersState {
  users: ReturnType<typeof createTableData<User>>
  setUsers: (data: Omit<Partial<TableData<User>>, 'columns'>) => void
  user: User
  setUser: (data: Partial<User>) => void
  userForm: UserForm
  setUserForm: (data: Partial<UserForm>) => void
  //Filters
  defaultFilters: UserFilters
  setDefaultFilters: (data: Partial<UserFilters>) => void
  //Query params
  queryParams: UserQueryParams
  setQueryParams: (params: Partial<UserQueryParams>) => void
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

export interface UserRole {
  id: number
  name: string
  className?: string
}

export interface UserRaw extends PersonalInfo, IdentificationData {
  id: number
  role: UserRole
  status: boolean
  [key: string]: unknown
}

export interface UserBase {
  id: string
  name: string
  identification: string
  role: UserRole
}

export interface User extends UserBase {
  recordStatus: { name: string, className: string, status: boolean }
  phantomKey: { id: number, url: string, status: boolean }
  [key: string]: unknown
}

export interface UserForm extends PersonalInfo, IdentificationData {
  id?: number | null
  roleId: { id: number, name: string } | null
}

export interface UserStatus {
  id: number
  status: boolean
}

export interface UserQueryParams extends QueryParamsCore {
  roleId: number | null
  status: boolean | null
}

export interface UserFilters extends FiltersCore {
  role: SelectOption | null
  status: SelectOption | null
  dateFilter: string | number | Date | null
  startKey: string | number | Date | null
  endKey: string | number | Date | null
  switch: boolean | null
}