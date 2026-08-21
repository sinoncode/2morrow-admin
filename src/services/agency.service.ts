import api from "@/api/axios";
import type {
  AgencyPayload,
  AgencyProfileItem,
  AgencyListParams,
  AgencyListResponse,
  AgencyResponse,
  AgencyRequestPayload,
} from "@/types/agency.types";

export const AgencyService = {
  /**
   * Get all agency profiles with optional filters and pagination.
   * GET /agency-profiles
   */
  getAll: (params?: AgencyListParams) => {
    return api.get<AgencyListResponse>("/agency-profiles", { params });
  },

  /**
   * Get an agency profile by ID.
   * GET /agency-profiles/:id
   */
  getById: (id: number | string) => {
    return api.get<AgencyResponse>(`/agency-profiles/${id}`);
  },

  /**
   * Create a new agency profile.
   * POST /agency-profiles
   */
  create: (payload: AgencyRequestPayload) => {
    return api.post<AgencyResponse>("/agency-profiles", payload);
  },

  /**
   * Update an existing agency profile.
   * PUT /agency-profiles/:id
   */
  update: (id: number | string, payload: AgencyRequestPayload) => {
    return api.put<AgencyResponse>(`/agency-profiles/${id}`, payload);
  },

  /**
   * Delete an agency profile.
   * DELETE /agency-profiles/:id
   */
  delete: (id: number | string) => {
    return api.delete<{ success: boolean; message: string }>(`/agency-profiles/${id}`);
  },
};

export default AgencyService;
