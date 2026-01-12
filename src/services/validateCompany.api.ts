import { API_URL } from "@/constants/environments";
import { http } from "./http";
import { apiService } from "./api.service";

interface ValidateCompanyResponse {
  message: string;
}
export async function validateCompany(
  companyName: string
): Promise<ValidateCompanyResponse> {
  const response = await apiService.get<ValidateCompanyResponse>({
    endpoint: `${API_URL}/company/validate/${companyName}`,
  });
  return response;
}
