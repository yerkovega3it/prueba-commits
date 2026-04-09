import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type { PersonExpiringExam } from "@/interfaces/dashboard/listEntities.interface";
import type { UsePaginatedParams } from "@/hooks/useDashboardData";
import { http } from "../../http";

export async function getExpiringExamsList(
  params: UsePaginatedParams,
): Promise<PaginatedResponse<PersonExpiringExam>> {
  const { data } = await http.get<PaginatedResponse<PersonExpiringExam>>(
    `/dashboard/get-expiring-exams-list`,
    { params },
  );
  return data;
}
