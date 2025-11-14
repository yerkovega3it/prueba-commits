import type { SelectFilter, SelectOption } from 'uikit-3it-react'

export interface SelectDTO {
  data: SelectOption[]
}

export interface SelectQueryParams {
  [key: string]: unknown
}

export interface SelectState {
  selectRolUser: SelectFilter
  setSelectRolUser: (data: SelectFilter) => void
  selectedByKey: Record<string, SelectOption | null>
  setSelected: (key: string, value: SelectOption | null) => void
}