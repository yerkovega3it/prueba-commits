import type { Dashboard } from "@/interfaces/dashboard/dashboard.interface";
import { http } from "../http";

export async function getDashboardInformation(
  companyName: string
): Promise<Dashboard> {
  const { data } = await http.get<Dashboard>(
    `/dashboard/get-general-dashboard-info?abbreviation=${companyName}`
  );
  return data;
}
