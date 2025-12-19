import { http } from "./http";

export async function validateCompany(
  companyName: string
): Promise<{ message: string }> {
  const response = await http.get<{ message: string }>(
    `/company/validate/${companyName}`
  );
  return response.data;
}
