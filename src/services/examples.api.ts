import { http } from "@/services/http"
import type { ExamplesDTO, ExampleDTO, ExamplePayload } from '@/interfaces'
import type { ExampleQueryParams } from '@/interfaces'

export async function examplesApi(payload: ExampleQueryParams): Promise<ExamplesDTO> {
  const { data } = await http.get<ExamplesDTO>("/base/example/paged", { params: payload })
  return data
}
export async function exampleByIdApi(payload: string | number): Promise<ExampleDTO> {
  const { data } = await http.get<ExampleDTO>(`/base/example/detail/${payload}`)
  return data
}
export async function exampleCreateApi(payload: ExamplePayload): Promise<ExampleDTO> {
  const { data } = await http.post<ExampleDTO>(`/base/example/create`, payload)
  return data
}
export async function exampleUpdateApi(payload: ExamplePayload): Promise<ExampleDTO> {
  const { data } = await http.put<ExampleDTO>(`/base/example/update`, payload)
  return data
}
