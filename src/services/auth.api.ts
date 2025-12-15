import type { LoginResponse } from "@/interfaces/auth/Login.interface";
import { internalEndpoints } from "@shared/constants/internalEndpoints/internalEndpoints";

interface ValidateTokenResponse {
  validToken: boolean;
  errorMessage: string;
  createdAt: string;
  jwt: string;
}

export const authService = {
  async integratedLogin(token: string): Promise<LoginResponse> {
    const url = internalEndpoints.AUTH_INTEGRATED_LOGIN.pathBase;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "integrated-login-token": `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Error en la respuesta del servidor:", response.statusText);
    }

    const result = await response.json();
    return result;
  },
  async validateToken(token: string): Promise<ValidateTokenResponse> {
    let url = internalEndpoints.AUTH_VALIDATE_TOKEN.pathBase;
    if (token) {
      url += `?jwt=${token}`;
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Error en la respuesta del servidor:", response.statusText);
    }

    const result = await response.json();
    return result;
  },
};
