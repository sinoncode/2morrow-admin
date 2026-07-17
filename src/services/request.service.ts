import api from "@/api/axios";
import type { RequestResponse } from "@/types/request.types";

export interface CreateRequestPayload {
  identity: {
    first_name: string;
    last_name: string;
  };
  contact: {
    phones: string;
    emails: string;
    language: string;
  };
  requirements: {
    transaction: string;
    category: string;
    budget_min: string;
    budget_max: string;
    currency: string;
    rooms_min: number | null;
    rooms_max: number | null;
  };
  location: {
    zip: string;
    city: string;
    country: string;
    radius: number;
  };
  notes: {
    memo: string;
    notes: string;
  };
  status: string;
}

export const getRequests = async () => {
    const response = await api.get<RequestResponse>("/requests");
    return response.data;
};

export const createRequest = async (payload: CreateRequestPayload) => {
    const response = await api.post("/requests", payload);
    return response.data;
};

export const deleteRequest = async (id: number) => {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
};

