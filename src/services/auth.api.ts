import type { LoginResponse } from "@/interfaces/auth/Login.interface";
import { API_URL } from "../constants/environments";

interface ValidateTokenResponse {
  validToken: boolean;
  errorMessage: string;
  createdAt: string;
  jwt: string;
}

export const authService = {
  async integratedLogin(token: string): Promise<LoginResponse> {
    const url = `${API_URL}/auth/integrated-login`;
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
    let url = `${API_URL}/auth/validateToken`;
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
