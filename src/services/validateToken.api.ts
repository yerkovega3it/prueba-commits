import { http } from "./http";

interface ValidateTokenResponse {
  validToken: boolean;
  errorMessage: string;
  createdAt: string;
  token: string;
}

export async function validateToken(
  token: string
): Promise<ValidateTokenResponse> {
  const { data } = await http.post<ValidateTokenResponse>(
    `/auth/validateToken?jwt=${token}`
  );
  return data;
}
