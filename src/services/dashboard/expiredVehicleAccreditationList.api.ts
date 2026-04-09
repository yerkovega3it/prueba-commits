import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type { VehicleExpiredAccreditation } from "@/interfaces/dashboard/listEntities.interface";
import type { UsePaginatedParams } from "@/hooks/useDashboardData";
import { http } from "../http";

export async function getExpiredVehicleAccreditationList(
  params: UsePaginatedParams,
): Promise<PaginatedResponse<VehicleExpiredAccreditation>> {
  const { data } = await http.get<PaginatedResponse<VehicleExpiredAccreditation>>(
    `/dashboard/get-expired-vehicle-accreditation-list`,
    { params },
  );
  return data;
}
