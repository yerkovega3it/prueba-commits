/**
 * Constantes generales para las variables de entorno que se utilizaran en el sitio web.
 */
const {
  VITE_ENVIRONMENT: ENVIRONMENT,
  VITE_API_URL: API_URL,
  VITE_AMSA_LOGIN_URL: AMSA_LOGIN_URL,
  VITE_AMSA_LOGOUT_URL: AMSA_LOGOUT_URL,
} = import.meta.env;

export { ENVIRONMENT, API_URL, AMSA_LOGIN_URL, AMSA_LOGOUT_URL };
