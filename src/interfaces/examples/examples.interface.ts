import type { AxiosError } from 'axios'
import type { TableData, FiltersCore, ErrorBack, AlertsCore, SelectOption } from 'uikit-3it-react'
import type { QueryParamsCore, IdentificationData, PersonalInfo } from '@/interfaces'
import { createTableData } from '@/factories'

//GET
export interface ExamplesDTO {
  data: ExampleRaw[]
  meta: { 
    pagination: { 
      pageCount: number
      total: number
      size: number
      page: number
    } 
  }
}
export interface ExampleDTO {
  data: ExampleRaw
}

//POST/PUT
export interface ExamplePayload {
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
export interface ExamplesState {
  examples: ReturnType<typeof createTableData<Example>>
  setExamples: (data: Omit<Partial<TableData<Example>>, 'columns'>) => void
  example: Example
  setExample: (data: Partial<Example>) => void
  exampleForm: ExampleForm
  setExampleForm: (data: Partial<ExampleForm>) => void
  //Filters
  defaultFilters: ExampleFilters
  setDefaultFilters: (data: Partial<ExampleFilters>) => void
  //Query params
  queryParams: ExampleQueryParams
  setQueryParams: (params: Partial<ExampleQueryParams>) => void
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

export interface ExampleRole {
  id: number
  name: string
  className?: string
}

export interface ExampleRaw extends PersonalInfo, IdentificationData {
  id: number
  role: ExampleRole
  status: boolean
  [key: string]: unknown
}

export interface ExampleBase {
  id: string
  name: string
  identification: string
  role: ExampleRole
}

export interface Example extends ExampleBase {
  recordStatus: { name: string, className: string, status: boolean }
  phantomKey: { id: number, url: string, status: boolean }
  [key: string]: unknown
}

export interface ExampleForm extends PersonalInfo, IdentificationData {
  id?: number | null
  roleId: { id: number, name: string } | null
}

export interface ExampleStatus {
  id: number
  status: boolean
}

export interface ExampleQueryParams extends QueryParamsCore {
  roleId: number | null
  status: boolean | null
  countryIds: string | null
  birthDate: string | null
  createdAtStart: string | null
  createdAtEnd: string | null
  switchExample: boolean | null
}

export interface ExampleFilters extends FiltersCore {
  role: SelectOption | null
  status: SelectOption | null
  country: SelectOption[] | null
  birthday: string | number | Date | null
  startDate: string | number | Date | null
  endDate: string | number | Date | null
  switch: boolean | null
}
