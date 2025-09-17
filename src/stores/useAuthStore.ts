import { create } from "zustand"

interface AuthUser {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  key: string
  crm_id: number
  api_token: string
  chat_token: string
  name: string
  email: string | null
  role: string
  phone: string
  surname: string
  patronymic: string | null
  crm_city: string
  is_test: number
}

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: AuthUser | null
  login: (token: string, user: AuthUser) => void
  logout: () => void
  setToken: (token: string) => void
  setUser: (user: AuthUser) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,

  login: (token: string, user: AuthUser) => {
    set({
      isAuthenticated: true,
      token,
      user,
    })
  },

  logout: () => {
    set({
      isAuthenticated: false,
      token: null,
      user: null,
    })
  },

  setToken: (token: string) => {
    set({ token })
  },

  setUser: (user: AuthUser) => {
    set({ user })
  },
}))
