/// <reference types="vite/client" />

interface Window {
  __ENV__: {
    VITE_ENVIRONMENT: string
    VITE_API_URL: string
    VITE_AMSA_LOGIN_URL: string
    VITE_AMSA_LOGOUT_URL: string
  }
}
