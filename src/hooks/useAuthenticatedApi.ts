import { useEffect } from "react"

import { useAuthState } from "@/hooks/useAuthState"
import { useApiQuery } from "@/utils/hooks/use-api"

/**
 * Хук для выполнения авторизованных API запросов
 * Автоматически добавляет токен авторизации в заголовки
 */
export function useAuthenticatedApiQuery<T>(
  key: string[],
  url: string,
  options?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    retry?: number
    retryDelay?: number
    useMock?: boolean
    mockFn?: () => Promise<T>
    refetchOnMount?: boolean
    refetchOnWindowFocus?: boolean
    refetchOnReconnect?: boolean
    refetchInterval?: number
    refetchIntervalInBackground?: boolean
  }
) {
  const { token, isAuthenticated } = useAuthState()

  // Логируем токен для отладки
  useEffect(() => {
    if (isAuthenticated && token) {
      console.log("🔑 Используем токен для запроса:", token)
    }
  }, [isAuthenticated, token])

  return useApiQuery<T>(key, url, {
    ...options,
    enabled: options?.enabled !== false && isAuthenticated && !!token,
  })
}
