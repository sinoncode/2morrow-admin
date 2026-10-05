import { create } from "zustand"

import {
    getContacts,
} from "../../services/contact.service"

import type {
    ContactListMeta,
    ContactProfile,
} from "../../types/contact.types"

interface ContactStore {
    contacts: ContactProfile[]
    meta: ContactListMeta | null

    loading: boolean
    error: string | null

    fetchContacts: (page?: number) => Promise<void>

    setContacts: (contacts: ContactProfile[]) => void
    clearContacts: () => void
    clearError: () => void
}

export const useContactStore = create<ContactStore>((set) => ({
    contacts: [],
    meta: null,

    loading: false,
    error: null,

    fetchContacts: async (page = 1) => {
        set({
            loading: true,
            error: null,
        })

        try {
            const response = await getContacts({
                page,
            })

            set({
                contacts: response.data,
                meta: response.meta,
                loading: false,
                error: null,
            })
        } catch (error) {
            console.error("Failed to fetch contacts:", error)

            set({
                contacts: [],
                meta: null,
                loading: false,
                error: "Failed to load contacts.",
            })
        }
    },

    setContacts: (contacts) => {
        set({
            contacts,
        })
    },

    clearContacts: () => {
        set({
            contacts: [],
            meta: null,
        })
    },

    clearError: () => {
        set({
            error: null,
        })
    },
}))