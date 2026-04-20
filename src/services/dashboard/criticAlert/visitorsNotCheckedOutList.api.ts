import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type { VisitorNotCheckedOut } from "@/interfaces/dashboard/listEntities.interface";
import type { UsePaginatedParams } from "@/hooks/useDashboardData";
import { http } from "../../http";

export async function getVisitorsNotCheckedOutList(
  params: UsePaginatedParams,
): Promise<PaginatedResponse<VisitorNotCheckedOut>> {
  const { data } = await http.get<PaginatedResponse<VisitorNotCheckedOut>>(
    `/dashboard/get-visitors-not-checked-out-list`,
    { params },
  );
  return data;
}
