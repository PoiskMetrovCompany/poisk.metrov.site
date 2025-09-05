import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface City {
  name: string
  id: string
  slug: string
}

export interface LocationState {
  selectedCity: City | null

  setSelectedCity: (city: City) => void
  resetLocation: () => void
}

const initialState = {
  selectedCity: null,
}

export const useLocationStore = create<LocationState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setSelectedCity: (city) => set({ selectedCity: city }),

        resetLocation: () => set(initialState),
      }),
      {
        name: "location-storage",
        partialize: (state) => ({
          selectedCity: state.selectedCity,
        }),
      }
    ),
    {
      name: "location-store",
    }
  )
)
