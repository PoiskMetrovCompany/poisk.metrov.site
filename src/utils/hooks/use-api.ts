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
  }
) {
  return useQuery({
    queryKey: key,
    queryFn: async (): Promise<T> => {
      try {
        // Если включен мок-режим и предоставлена мок-функция
        if (options?.useMock && options?.mockFn) {
          return await options.mockFn()
        }

        const client = getApiClient(url)
        const response = await client.get<T>(url)

        // Если это внешний API, возвращаем данные напрямую
        if (isExternalUrl(url)) {
          return response.data
        }

        // Если это внутренний API, ожидаем структуру ApiResponse
        const apiResponse = response.data as ApiResponse<T>
        return apiResponse.data
      } catch (error) {
        console.error("API Query Error:", error)
        throw error
      }
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
    gcTime: options?.gcTime,
    retry: options?.retry ?? 2,
    retryDelay: options?.retryDelay ?? 1000,
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
        const response = await client.post<T>(url, variables)

        if (isExternalUrl(url)) {
          return response.data
        }

        const apiResponse = response.data as ApiResponse<T>
        return apiResponse.data
      } catch (error) {
        console.error("API Mutation Error:", error)
        throw error
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
        const response = await client.put<T>(url, variables)

        if (isExternalUrl(url)) {
          return response.data
        }

        const apiResponse = response.data as ApiResponse<T>
        return apiResponse.data
      } catch (error) {
        console.error("API Update Error:", error)
        throw error
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
        const response = await client.delete<T>(url)

        if (isExternalUrl(url)) {
          return response.data
        }

        const apiResponse = response.data as ApiResponse<T>
        return apiResponse.data
      } catch (error) {
        console.error("API Delete Error:", error)
        throw error
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
