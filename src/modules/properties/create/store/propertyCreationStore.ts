import { create } from "zustand"
import type { PropertyPayload } from "@/types/property.types"
import { DEFAULT_PROPERTY_PAYLOAD } from "@/types/property.types"

/**
 * Property creation / edit store.
 *
 * Uses the same nested PropertyPayload shape from the types file
 * so that the wizard state can be sent directly to the API without
 * manual field mapping.
 */
interface PropertyCreationStore {
  form: PropertyPayload

  /** Deep-merge partial updates into the form. */
  updateForm: (partial: Partial<PropertyPayload>) => void

  /** Shallow-update a single top-level key. */
  updateField: <K extends keyof PropertyPayload>(
    key: K,
    value: PropertyPayload[K]
  ) => void

  /** Reset the form back to defaults. */
  reset: () => void

  /** Load an existing property into the form (for edit mode). */
  loadFromProperty: (data: Partial<PropertyPayload>) => void
}

export const usePropertyCreationStore =
  create<PropertyCreationStore>((set) => ({
    form: { ...DEFAULT_PROPERTY_PAYLOAD },

    updateForm: (partial) =>
      set((state) => ({
        form: deepMerge(state.form, partial),
      })),

    updateField: (key, value) =>
      set((state) => ({
        form: {
          ...state.form,
          [key]: value,
        },
      })),

    reset: () =>
      set({
        form: { ...DEFAULT_PROPERTY_PAYLOAD },
      }),

    loadFromProperty: (data) =>
      set({
        form: deepMerge({ ...DEFAULT_PROPERTY_PAYLOAD }, data),
      }),
  }))


// ─── Utility: deep merge ────────────────────────────────────────────────────

function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target }

  for (const key in source) {
    const sourceVal = source[key]
    const targetVal = target[key]

    if (
      sourceVal !== null &&
      typeof sourceVal === "object" &&
      !Array.isArray(sourceVal) &&
      targetVal !== null &&
      typeof targetVal === "object" &&
      !Array.isArray(targetVal)
    ) {
      ;(result as any)[key] = deepMerge(
        targetVal as Record<string, any>,
        sourceVal as Record<string, any>
      )
    } else {
      ;(result as any)[key] = sourceVal
    }
  }

  return result
}