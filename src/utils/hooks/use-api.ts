import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Базовый API клиент для внутренних запросов
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 10000,
})

// Внешний API клиент для запросов к внешним серверам
const externalApi = axios.create({
  timeout: 15000, // Увеличиваем timeout для внешних запросов
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
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchInterval?: number
    refetchIntervalInBackground?: boolean
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
        const response = await client.get<unknown>(url)
        const payload: unknown = response.data

        // Если это внешний API, возвращаем данные напрямую (или null, но не undefined)
        if (isExternalUrl(url)) {
          return (payload ?? null) as T | null
        }

        // Нет содержимого
        if (response.status === 204) {
          return null
        }

        // Если сервер оборачивает ответ в { data: ... }
        if (hasDataKey(payload)) {
          return ((payload.data as unknown) ?? null) as T | null
        }

        // Иначе возвращаем payload как есть или null (чтобы не вернуть undefined)
        return (payload ?? null) as T | null
      } catch {
        return null
      }
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
    gcTime: options?.gcTime,
    retry: options?.retry ?? 2,
    retryDelay: options?.retryDelay ?? 1000,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
    refetchOnMount: options?.refetchOnMount,
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
  }
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (variables: V): Promise<T> => {
      try {
        const client = getApiClient(url)
        const response = await client.post<unknown>(url, variables)
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
      // Инвалидируем все запросы для обновления данных
      queryClient.invalidateQueries()
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
  }
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (variables: V): Promise<T> => {
      try {
        const client = getApiClient(url)
        const response = await client.put<unknown>(url, variables)
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
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      options?.onError?.(error)
    },
  })
}

// Хук для DELETE запросов
export function useApiDelete<T>(
  url: string,
  options?: {
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
  }
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (): Promise<T> => {
      try {
        const client = getApiClient(url)
        const response = await client.delete<unknown>(url)
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
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      options?.onError?.(error)
    },
  })
}

export { api, externalApi }
