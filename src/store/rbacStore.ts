import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

import {
  getRolesPermissions,
  updateRolePermissions,
} from "@/services/rbac.service";

import type { Role } from "@/types/rbac";

// ============================================
// We build "Permission" objects for the UI from the
// availablePermissions string[] the API returns.
// The PermissionTable and Permission.tsx components
// consume permissions as objects with a `name` field.
// ============================================

interface PermissionObject {
  name: string;
}

interface RBACState {
  // ============================================
  // STATE
  // ============================================

  roles: Role[];
  permissions: PermissionObject[];
  selectedRole: Role | null;

  // Hydration flag (true once persist has rehydrated from localStorage)
  hasHydrated: boolean;

  // Loading states
  isLoadingRoles: boolean;
  isLoadingPermissions: boolean;
  isSaving: boolean;

  // Error states
  rolesError: string | null;
  permissionsError: string | null;

  // ============================================
  // ACTIONS
  // ============================================

  // Hydration
  setHasHydrated: (value: boolean) => void;

  // Fetch actions
  fetchRoles: () => Promise<void>;
  fetchPermissions: () => Promise<void>;
  fetchAllData: () => Promise<void>;
  fetchRolesPermissions: () => Promise<void>;

  // Role selection
  selectRole: (role: Role | null) => void;

  // CRUD operations
  createRole: (data: { name: string; permissions: string[] }) => Promise<Role | null>;
  updateRole: (roleId: string, data: { name: string; permissions: string[] }) => Promise<Role | null>;
  deleteRole: (roleId: string) => Promise<boolean>;

  // Utility actions
  refreshData: () => Promise<void>;
  clearErrors: () => void;
  reset: () => void;
}

