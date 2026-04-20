import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type { PersonOutOfShiftDailyConsumption } from "@/interfaces/dashboard/listEntities.interface";
import type { UsePaginatedParams } from "@/hooks/useDashboardData";
import { http } from "../../http";

export async function getOutOfShiftDailyConsumptionList(
  params: UsePaginatedParams,
): Promise<PaginatedResponse<PersonOutOfShiftDailyConsumption>> {
  const { data } = await http.get<
    PaginatedResponse<PersonOutOfShiftDailyConsumption>
  >(`/dashboard/get-out-of-shift-daily-consumption-list`, { params });
  return data;
}
