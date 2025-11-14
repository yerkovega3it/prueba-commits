import type { SelectOption } from 'uikit-3it-react'

export type FilterValueByKey = {
  status?: SelectOption | null
  role?: SelectOption | null // Cambié roleUser por role para coincidir con la key
  dateFilter?: string | number | Date | null
  startKey?: string | number | Date | null
  endKey?: string | number | Date | null
  switch?: boolean | null // Cambié enabled por switch para coincidir con la key
}

export interface FiltersState {
  values: FilterValueByKey
  set: <K extends keyof FilterValueByKey>(key: K, value: FilterValueByKey[K]) => void
  reset: () => void
/*   dateFilter: DateFilter
  setDateFilter: (data: DateFilter) => void
  rangeFilter: RangeFilter
  setRangeFilter: (data: RangeFilter) => void
  switchFilter: SwitchFilter
  setSwitchFilter: (data: SwitchFilter) => void */
}