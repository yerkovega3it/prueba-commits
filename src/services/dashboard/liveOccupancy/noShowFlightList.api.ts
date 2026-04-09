import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type { PersonNoShowFlight } from "@/interfaces/dashboard/listEntities.interface";
import type { UsePaginatedParams } from "@/hooks/useDashboardData";
import { http } from "../../http";

export async function getNoShowFlightList(
  params: UsePaginatedParams,
): Promise<PaginatedResponse<PersonNoShowFlight>> {
  const { data } = await http.get<PaginatedResponse<PersonNoShowFlight>>(
    `/dashboard/get-no-show-flight-list`,
    { params },
  );
  return data;
}
