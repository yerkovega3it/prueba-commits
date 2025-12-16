/**
 * Constantes generales para las variables de entorno que se utilizaran en el sitio web.
 */
interface EnvironmentVariables {
  ENVIRONMENT: "development" | "staging" | "production";
  API_URL: string | undefined;
  AMSA_LOGIN_URL: string | undefined;
  AMSA_LOGOUT_URL: string | undefined;
}

const getRuntimeEnv = (): Partial<Record<keyof Window["__ENV__"], string>> => {
  if (typeof window === "undefined") return {};
  return window.__ENV__ ?? {};
};

const ev: EnvironmentVariables = {
  ENVIRONMENT: "development",
  API_URL: undefined,
  AMSA_LOGIN_URL: undefined,
  AMSA_LOGOUT_URL: undefined,
};

if (import.meta.env) {
  const runtimeEnv = getRuntimeEnv();
  ev.AMSA_LOGIN_URL =
    runtimeEnv.VITE_AMSA_LOGIN_URL ?? import.meta.env.VITE_AMSA_LOGIN_URL;
  ev.AMSA_LOGOUT_URL =
    runtimeEnv.VITE_AMSA_LOGOUT_URL ?? import.meta.env.VITE_AMSA_LOGOUT_URL;
  ev.API_URL = runtimeEnv.VITE_API_URL ?? import.meta.env.VITE_API_URL;
  ev.ENVIRONMENT = (runtimeEnv.VITE_ENVIRONMENT ??
    import.meta.env.VITE_ENVIRONMENT) as "development" | "staging" | "production";
}

const { ENVIRONMENT, API_URL, AMSA_LOGIN_URL, AMSA_LOGOUT_URL } = ev;
export { ENVIRONMENT, API_URL, AMSA_LOGIN_URL, AMSA_LOGOUT_URL };
