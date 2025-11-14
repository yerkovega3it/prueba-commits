import { http } from "@/services/http"
import type { SelectDTO, SelectQueryParams } from '@/interfaces'

export async function selectApi(apiUrl: string, payload?: SelectQueryParams): Promise<SelectDTO> {
  const { data } = await http.get<SelectDTO>(apiUrl, { params: payload })
  return data
}