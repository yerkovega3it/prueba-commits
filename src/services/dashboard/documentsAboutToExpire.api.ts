import type { DocumentsAboutToExpire } from "@/interfaces/dashboard/documentsAboutToExpire.interface";
import { http } from "../http";

export async function getVehicleDocumentsAboutToExpire(
  companyName: string
): Promise<DocumentsAboutToExpire> {
  const { data } = await http.get<DocumentsAboutToExpire>(
    `/dashboard/get-vehicle-documents-about-to-expire?abbreviation=${companyName}`
  );
  return data;
}
