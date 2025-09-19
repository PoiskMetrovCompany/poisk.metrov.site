import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Базовый API клиент для внутренних запросов
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 30000,
})

// Интерцептор для добавления токена авторизации
api.interceptors.request.use((config) => {
  // Получаем токен из cookies
  const cookies = document.cookie.split(";")
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("access_token=")
  )

  if (tokenCookie) {
    const token = tokenCookie.split("=")[1]
    // config.headers.Authentication = `Bearer ${token}`
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Внешний API клиент для запросов к внешним серверам
const externalApi = axios.create({
  timeout: 30000, // Увеличиваем timeout для внешних запросов
})

// Типы для API ответов
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// Функция для определения типа URL
function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://")
}

// Функция для получения правильного API клиента
function getApiClient(url: string) {
  return isExternalUrl(url) ? externalApi : api
}

// Узкий type-guard для ответов формата { data: ... }
function hasDataKey(value: unknown): value is { data: unknown } {
  return typeof value === "object" && value !== null && "data" in value
}

// Хук для GET запросов
export function useApiQuery<T>(
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
    timeout?: number
  }
) {
  return useQuery({
    queryKey: key,
    queryFn: async (): Promise<T | null> => {
      try {
        // Если включен мок-режим и предоставлена мок-функция
        if (options?.useMock && options?.mockFn) {
          return await options.mockFn()
        }

        const client = getApiClient(url)

        // Создаем конфигурацию с кастомным таймаутом, если он указан
        const config = options?.timeout ? { timeout: options.timeout } : {}
        const response = await client.get<unknown>(url, config)
        const payload: unknown = response.data

        // Логирование для отладки запросов к вакансиям
        if (key.includes("vacancies")) {
          console.log("🌐 API Query для вакансий:", {
            url,
            isExternal: isExternalUrl(url),
            responseStatus: response.status,
            payloadType: typeof payload,
            payloadKeys:
              payload && typeof payload === "object"
                ? Object.keys(payload as object)
                : "not object",
            payload,
          })
        }

        // Если это внешний API, возвращаем данные напрямую (или null, но не undefined)
        if (isExternalUrl(url)) {
          const result = (payload ?? null) as T | null
          if (key.includes("vacancies")) {
            console.log("📤 Возвращаем результат внешнего API:", result)
          }
          return result
        }

        // Нет содержимого
        if (response.status === 204) {
          return null
        }

        // Если сервер оборачивает ответ в { data: ... }
        if (hasDataKey(payload)) {
          const result = ((payload.data as unknown) ?? null) as T | null
          if (key.includes("vacancies")) {
            console.log("📤 Возвращаем результат из payload.data:", result)
          }
          return result
        }

        // Иначе возвращаем payload как есть или null (чтобы не вернуть undefined)
        const result = (payload ?? null) as T | null
        if (key.includes("vacancies")) {
          console.log("📤 Возвращаем payload как есть:", result)
        }
        return result
      } catch (error) {
        console.log("❌ Ошибка в useApiQuery:", error)
        return null
      }
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
    gcTime: options?.gcTime,
    retry: options?.retry ?? 2,
    retryDelay: options?.retryDelay ?? 1000,
    refetchOnMount: options?.refetchOnMount ?? true,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? true,
    refetchOnReconnect: options?.refetchOnReconnect ?? true,
    refetchInterval: options?.refetchInterval,
    refetchIntervalInBackground: options?.refetchIntervalInBackground ?? false,
  })
}

// Хук для POST запросов
export function useApiMutation<T, V>(
  url: string,
  options?: {
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
    invalidateQueries?: string[] | false // Добавляем опцию для контроля инвалидации
    timeout?: number
  }
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (variables: V): Promise<T> => {
      try {
        const client = getApiClient(url)

        // Создаем конфигурацию с кастомным таймаутом, если он указан
        const config = options?.timeout ? { timeout: options.timeout } : {}
        const response = await client.post<unknown>(url, variables, config)
        const payload: unknown = response.data

        if (isExternalUrl(url)) {
          return payload as T
        }

        if (hasDataKey(payload)) {
          return payload.data as T
        }

        return payload as T
      } catch (_error) {
        console.error("API Mutation Error:", _error)
        throw _error as Error
      }
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data)

      // Инвалидируем только указанные запросы или все, если не указано
      if (options?.invalidateQueries === false) {
        // Не инвалидируем ничего
        return
      } else if (
        options?.invalidateQueries &&
        Array.isArray(options.invalidateQueries)
      ) {
        // Инвалидируем только указанные ключи запросов
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] })
        })
      } else {
        // По умолчанию инвалидируем все запросы (для обратной совместимости)
        queryClient.invalidateQueries()
      }
    },
    onError: (error) => {
      options?.onError?.(error)
    },
  })
}

// Хук для PUT запросов
export function useApiUpdate<T, V>(
  url: string,
  options?: {
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
    invalidateQueries?: string[] | false
    timeout?: number
  }
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (variables: V): Promise<T> => {
      try {
        const client = getApiClient(url)

        // Создаем конфигурацию с кастомным таймаутом, если он указан
        const config = options?.timeout ? { timeout: options.timeout } : {}
        const response = await client.put<unknown>(url, variables, config)
        const payload: unknown = response.data

        if (isExternalUrl(url)) {
          return payload as T
        }

        if (hasDataKey(payload)) {
          return payload.data as T
        }

        return payload as T
      } catch (_error) {
        console.error("API Update Error:", _error)
        throw _error as Error
      }
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data)

      // Инвалидируем только указанные запросы или все, если не указано
      if (options?.invalidateQueries === false) {
        return
      } else if (
        options?.invalidateQueries &&
        Array.isArray(options.invalidateQueries)
      ) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] })
        })
      } else {
        queryClient.invalidateQueries()
      }
    },
    onError: (error) => {
      options?.onError?.(error)
    },
  })
}

export function useApiDelete<T, V = void>(
  url: string,
  options?: {
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
    invalidateQueries?: string[] | false
    timeout?: number
  }
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (variables: V): Promise<T> => {
      try {
        const client = getApiClient(url)

        let requestUrl = url
        if (variables && typeof variables === "object") {
          const params = new URLSearchParams()
          Object.entries(variables as Record<string, unknown>).forEach(
            ([key, value]) => {
              if (value !== undefined && value !== null) {
                params.append(key, String(value))
              }
            }
          )
          if (params.toString()) {
            requestUrl += (url.includes("?") ? "&" : "?") + params.toString()
          }
        }

        // Создаем конфигурацию с кастомным таймаутом, если он указан
        const config = options?.timeout ? { timeout: options.timeout } : {}
        const response = await client.delete<unknown>(requestUrl, config)
        const payload: unknown = response.data

        if (isExternalUrl(url)) {
          return payload as T
        }

        if (hasDataKey(payload)) {
          return payload.data as T
        }

        return payload as T
      } catch (_error) {
        console.error("API Delete Error:", _error)
        throw _error as Error
      }
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data)

      // Инвалидируем только указанные запросы или все, если не указано
      if (options?.invalidateQueries === false) {
        return
      } else if (
        options?.invalidateQueries &&
        Array.isArray(options.invalidateQueries)
      ) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] })
        })
      } else {
        queryClient.invalidateQueries()
      }
    },
    onError: (error) => {
      options?.onError?.(error)
    },
  })
}

export { api, externalApi }
