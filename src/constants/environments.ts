/**
 * Constantes generales para las variables de entorno que se utilizaran en el sitio web.
 * Se prioriza window.__ENV__ para configuración en tiempo de ejecución (Docker/K8s/OpenShift).
 */

const getEnv = (key: keyof Window['__ENV__'], fallback: string = ''): string => {
  if (typeof window !== 'undefined' && window.__ENV__ && window.__ENV__[key]) {
    return window.__ENV__[key];
  }
  return import.meta.env[key] || fallback;
};

const ENVIRONMENT = getEnv('VITE_ENVIRONMENT');
const API_URL = getEnv('VITE_API_URL');
const AMSA_LOGIN_URL = getEnv('VITE_AMSA_LOGIN_URL');
const AMSA_LOGOUT_URL = getEnv('VITE_AMSA_LOGOUT_URL');

export { ENVIRONMENT, API_URL, AMSA_LOGIN_URL, AMSA_LOGOUT_URL };
