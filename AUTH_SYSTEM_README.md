# Система авторизации

## Обзор

Система авторизации построена на основе:

- **Zustand** для управления состоянием (только в памяти)
- **Cookies** для безопасного хранения токена (срок действия 6 месяцев)
- **React Query** для API запросов

## Структура файлов

```
src/
├── stores/
│   └── useAuthStore.ts          # Zustand store для авторизации
├── hooks/
│   ├── useAuth.ts               # Хуки для API авторизации
│   └── useAuthState.ts          # Хук для удобного использования состояния
├── utils/
│   └── auth.ts                  # Утилиты для работы с cookies
├── types/
│   └── Auth.ts                  # Типы для API авторизации
└── components/
    ├── AuthProvider.tsx         # Провайдер для инициализации авторизации
    └── header/loginForm/        # Форма авторизации
```

## Использование

### 1. Проверка состояния авторизации

```tsx
import { useAuthState } from "@/hooks/useAuthState"

function MyComponent() {
  const { isAuthenticated, token, user, logout } = useAuthState()

  if (isAuthenticated) {
    return <div>Добро пожаловать!</div>
  }

  return <div>Войдите в систему</div>
}
```

### 2. Получение токена для API запросов

```tsx
import { useAuthState } from "@/hooks/useAuthState"

function ApiComponent() {
  const { token } = useAuthState()

  const fetchData = async () => {
    const response = await fetch("/api/data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
```

### 3. Выход из системы

```tsx
import { useAuthState } from "@/hooks/useAuthState"

function LogoutButton() {
  const { logout } = useAuthState()

  return <button onClick={logout}>Выйти</button>
}
```

## API авторизации

### 1. Отправка номера телефона

```typescript
POST /api/v1/auth/authentication
Content-Type: application/json

{
  "phone": "+7 (999) 999-99-99"
}
```

### 2. Подтверждение авторизации

```typescript
POST /api/v1/auth/authorization
Content-Type: application/json

{
  "phone": "+7 (999) 999-99-99",
  "pincode": "1234"
}
```

### Ответ авторизации

```json
{
  "attributes": {
    "status": "Authorization success",
    "user": {},
    "token": {
      "type": "Bearer",
      "access_token": "1|eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
    }
  }
}
```

## Автоматическое сохранение

После успешной авторизации:

1. Токен сохраняется в cookies (срок действия 6 месяцев)
2. Состояние обновляется в Zustand store (только в памяти)
3. Форма авторизации закрывается

## Инициализация при загрузке

`AuthProvider` автоматически:

1. Проверяет наличие токена в cookies
2. Восстанавливает состояние авторизации
3. Синхронизирует Zustand store с cookies

## Безопасность

- ✅ Токены хранятся только в Secure cookies (НЕ в localStorage)
- ✅ SameSite=Strict для защиты от CSRF
- ✅ Автоматическое удаление токена при выходе
- ✅ Zustand store работает только в памяти (не сохраняется)
- ✅ Проверка валидности токена

## Примеры использования в компонентах

### Защищенный маршрут

```tsx
import { useRouter } from "next/navigation"

import { useAuthState } from "@/hooks/useAuthState"

function ProtectedPage() {
  const { isAuthenticated } = useAuthState()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return <div>Загрузка...</div>
  }

  return <div>Защищенный контент</div>
}
```

### Условный рендеринг

```tsx
import { useAuthState } from "@/hooks/useAuthState"

function Header() {
  const { isAuthenticated, logout } = useAuthState()

  return (
    <header>
      {isAuthenticated ? (
        <button onClick={logout}>Выйти</button>
      ) : (
        <LoginForm />
      )}
    </header>
  )
}
```
