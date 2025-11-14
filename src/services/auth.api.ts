import { http } from "@/services/http"
import type { ModulePermission } from "uikit-3it-react"
import type { UserAuthCore } from "@/interfaces"

export interface LoginCredentials { email: string; password: string }
export interface LoginDTO {
  user: UserAuthCore
  jwt: string
  modules: ReadonlyArray<ModulePermission>
}
export interface MeDTO {
  user: UserAuthCore
  modules: ReadonlyArray<ModulePermission>
}

export async function loginApi(body: LoginCredentials): Promise<LoginDTO> {
  const { data } = await http.post<LoginDTO>(
    "/auth/simple-auth/login",
    //"/auth/login",
    { identifier: body.email, password: body.password },
    { authRequired: false }
  )
  return data
}

export async function meApi(): Promise<MeDTO> {
  const { data } = await http.get<MeDTO>("/auth/me")
  return data
}