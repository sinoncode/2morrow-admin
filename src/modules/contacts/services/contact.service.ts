import api from "@/api/axios"

import type {
    ContactListResponse,
} from "../types/contact.types"

export interface GetContactsParams {
    page?: number
    per_page?: number
}

export const getContacts = async (
    params?: GetContactsParams
): Promise<ContactListResponse> => {
    const response = await api.get<ContactListResponse>(
        "/contact-profiles",
        {
            params,
        }
    )

    return response.data
}