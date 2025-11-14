import { selectApi } from "@/services"
import type { SelectFilter, SelectOption } from 'uikit-3it-react'
import type { SelectQueryParams } from '@/interfaces'
import { selectStatusBase, selectRoleUserBase, selectModuleBase, selectCountryBase } from '@/factories'
import { mapperSelectRoles, mapperSelectModules, mapperSelectCountries } from '@/mappers'

export async function getSelectRoleUserAction(params?: SelectQueryParams) {
  const dto = await selectApi('/base/selector/role', params)
  const result: SelectOption[] = mapperSelectRoles(dto.data)
  const select: SelectFilter = { ...selectRoleUserBase, data: result }
  return select
}

export async function getSelectModuleAction(params?: SelectQueryParams) {
  const dto = await selectApi('/base/selector/submodule', params)
  const result: SelectOption[] = mapperSelectModules(dto.data)
  const select: SelectFilter = { ...selectModuleBase, data: result }
  return select
}

export async function getSelectCountryAction(params?: SelectQueryParams) {
  const dto = await selectApi('/base/selector/country', params)
  const result: SelectOption[] = mapperSelectCountries(dto.data)
  const select: SelectFilter = { ...selectCountryBase, data: result }
  return select
}

export async function getSelectStatusAction(params?: SelectQueryParams) {
  const response = await fetch('/db/select/status.json', params)
  const data = await response.json()
  const select: SelectFilter = { ...selectStatusBase, data: data }
  return select
}