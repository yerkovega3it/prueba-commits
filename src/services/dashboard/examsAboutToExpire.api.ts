import { http } from "../http";
import type { ExamsAboutToExpire } from "@/interfaces/dashboard/examsAboutToExpire.interface";

export async function getExamsAboutToExpire(
  companyName: string
): Promise<ExamsAboutToExpire> {
  const { data } = await http.get<ExamsAboutToExpire>(
    `/dashboard/get-exams-about-to-expire?abbreviation=${companyName}`
  );
  return data;
}
