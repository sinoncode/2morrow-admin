/* =========================================
   PERMISSION TYPES
========================================= */

export interface Permission {
  id?: string;
  name: string;
  guard_name?: string;
  created_at?: string;
  updated_at?: string;
}

/* =========================================
   ROLE TYPES
========================================= */

/**
 * Internal Role type used by the frontend.
 * The API returns { role: "DRIVER", permissions: [] }.
 * We map it to { id: "DRIVER", name: "DRIVER", role: "DRIVER", permissions: [] }
 * so all existing UI components that reference role.id / role.name continue to work.
 */
export interface Role {
  id: string;
  name: string;
  role: string;
  permissions: string[];
  created_at?: string;
  updated_at?: string;
}

/* =========================================
   API RESPONSE TYPES
========================================= */

/**
 * Shape returned by GET /api/v1/admin/roles-permissions
 */
export interface RolesPermissionsApiResponse {
  success: boolean;
  data: {
    availablePermissions: string[];
    roles: Array<{
      role: string;
      permissions: string[];
    }>;
  };
  message: string;
}

/**
 * Payload for PATCH /api/v1/admin/roles-permissions/{role}
 */
export interface UpdateRolePayload {
  permissions: string[];
}

export interface PermissionsResponse {
  success?: boolean;
  message?: string;
  data: Permission[];
}

export interface RolesResponse {
  success?: boolean;
  message?: string;
  data: Role[];
}

export interface SingleRoleResponse {
  success?: boolean;
  message?: string;
  data: Role;
}

/* =========================================
   USER TYPES
========================================= */

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string[];
  permissions: string[];
}

/* =========================================
   AUTH RESPONSE TYPES
========================================= */

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    token_type: string;
    user: User;
  };
}

/* =========================================
   PERMISSION GROUPING TYPES
========================================= */

export interface GroupedPermissions {
  [module: string]: Permission[];
}

/* =========================================
   TABLE TYPES
========================================= */

export interface RoleTableColumn {
  key: string;
  label: string;
}

/* =========================================
   MODAL TYPES
========================================= */

export interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

/* =========================================
   HELPER TYPES
========================================= */

export type PermissionAction =
  | "view"
  | "create"
  | "update"
  | "delete";


  export type PermissionModule =
  | "users"
  | "shipmentControl"
  | "changeRequest"
  | "checkPayments";

export type PermissionString = `${string}.${PermissionAction}`;

/* =========================================
   STATIC FALLBACKS (OPTIONAL)
========================================= */

export const DEFAULT_PERMISSION_ACTIONS: PermissionAction[] = [
  "view",
  "create",
  "update",
  "delete",
];
/* =========================================
   PERMISSION HELPERS
========================================= */

export const hasPermission = (
  permissions: string[],
  permission: string
): boolean => {
  return permissions.includes(permission);
};

export const hasAnyPermission = (
  permissions: string[],
  requiredPermissions: string[]
): boolean => {
  return requiredPermissions.some((permission) =>
    permissions.includes(permission)
  );
};

export const hasAllPermissions = (
  permissions: string[],
  requiredPermissions: string[]
): boolean => {
  return requiredPermissions.every((permission) =>
    permissions.includes(permission)
  );
};

/* =========================================
   GROUP PERMISSIONS BY MODULE
========================================= */

export const groupPermissionsByModule = (
  permissions: Permission[]
): GroupedPermissions => {
  return permissions.reduce((acc, permission) => {
    const module = permission.name.split(".")[0];

    if (!acc[module]) {
      acc[module] = [];
    }

    acc[module].push(permission);

    return acc;
  }, {} as GroupedPermissions);
};