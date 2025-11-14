import axios, { AxiosError } from 'axios'
import type { AxiosInstance } from 'axios'
import { APP_URL } from '@/constants'

// Handler registrable para redirecciones (lo setea NavigationBridge)
let unauthorizedHandler: (() => void) | null = null

export const setUnauthorizedHandler = (handler: () => void): void => {
  unauthorizedHandler = handler
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: APP_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor de request → agrega el token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor de response → dispara handler si 401/403
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    if (status === 401 || status === 403) {
      unauthorizedHandler?.() // aquí llama al handler registrado por NavigationBridge
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
