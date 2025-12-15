/**
 * Constantes generales para las variables de entorno que se utilizaran en el sitio web.
 */
interface EnvironmentVariables {
  ENVIRONMENT: "development" | "staging" | "production";
  API_URL: string | undefined;
  AMSA_LOGIN_URL: string | undefined;
  AMSA_LOGOUT_URL: string | undefined;
}

const ev: EnvironmentVariables = {
  ENVIRONMENT: "development",
  API_URL: undefined,
  AMSA_LOGIN_URL: undefined,
  AMSA_LOGOUT_URL: undefined,
};

if (import.meta.env) {
  ev.AMSA_LOGIN_URL = import.meta.env.VITE_AMSA_LOGIN_URL;
  ev.AMSA_LOGOUT_URL = import.meta.env.VITE_AMSA_LOGOUT_URL;
  ev.API_URL = import.meta.env.VITE_API_URL;
  ev.ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT as
    | "development"
    | "staging"
    | "production";
}

const { ENVIRONMENT, API_URL, AMSA_LOGIN_URL, AMSA_LOGOUT_URL } = ev;
export { ENVIRONMENT, API_URL, AMSA_LOGIN_URL, AMSA_LOGOUT_URL };
