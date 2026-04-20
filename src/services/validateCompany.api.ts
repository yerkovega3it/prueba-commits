import { API_URL } from "@/constants/environments";
import { http } from "./http";

interface ValidateCompanyResponse {
  message: string;
}
export async function validateCompany(
  companyName: string,
): Promise<ValidateCompanyResponse> {
  const { data } = await http.get<ValidateCompanyResponse>(
    `${API_URL}/company/validate/${companyName}`,
  );
  return data;
}
