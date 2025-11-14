import { http } from "@/services/http"
import type { RolesDTO, RoleDTO, RolePayload, RoleStatusPayload } from '@/interfaces'
import type { RoleQueryParams } from '@/interfaces'

export async function rolesApi(payload: RoleQueryParams): Promise<RolesDTO> {
  const { data } = await http.get<RolesDTO>("/user/role/paged", { params: payload })
  return data
}
export async function roleByIdApi(payload: string | number): Promise<RoleDTO> {
  const { data } = await http.get<RoleDTO>(`/user/role/detail/${payload}`)
  return data
}
export async function roleCreateApi(payload: RolePayload): Promise<RoleDTO> {
  const { data } = await http.post<RoleDTO>(`/user/role/create`, payload)
  return data
}
export async function roleUpdateApi(payload: RolePayload): Promise<RoleDTO> {
  const { data } = await http.put<RoleDTO>(`/user/role/update`, payload)
  return data
}
export async function roleUpdateStatusApi(payload: RoleStatusPayload): Promise<RoleDTO> {
  const { data } = await http.put<RoleDTO>('/user/role/updateStatus', payload)
  return data
}
/* export async function roleUpdateStatusApi(payload: RoleStatusPayload): Promise<RoleDTO> {
  const payloadToUrl = `status=${payload.status}&newRoleId=${payload.newRoleId}`
  const { data } = await http.post<RoleDTO>(`/user/role/updateStatus/${payload.roleId}?${payloadToUrl}`)
  return data
} */