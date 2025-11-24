import { redirect } from "react-router-dom";

import type {
  Permission,
  User,
  LoginResponse,
} from "@/interfaces/auth/Login.interface";

export const AUTH_TOKEN_KEY = "auth_token";
export const USER_KEY = "user_data";
export const PERMISSIONS_KEY = "user_permissions";
export const LOGIN_TYPE = "lt";

const errorMessages = {
  401: "Tu usuario o contraseña no son correctos. Por favor, verifica e intenta de nuevo.",
  404: "El servidor no está disponible en este momento. Por favor, intenta más tarde.",
  403: "No tienes permisos para acceder al sistema. Por favor, contacta a soporte.",
  500: "Error interno del servidor. Por favor, intenta más tarde.",
};

const defaultErrorMessage = (status: number) =>
  `Error de conexión (${status}). Por favor, intenta más tarde.`;

export const getErrorMessage = (status: number): string => {
  return (
    errorMessages[status as keyof typeof errorMessages] ||
    defaultErrorMessage(status)
  );
};

export const authUtils = {
  // Para sesiones persistentes (localStorage)
  setToken(token: string) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  getToken(): string | null {
    return (
      localStorage.getItem(AUTH_TOKEN_KEY) ??
      sessionStorage.getItem(AUTH_TOKEN_KEY)
    );
  },

  removeToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  },

  setUser(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser(): User | null {
    const localUser = localStorage.getItem(USER_KEY);
    const sessionUser = sessionStorage.getItem(USER_KEY);
    if (localUser) {
      return JSON.parse(localUser);
    }

    if (sessionUser) {
      return JSON.parse(sessionUser);
    }

    return null;
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  setPermissions(permissions: Permission[]) {
    localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));
  },

  getPermissions(): Permission[] {
    const permissions = localStorage.getItem(PERMISSIONS_KEY);
    return permissions ? JSON.parse(permissions) : [];
  },

  removePermissions() {
    localStorage.removeItem(PERMISSIONS_KEY);
    sessionStorage.removeItem(PERMISSIONS_KEY);
  },

  setLoginType(loginType: "integrated" | "external") {
    localStorage.setItem(LOGIN_TYPE, loginType);
  },

  getLoginType(): "integrated" | "external" | null {
    return localStorage.getItem(LOGIN_TYPE) as "integrated" | "external" | null;
  },

  loginLoader(
    response: LoginResponse,
    loginType: "integrated" | "external" = "external"
  ) {
    if (response?.error) {
      if (
        typeof response.error === "object" &&
        response.error !== null &&
        "status" in response.error &&
        "message" in response.error
      ) {
        const errorWithStatus = response.error as {
          status: number;
          message?: string;
        };
        const errorMessage =
          errorWithStatus.message || getErrorMessage(errorWithStatus.status);
        return { error: errorMessage };
      }
      return { error: errorMessages[500] };
    }

    // Verificar si el usuario está vigente
    if (!response.user?.status) {
      return {
        error:
          "Lo sentimos, tu cuenta no aparece en nuestros registros o se encuentra inactiva. Para recibir ayuda, por favor contacta a AMSA.",
      };
    }

    authUtils.setToken(response.jwt);
    authUtils.setUser(response.user);

    // Validación y actualización de permisos
    if (response?.permissions && Array.isArray(response.permissions)) {
      const permissions = response.permissions;
      authUtils.setPermissions(permissions);
    }

    authUtils.setLoginType(loginType);
    return redirect("/");
  },
};