export const useRBACStore = create<RBACState>()(
  persist(
    (set, get) => ({
      // ============================================
      // INITIAL STATE
      // ============================================

      roles: [],
      permissions: [],
      selectedRole: null,

      hasHydrated: false,

      isLoadingRoles: false,
      isLoadingPermissions: false,
      isSaving: false,

      rolesError: null,
      permissionsError: null,

      // ============================================
      // HYDRATION
      // ============================================

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value });
      },

      // ============================================
      // FETCH ACTIONS
      // ============================================

      /**
       * Single combined fetch — calls GET /admin/roles-permissions
       * and populates both roles[] and permissions[] in one shot.
       */
      fetchRolesPermissions: async () => {
        try {
          set({
            isLoadingRoles: true,
            isLoadingPermissions: true,
            rolesError: null,
            permissionsError: null,
          });

          const { roles, availablePermissions } = await getRolesPermissions();

          // Convert string permissions to objects with `name` field
          // so existing UI components (PermissionTable, Permission.tsx) work unchanged
          const permissionObjects: PermissionObject[] = availablePermissions.map(
            (p) => ({ name: p })
          );

          set({
            roles,
            permissions: permissionObjects,
            isLoadingRoles: false,
            isLoadingPermissions: false,
            rolesError: null,
            permissionsError: null,
          });

          // Auto-select first role if none selected
          const { selectedRole } = get();
          if (!selectedRole && roles.length > 0) {
            set({ selectedRole: roles[0] });
          }
          // If the previously selected role still exists, refresh its data
          else if (selectedRole) {
            const refreshed = roles.find((r) => r.role === selectedRole.role);
            if (refreshed) {
              set({ selectedRole: refreshed });
            } else if (roles.length > 0) {
              set({ selectedRole: roles[0] });
            }
          }
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message ||
            error.message ||
            "Failed to fetch roles and permissions";

          set({
            isLoadingRoles: false,
            isLoadingPermissions: false,
            roles: [],
            permissions: [],
            rolesError: errorMessage,
            permissionsError: errorMessage,
          });

          throw error;
        }
      },

      /**
       * @deprecated — kept for backward compatibility.
       * Now delegates to fetchRolesPermissions().
       */
      fetchRoles: async () => {
        await get().fetchRolesPermissions();
      },

      /**
       * @deprecated — kept for backward compatibility.
       * Now delegates to fetchRolesPermissions().
       */
      fetchPermissions: async () => {
        // No-op when called independently because
        // fetchRolesPermissions already populates permissions.
        // Only fetch if permissions are empty (initial load edge case).
        const { permissions } = get();
        if (permissions.length === 0) {
          await get().fetchRolesPermissions();
        }
      },

      /**
       * Fetch both roles and permissions — now a single API call.
       */
      fetchAllData: async () => {
        await get().fetchRolesPermissions();
      },

      // ============================================
      // ROLE SELECTION
      // ============================================

      /**
       * Select a role (also persisted so refresh shows last selected role)
       */
      selectRole: (role: Role | null) => {
        set({ selectedRole: role });
      },

      // ============================================
      // CRUD OPERATIONS
      // ============================================

      /**
       * Create a new role.
       * NOTE: The current API does not support role creation.
       * This is kept as a no-op to avoid breaking the UI.
       */
      createRole: async (_data: { name: string; permissions: string[] }) => {
        toast.error("Role creation is not supported by the current API.");
        return null;
      },

      /**
       * Update an existing role's permissions.
       * Uses PATCH /admin/roles-permissions/{role}
       */
      updateRole: async (
        roleId: string,
        data: { name: string; permissions: string[] }
      ) => {
        try {
          set({ isSaving: true });

          // roleId is actually the role name string (e.g. "DRIVER")
          const updatedRole = await updateRolePermissions(roleId, data.permissions);

          if (updatedRole) {
            const { roles } = get();
            const currentRoles = Array.isArray(roles) ? roles : [];
            const updatedRoles = currentRoles.map((role) =>
              role.role === roleId ? updatedRole : role
            );

            set({
              roles: updatedRoles,
              selectedRole: updatedRole,
              isSaving: false,
            });

            toast.success("Permissions saved successfully");
            return updatedRole;
          }

          set({ isSaving: false });
          return null;
        } catch (error) {
          console.error("Error updating role:", error);
          set({ isSaving: false });
          toast.error("Failed to save permissions. Please try again.");
          return null;
        }
      },

      /**
       * Delete a role.
       * NOTE: The current API does not support role deletion.
       * This is kept as a no-op to avoid breaking the UI.
       */
      deleteRole: async (_roleId: string) => {
        toast.error("Role deletion is not supported by the current API.");
        return false;
      },

      // ============================================
      // UTILITY ACTIONS
      // ============================================

      /**
       * Refresh all data from server
       */
      refreshData: async () => {
        await get().fetchRolesPermissions();
        toast.success("Data refreshed successfully");
      },

      /**
       * Clear error states
       */
      clearErrors: () => {
        set({
          rolesError: null,
          permissionsError: null,
        });
      },

      /**
       * Reset store to initial state (clears persisted data too)
       */
      reset: () => {
        set({
          roles: [],
          permissions: [],
          selectedRole: null,
          isLoadingRoles: false,
          isLoadingPermissions: false,
          isSaving: false,
          rolesError: null,
          permissionsError: null,
        });
      },
    }),
    {
      name: "rbac-store", // localStorage key
      storage: createJSONStorage(() => localStorage),

      // Bump version to force re-fetch with new data shape
      version: 2,

      // Sanitize persisted state on rehydration
      migrate: (persistedState: any, _version: number) => {
        if (persistedState) {
          // Ensure roles is always an array after rehydration
          if (!Array.isArray(persistedState.roles)) {
            persistedState.roles = [];
          }
          // Ensure permissions is always an array after rehydration
          if (!Array.isArray(persistedState.permissions)) {
            persistedState.permissions = [];
          }
        }
        return persistedState as RBACState;
      },

      // Only persist data fields — NOT loading/error states
      partialize: (state) => ({
        roles: state.roles,
        permissions: state.permissions,
        selectedRole: state.selectedRole,
      }),

      // Called once localStorage data has been rehydrated into the store
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Double-check roles is array after rehydration
          if (!Array.isArray(state.roles)) {
            state.roles = [];
          }
          if (!Array.isArray(state.permissions)) {
            state.permissions = [];
          }
          state.setHasHydrated(true);
        }
      },
    }
  )
);