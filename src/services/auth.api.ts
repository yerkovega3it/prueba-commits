import type { LoginResponse } from "@/interfaces/auth/Login.interface";
import { API_URL } from "../constants/environments";

interface ValidateTokenResponse {
  validToken: boolean;
  errorMessage: string;
  createdAt: string;
  jwt: string;
}

export const authService = {
  async integratedLogin(
    token: string,
    functionality: string
  ): Promise<LoginResponse> {
    console.log(API_URL);
    const url = `${API_URL}/auth/integrated-login?functionality=${functionality}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "integrated-login-token": `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Error en la respuesta del servidor:", response.statusText);
      throw {
        status: response.status,
        message: `HTTP error! status: ${response.status}`,
      };
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
