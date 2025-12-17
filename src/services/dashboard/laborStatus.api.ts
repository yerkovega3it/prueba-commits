import type { LaborStatus } from "@/interfaces/dashboard/laborStatus.interface";
import { http } from "../http";

export async function getLaborStatus(): Promise<LaborStatus> {
  const { data } = await http.get<LaborStatus>("/dashboard/get-labor-status");
  return data;
}
