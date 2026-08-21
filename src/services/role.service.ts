/**
 * @deprecated — This service is no longer used.
 * All RBAC operations now go through @/services/rbac.service.ts
 * which uses the combined /admin/roles-permissions endpoint.
 */

import api from "@/api/axios";

export const getRoles = async () => {
  const response = await api.get("/admin/roles-permissions");
  return response.data;
};

export const getRoleById = async (id: string) => {
  const response = await api.get(`/admin/roles-permissions`);
  const roles = response.data?.data?.roles || [];
  return roles.find((r: any) => r.role === id) || null;
};

export const createRole = async (data: { name: string; permissions: string[] }) => {
  // Not supported by current API
  throw new Error("Role creation is not supported by the current API");
};

export const updateRole = async (id: string, data: { permissions: string[] }) => {
  const response = await api.patch(`/admin/roles-permissions/${id}`, data);
  return response.data;
};

export const deleteRole = async (id: string) => {
  // Not supported by current API
  throw new Error("Role deletion is not supported by the current API");
};