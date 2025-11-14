import { http } from "@/services/http"
import type { UsersDTO, UserDTO, UserPayload } from '@/interfaces'
import type { UserQueryParams } from '@/interfaces'

export async function usersApi(payload: UserQueryParams): Promise<UsersDTO> {
  const { data } = await http.get<UsersDTO>("/user/paged", { params: payload })
  return data
}
export async function userByIdApi(payload: string | number): Promise<UserDTO> {
  const { data } = await http.get<UserDTO>(`/user/detail/${payload}`)
  return data
}
export async function userCreateApi(payload: UserPayload): Promise<UserDTO> {
  const { data } = await http.post<UserDTO>(`/user/create`, payload)
  return data
}
export async function userUpdateApi(payload: UserPayload): Promise<UserDTO> {
  const { data } = await http.put<UserDTO>(`/user/update`, payload)
  return data
}