import type { VisitorPass } from "@/interfaces/dashboard/visitorPass.interface";
import { http } from "../http";

export async function getVisitorPass(
  companyName: string
): Promise<VisitorPass> {
  const { data } = await http.get<VisitorPass>(
    `/dashboard/get-visitor-pass?abbreviation=${companyName}`
  );
  return data;
}
