import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type { PersonOutOfShiftExit } from "@/interfaces/dashboard/listEntities.interface";
import type { UsePaginatedParams } from "@/hooks/useDashboardData";
import { http } from "../../http";

export async function getOutOfShiftExitList(
  params: UsePaginatedParams,
): Promise<PaginatedResponse<PersonOutOfShiftExit>> {
  const { data } = await http.get<PaginatedResponse<PersonOutOfShiftExit>>(
    `/dashboard/get-out-of-shift-exit-list`,
    { params },
  );
  return data;
}
