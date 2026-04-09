import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type { PersonExpiredExam } from "@/interfaces/dashboard/listEntities.interface";
import type { UsePaginatedParams } from "@/hooks/useDashboardData";
import { http } from "../http";

export async function getExpiredExamsList(
  params: UsePaginatedParams,
): Promise<PaginatedResponse<PersonExpiredExam>> {
  const { data } = await http.get<PaginatedResponse<PersonExpiredExam>>(
    `/dashboard/get-expired-exams-list`,
    { params },
  );
  return data;
}
