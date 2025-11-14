import axios from 'axios'
import { rolesApi, roleByIdApi, roleCreateApi, roleUpdateApi, roleUpdateStatusApi } from "@/services"
import type { Role, RoleQueryParams, RoleForm, RoleStatusPayload } from '@/interfaces'
import { useStoreRoles } from '@/stores'
import { mapperRoles, mapperRole, mapperRoleForm, mapperRoleFormToPayload } from '@/mappers'
import { initialSort } from '@/factories'

const { setSlideFilter, setSlideDetail } = useStoreRoles.getState()
 
export interface RolesResponse {
  roles: Role[]
  meta: { total: number; finalPage: number; currentPage: number }
}

export async function getRolesAction(params: RoleQueryParams): Promise<RolesResponse> {
  const { setRoles } = useStoreRoles.getState()
  const dto = await rolesApi(params)
  const result = {
    roles: mapperRoles(dto.data),
    meta: {
      total: dto.meta.pagination.total,
      finalPage: dto.meta.pagination.pageCount,
      currentPage: dto.meta.pagination.page + 1,
    },
  }
  setRoles({ sort: { ...initialSort, keys: Object.keys(result.roles[0] || {}) } })
  return result
}

export const getRoleByIdAction = async (payload: string | number) => {
  const { setErrorBack } = useStoreRoles.getState()
  try {
    const dto = await roleByIdApi(payload)
    const result = mapperRole(dto.data)
    return result
  } 
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export const getRoleByIdFormAction = async (payload: string | number) => {
  const { setErrorBack } = useStoreRoles.getState()
  try {
    const dto = await roleByIdApi(payload)
    const result = mapperRoleForm(dto.data)
    return result
  }
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export const mutationCreateRoleFormAction = async (form: RoleForm) => {
  const { setErrorBack } = useStoreRoles.getState()
  try {
    const payload = mapperRoleFormToPayload(form)
    const { data } = await roleCreateApi(payload)
    return data
  }
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export const mutationUpdateRoleFormAction = async (form: RoleForm) => {
  const { setErrorBack } = useStoreRoles.getState()
  try {
    const payload = mapperRoleFormToPayload(form)
    const { data } = await roleUpdateApi(payload)
    return data
  }
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export const mutationUpdateStatusRoleFormAction = async (payload: RoleStatusPayload) => {
  
  const { setErrorBack } = useStoreRoles.getState()
  try {
    const { data } = await roleUpdateStatusApi(payload)
    return data
  }
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export function slideRoleFilterAction (removeDetailParam?: () => void) {
  if (removeDetailParam) removeDetailParam()
    
  setSlideDetail(false)
  setSlideFilter(true)
}

export function slideRoleDetailAction () {
  setSlideFilter(false)
  setSlideDetail(true)
}

export function slideRoleCloseAction (removeDetailParam?: () => void) {
  const { slideDetail } = useStoreRoles.getState()
  if (slideDetail && removeDetailParam) removeDetailParam()

  setSlideFilter(false)
  setSlideDetail(false)
}