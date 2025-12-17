import type { MonthlyApprovedPasses } from "@/interfaces/dashboard/monthlyApprovedPasses.interface";
import { http } from "../http";

export async function getMonthlyApprovedPasses(): Promise<MonthlyApprovedPasses> {
  const { data } = await http.get<MonthlyApprovedPasses>(
    "/dashboard/get-monthly-approved-passes"
  );
  return data;
}
