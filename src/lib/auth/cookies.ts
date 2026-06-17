import "server-only";
import { cookies } from "next/headers";
import { isProd } from "@/lib/env";

/**
 * httpOnly auth cookies. Tokens NEVER reach JavaScript — this is the core of the
 * BFF security model (immune to XSS token theft). Only Server Actions, Route
 * Handlers and middleware may touch these.
 */
const ACCESS = "rdb_at";
const REFRESH = "rdb_rt";

const base = {
  httpOnly: true,
  secure: isProd, // allow http on localhost during dev
  sameSite: "lax" as const, // lax: survives top-level nav, blocks cross-site POST
  path: "/",
};

export async function setAuthCookies(opts: {
  accessToken: string;
  refreshToken: string;
  /** seconds */
  accessMaxAge: number;
  /** seconds */
  refreshMaxAge: number;
}) {
  const store = await cookies();
  store.set(ACCESS, opts.accessToken, { ...base, maxAge: opts.accessMaxAge });
  store.set(REFRESH, opts.refreshToken, { ...base, maxAge: opts.refreshMaxAge });
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete(ACCESS);
  store.delete(REFRESH);
}

export async function getAccessToken() {
  return (await cookies()).get(ACCESS)?.value ?? null;
}

export async function getRefreshToken() {
  return (await cookies()).get(REFRESH)?.value ?? null;
}

export const AUTH_COOKIE_NAMES = { ACCESS, REFRESH } as const;
