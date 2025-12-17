import type { Dashboard } from "@/interfaces/dashboard/dashboard.interface";
import { http } from "../http";

export async function getDashboardInformation(): Promise<Dashboard> {
  const { data } = await http.get<Dashboard>("/dashboard/get");
  return data;
}
