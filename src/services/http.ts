import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { APP_URL } from "@/constants";

declare module "axios" {
  export interface AxiosRequestConfig {
    authRequired?: boolean;
  }
}

type UnauthorizedStatus = 401 | 403;
export type UnauthorizedHandler = (status: UnauthorizedStatus) => void;
export type TokenProvider = () => string | null;

let tokenProvider: TokenProvider | null = () =>
  localStorage.getItem("auth_token");
let unauthorizedHandler: UnauthorizedHandler | null = null;

export function setTokenProvider(provider: TokenProvider): void {
  tokenProvider = provider;
}
export function setUnauthorizedHandler(handler: UnauthorizedHandler): void {
  unauthorizedHandler = handler;
}

export const http: AxiosInstance = axios.create({
  baseURL: APP_URL,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const requiresAuth = config.authRequired !== false;
    if (requiresAuth) {
      const token = tokenProvider?.() ?? null;
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    // el config original viaja en error.config
    const cfg = error.config as
      | (InternalAxiosRequestConfig & { authRequired?: boolean })
      | undefined;
    const requiresAuth = cfg?.authRequired !== false; // default: true
    if (
      (status === 401 || status === 403) &&
      requiresAuth &&
      unauthorizedHandler
    ) {
      unauthorizedHandler(status as UnauthorizedStatus);
    }
    return Promise.reject(error);
  }
);
