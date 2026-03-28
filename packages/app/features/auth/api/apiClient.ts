import axios from 'axios'
import type { AuthAdapter } from '../domain/types'

let authAdapterRef: AuthAdapter | null = null

export function setAuthAdapter(adapter: AuthAdapter) {
  authAdapterRef = adapter
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.EXPO_PUBLIC_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: inject JWT Bearer token
apiClient.interceptors.request.use(
  async (config) => {
    if (authAdapterRef) {
      const token = await authAdapterRef.getIdToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: handle 401 unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token may be expired — try to refresh
      if (authAdapterRef) {
        try {
          const newToken = await authAdapterRef.getIdToken()
          if (newToken && error.config) {
            error.config.headers.Authorization = `Bearer ${newToken}`
            return apiClient.request(error.config)
          }
        } catch {
          // Refresh failed — user must re-authenticate
        }
      }
    }
    return Promise.reject(error)
  }
)
