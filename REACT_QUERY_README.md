# React Query (TanStack Query) - Руководство по использованию

## Установка

React Query уже установлен в проекте. Установлены следующие пакеты:

- `@tanstack/react-query` - основная библиотека
- `@tanstack/react-query-devtools` - инструменты разработчика

## Настройка

### 1. QueryProvider

Провайдер уже настроен в `src/providers/query-provider.tsx` и подключен в `src/app/layout-client.tsx`.

### 2. Конфигурация по умолчанию

- `staleTime`: 1 минута - время, в течение которого данные считаются свежими
- `gcTime`: 10 минут - время хранения неактивных данных в кеше
- `retry`: 1 - количество попыток повтора при ошибке
- `refetchOnWindowFocus`: false - не обновлять данные при фокусе окна

## Основные хуки

### useApiQuery - для GET запросов

```typescript
const { data, isLoading, error, refetch } = useApiQuery<DataType>(
  ["queryKey"], // уникальный ключ для кеширования
  "/api/endpoint", // URL эндпоинта
  {
    enabled: true, // выполнять ли запрос
    staleTime: 5 * 60 * 1000, // время свежести данных (5 минут)
    gcTime: 10 * 60 * 1000, // время жизни в кеше (10 минут)
  }
)
```

### useApiMutation - для POST запросов

```typescript
const mutation = useApiMutation<ResponseType, RequestType>("/api/endpoint", {
  onSuccess: (data) => {
    // обработка успешного ответа
  },
  onError: (error) => {
    // обработка ошибки
  },
})

// Использование
mutation.mutate(requestData)
```

### useApiUpdate - для PUT запросов

```typescript
const updateMutation = useApiUpdate<ResponseType, RequestType>(
  "/api/endpoint",
  {
    onSuccess: (data) => {
      // обработка успешного обновления
    },
  }
)
```

### useApiDelete - для DELETE запросов

```typescript
const deleteMutation = useApiDelete<ResponseType>("/api/endpoint", {
  onSuccess: (data) => {
    // обработка успешного удаления
  },
})
```

## Примеры использования

### 1. Простой запрос данных

```typescript
function PropertyList() {
  const { data: properties, isLoading, error } = useApiQuery(
    ['properties'],
    '/api/properties'
  );

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <ul>
      {properties?.map(property => (
        <li key={property.id}>{property.title}</li>
      ))}
    </ul>
  );
}
```

### 2. Условный запрос

```typescript
function PropertyDetails({ propertyId }: { propertyId?: number }) {
  const { data: property } = useApiQuery(
    ['property', propertyId],
    `/api/properties/${propertyId}`,
    {
      enabled: !!propertyId, // запрос выполнится только при наличии ID
    }
  );

  if (!propertyId) return <div>Выберите недвижимость</div>;
  if (!property) return <div>Загрузка...</div>;

  return <div>{property.title}</div>;
}
```

### 3. Мутация с обработкой состояний

```typescript
function CreatePropertyForm() {
  const createMutation = useApiMutation<Property, CreatePropertyData>(
    '/api/properties',
    {
      onSuccess: (data) => {
        alert('Недвижимость создана!');
      },
      onError: (error) => {
        alert(`Ошибка: ${error.message}`);
      },
    }
  );

  const handleSubmit = (formData: CreatePropertyData) => {
    createMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* поля формы */}
      <button
        type="submit"
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? 'Создание...' : 'Создать'}
      </button>
    </form>
  );
}
```

## Кеширование и инвалидация

### Автоматическая инвалидация

Все мутации автоматически инвалидируют кеш, вызывая `queryClient.invalidateQueries()`.

### Ручная инвалидация

```typescript
import { useQueryClient } from '@tanstack/react-query';

function SomeComponent() {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    // Инвалидировать конкретный запрос
    queryClient.invalidateQueries({ queryKey: ['properties'] });

    // Инвалидировать все запросы
    queryClient.invalidateQueries();
  };

  return <button onClick={handleRefresh}>Обновить</button>;
}
```

## Оптимизация производительности

### 1. Настройка staleTime

```typescript
// Данные остаются свежими 10 минут
const { data } = useApiQuery(["properties"], "/api/properties", {
  staleTime: 10 * 60 * 1000,
})
```

### 2. Настройка gcTime

```typescript
// Данные хранятся в кеше 30 минут
const { data } = useApiQuery(["properties"], "/api/properties", {
  gcTime: 30 * 60 * 1000,
})
```

### 3. Условные запросы

```typescript
// Запрос выполнится только при определенных условиях
const { data } = useApiQuery(["properties", filters], "/api/properties", {
  enabled: !!filters.search && filters.search.length > 2,
})
```

## Обработка ошибок

### Глобальная обработка ошибок

```typescript
const { data, error } = useApiQuery(['properties'], '/api/properties');

if (error) {
  return (
    <div>
      <p>Произошла ошибка: {error.message}</p>
      <button onClick={() => refetch()}>Повторить</button>
    </div>
  );
}
```

### Обработка в мутациях

```typescript
const mutation = useApiMutation<Property, CreatePropertyData>(
  "/api/properties",
  {
    onError: (error) => {
      if (error.response?.status === 400) {
        alert("Неверные данные")
      } else if (error.response?.status === 500) {
        alert("Ошибка сервера")
      }
    },
  }
)
```

## DevTools

React Query DevTools доступны в режиме разработки. Они показывают:

- Все активные запросы
- Состояние кеша
- Время выполнения запросов
- Возможность инвалидации кеша

## Лучшие практики

1. **Используйте уникальные queryKey** для каждого типа данных
2. **Настраивайте staleTime** в зависимости от частоты обновления данных
3. **Используйте enabled** для условных запросов
4. **Обрабатывайте все состояния** (loading, error, success)
5. **Используйте TypeScript** для типизации данных
6. **Группируйте связанные запросы** по queryKey

## Полезные ссылки

- [Официальная документация TanStack Query](https://tanstack.com/query/latest)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)
- [Примеры использования](https://tanstack.com/query/latest/docs/react/examples/react/basic)
