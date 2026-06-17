import "server-only";
import { env } from "@/lib/env";
import { getAccessToken } from "@/lib/auth/cookies";

/**
 * THE single way to call the NestJS API. Server-only.
 *
 * Rules (lint-enforced — see eslint boundaries + no-restricted-imports):
 *   - Client Components must NOT import this and must NOT call NestJS directly.
 *   - All browser-originated data goes through a Server Action or Route Handler
 *     that uses this client. The browser only ever talks to our own origin.
 *
 * Token refresh is handled centrally in middleware.ts (it can set cookies);
 * this client just attaches the current access token and surfaces 401s.
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  /** JSON-serializable body; set automatically with the right Content-Type. */
  json?: unknown;
  /** Forwarded to fetch cache. Defaults to "no-store" for authed data. */
  cache?: RequestCache;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { json, headers, cache = "no-store", ...rest } = options;
  const token = await getAccessToken();

  const res = await fetch(`${env.NEST_API_URL}${path}`, {
    ...rest,
    cache,
    headers: {
      Accept: "application/json",
      ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: json !== undefined ? JSON.stringify(json) : undefined,
  });

  if (res.status === 204) return undefined as T;

  const payload = await res
    .json()
    .catch(() => undefined as unknown);

  if (!res.ok) {
    const message =
      (payload as { message?: string } | undefined)?.message ??
      `Request failed (${res.status})`;
    throw new ApiError(res.status, message, payload);
  }

  return payload as T;
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, json?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", json }),
  patch: <T>(path: string, json?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", json }),
  put: <T>(path: string, json?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PUT", json }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
