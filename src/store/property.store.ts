import { create } from "zustand"
import { PropertyService } from "@/api/services/property.service"

interface Property {
  id: string
  title: string
}

interface PropertyState {
  loading: boolean
  properties: Property[]

  fetchProperties: () => Promise<void>
}

export const usePropertyStore = create<PropertyState>((set) => ({
  loading: false,

  properties: [],

  fetchProperties: async () => {
    set({ loading: true })

    try {
      const response = await PropertyService.getAll()

      set({
        properties: response.data,
      })
    } finally {
      set({
        loading: false,
      })
    }
  },
}))