
import type { SelectOption, SelectFilter } from 'uikit-3it-react'

export const selectCore = {
  placeholder: 'Seleccionar',
  selected: null,
  clearable: true,
  disabled: false,
  data: [] as SelectOption[]
}

export const selectStatusBase: SelectFilter = {
  ...selectCore,
  type: 'select',
  key: 'status',
  filter: 'Estado',
  multiple: false
}

export const selectRoleUserBase: SelectFilter = {
  ...selectCore,
  type: 'select',
  key: 'role',
  filter: 'Rol',
  multiple: false
}
export const selectCurrencyBase: SelectFilter = {
  ...selectCore,
  type: 'select',
  key: 'currency',
  filter: 'Moneda',
  multiple: true
}
export const selectModuleBase: SelectFilter = {
  ...selectCore,
  type: 'select',
  key: 'module',
  filter: 'Módulo',
  multiple: false
}
export const selectCountryBase: SelectFilter = {
  ...selectCore,
  type: 'select',
  key: 'country',
  filter: 'País',
  multiple: true
}
