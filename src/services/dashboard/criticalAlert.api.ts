import type { CriticAlert } from "@/interfaces/dashboard/criticalAlert.interface";
import { http } from "../http";

export async function getCriticalOperationalAlert(
  companyName: string
): Promise<CriticAlert> {
  const { data } = await http.get<CriticAlert>(
    `/dashboard/get-critical-operational-alert?abbreviation=${companyName}`
  );
  return data;
}
