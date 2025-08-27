"use client"

import { useApiMutation, useApiQuery } from "@/utils/hooks/use-api"

// Пример типа данных
interface Property {
  id: number
  title: string
  price: number
  location: string
}

interface CreatePropertyData {
  title: string
  price: number
  location: string
}

// Пример компонента с использованием React Query
export function PropertyList() {
  // Получение списка недвижимости
  const {
    data: properties,
    isLoading,
    error,
    refetch,
  } = useApiQuery<Property[]>(["properties"], "/properties", {
    staleTime: 5 * 60 * 1000, // 5 минут
    gcTime: 10 * 60 * 1000, // 10 минут
  })

  // Мутация для создания новой недвижимости
  const createPropertyMutation = useApiMutation<Property, CreatePropertyData>(
    "/properties",
    {
      onSuccess: (data) => {
        console.log("Недвижимость создана:", data)
        // Данные автоматически обновятся благодаря invalidateQueries
      },
      onError: (error) => {
        console.error("Ошибка создания:", error)
      },
    }
  )

  const handleCreateProperty = () => {
    createPropertyMutation.mutate({
      title: "Новая квартира",
      price: 5000000,
      location: "Москва",
    })
  }

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    return (
      <div>
        <p>Ошибка загрузки: {error.message}</p>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Список недвижимости</h2>

      <button
        onClick={handleCreateProperty}
        disabled={createPropertyMutation.isPending}
      >
        {createPropertyMutation.isPending
          ? "Создание..."
          : "Добавить недвижимость"}
      </button>

      {properties && properties.length > 0 ? (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <h3>{property.title}</h3>
              <p>Цена: {property.price.toLocaleString()} ₽</p>
              <p>Расположение: {property.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Недвижимость не найдена</p>
      )}
    </div>
  )
}

// Пример использования с условным запросом
export function ConditionalPropertyQuery({
  propertyId,
}: {
  propertyId?: number
}) {
  const {
    data: property,
    isLoading,
    error,
  } = useApiQuery<Property>(
    ["property", propertyId],
    `/properties/${propertyId}`,
    {
      enabled: !!propertyId, // Запрос выполнится только если есть propertyId
    }
  )

  if (!propertyId) {
    return <div>Выберите недвижимость</div>
  }

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>
  }

  return (
    <div>
      <h3>{property.title}</h3>
      <p>Цена: {property.price.toLocaleString()} ₽</p>
      <p>Расположение: {property.location}</p>
    </div>
  )
}
