import type { MonthlyApprovedPasses } from "@/interfaces/dashboard/monthlyApprovedPasses.interface";
import { http } from "../../http";

export async function getMonthlyApprovedPasses(
  companyName: string,
): Promise<MonthlyApprovedPasses> {
  const { data } = await http.get<MonthlyApprovedPasses>(
    `/dashboard/get-monthly-approved-passes?abbreviation=${companyName}`,
  );
  return data;
}
