import "server-only";
import { cookies } from "next/headers";
import type { SessionUser } from "./session";

/**
 * TEMPORARY demo session — until NestJS `/auth/me` is wired.
 *
 * The login flow stores this fake user in an httpOnly cookie when it completes;
 * `getSession()` reads it, and logout clears it. Delete this module (and its
 * call sites) once the real backend session is in place.
 */
const COOKIE = "rdb_fake_user";

export const FAKE_USER: SessionUser = {
  id: "fake-1",
  email: "mohamad.katmawi@example.com",
  name: "Mohamad Katmawi",
  role: "super_admin",
  countryCode: "SA",
};

/** Set in a Server Action / Route Handler only. */
export async function writeFakeSession() {
  const store = await cookies();
  store.set(COOKIE, JSON.stringify(FAKE_USER), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

/** Readable anywhere on the server (render-safe). */
export async function readFakeSession(): Promise<SessionUser | null> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

/** Clear in a Server Action / Route Handler only. */
export async function clearFakeSession() {
  (await cookies()).delete(COOKIE);
}
