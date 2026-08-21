// src/services/rbac.service.ts

import api from "@/api/axios";
import type { Role } from "@/types/rbac";

// ============================================
// TYPES
// ============================================

interface ApiRole {
  role: string;
  permissions: string[];
}

interface RolesPermissionsData {
  availablePermissions: string[];
  roles: ApiRole[];
}

interface ApiResponse {
  success: boolean;
  data: RolesPermissionsData;
  message: string;
}

// ============================================
// NORMALIZERS
// ============================================

/**
 * Map an API role { role, permissions } into the frontend-compatible
 * shape { id, name, role, permissions } so existing UI components
 * that reference role.id / role.name keep working without changes.
 */
const normalizeRole = (apiRole: ApiRole): Role => ({
  id: apiRole.role,
  name: apiRole.role,
  role: apiRole.role,
  permissions: Array.isArray(apiRole.permissions)
    ? apiRole.permissions.filter(Boolean)
    : [],
});

// ============================================
// GET ROLES & PERMISSIONS (combined endpoint)
// ============================================

/**
 * Fetch all roles and available permissions in a single call.
 * GET /admin/roles-permissions
 *
 * Returns { roles: Role[], availablePermissions: string[] }
 */
export const getRolesPermissions = async (): Promise<{
  roles: Role[];
  availablePermissions: string[];
}> => {
  const response = await api.get<ApiResponse>("/admin/roles-permissions");

  const data = response?.data?.data ?? response?.data;

  const rawRoles: ApiRole[] = Array.isArray((data as any)?.roles)
    ? (data as any).roles
    : [];

  const availablePermissions: string[] = Array.isArray(
    (data as any)?.availablePermissions
  )
    ? (data as any).availablePermissions
    : [];

  const roles = rawRoles.map(normalizeRole);

  return { roles, availablePermissions };
};

// ============================================
// UPDATE ROLE PERMISSIONS
// ============================================

/**
 * Update permissions for a specific role.
 * PATCH /admin/roles-permissions/{role}
 */
export const updateRolePermissions = async (
  role: string,
  permissions: string[]
): Promise<Role> => {
  const response = await api.patch(
    `/admin/roles-permissions/${encodeURIComponent(role)}`,
    { permissions }
  );

  // If the API returns the updated role, normalize and return it.
  // Otherwise return a best-effort constructed role.
  const updatedData = response?.data?.data ?? response?.data;

  if (updatedData && typeof updatedData === "object" && "role" in updatedData) {
    return normalizeRole(updatedData as ApiRole);
  }

  // Fallback: construct the updated role from what we sent
  return {
    id: role,
    name: role,
    role,
    permissions,
  };
};

// ============================================
// LEGACY EXPORTS (kept for backward compat, now no-ops)
// ============================================

/** @deprecated Use getRolesPermissions() instead */
export const getRoles = getRolesPermissions;

/** @deprecated Use getRolesPermissions() instead */
export const getPermissions = getRolesPermissions;