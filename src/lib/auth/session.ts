import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { api, ApiError } from "@/lib/api/server";
import { hasRole, type Role } from "@/lib/auth/rbac";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  /** ISO country code for country managers/agents, if applicable. */
  countryCode?: string;
};

/**
 * The authoritative session, fetched from NestJS `/auth/me`. `cache()` dedupes
 * it across a single render pass. Returns null when unauthenticated.
 */
export const getSession = cache(async (): Promise<SessionUser | null> => {
  try {
    return await api.get<SessionUser>("/auth/me");
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
      return null;
    }
    throw error;
  }
});

/** Use at the top of any protected Server Component / layout. */
export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

/** Server-side role gate. UI gating only — NestJS still enforces the real rule. */
export async function requireRole(allowed: Role[]): Promise<SessionUser> {
  const session = await requireSession();
  if (!hasRole(session.role, allowed)) redirect("/forbidden");
  return session;
}
