import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type { VehicleExpiringDocument } from "@/interfaces/dashboard/listEntities.interface";
import type { UsePaginatedParams } from "@/hooks/useDashboardData";
import { http } from "../http";

export async function getExpiringVehicleDocumentsList(
  params: UsePaginatedParams,
): Promise<PaginatedResponse<VehicleExpiringDocument>> {
  const { data } = await http.get<PaginatedResponse<VehicleExpiringDocument>>(
    `/dashboard/get-expiring-vehicle-documents-list`,
    { params },
  );
  return data;
}
