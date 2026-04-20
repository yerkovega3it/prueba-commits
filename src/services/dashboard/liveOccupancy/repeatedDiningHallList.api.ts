import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type { PersonRepeatedDining } from "@/interfaces/dashboard/listEntities.interface";
import type { UsePaginatedParams } from "@/hooks/useDashboardData";
import { http } from "../../http";

export async function getRepeatedDiningHallList(
  params: UsePaginatedParams,
): Promise<PaginatedResponse<PersonRepeatedDining>> {
  const { data } = await http.get<PaginatedResponse<PersonRepeatedDining>>(
    `/dashboard/get-repeated-dining-hall-list`,
    { params },
  );
  return data;
}
