/**
 * Roles & RBAC — for RENDERING ONLY.
 *
 * NestJS is the single source of truth for authorization. The frontend uses
 * these helpers to decide what to show; it must NEVER be the only thing
 * standing between a user and an action. Every protected action is re-checked
 * server-side in NestJS.
 *
 * Registration is identical for every role (same form, same flow); the role is
 * assigned/approved by the backend.
 */
export const ROLES = ["super_admin", "country_manager", "agent"] as const;

export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

/** Does `role` satisfy one of the `allowed` roles? */
export function hasRole(role: Role | null | undefined, allowed: Role[]) {
  return !!role && allowed.includes(role);
}

/** Human-friendly labels (extend with i18n later). */
export const ROLE_LABEL: Record<Role, string> = {
  super_admin: "Super Admin",
  country_manager: "Country Manager",
  agent: "Agent",
};
