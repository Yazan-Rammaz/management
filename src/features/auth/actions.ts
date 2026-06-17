"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { api, ApiError } from "@/lib/api/server";
import { setAuthCookies, clearAuthCookies } from "@/lib/auth/cookies";
import { loginSchema, registerSchema } from "./schema";

/**
 * Server Actions are THE one way the browser triggers a mutation. Client forms
 * call these; the action validates, talks to NestJS via the `api` client, and
 * manages httpOnly cookies. No token ever touches client JS.
 */
export type ActionState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  accessMaxAge: number;
  refreshMaxAge: number;
};

function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: fieldErrorsFrom(parsed.error) };
  }

  try {
    const tokens = await api.post<AuthTokens>("/auth/login", parsed.data);
    await setAuthCookies(tokens);
  } catch (error) {
    return {
      ok: false,
      error: error instanceof ApiError ? error.message : "Login failed",
    };
  }

  redirect("/dashboard");
}

export async function registerAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: fieldErrorsFrom(parsed.error) };
  }

  const { confirmPassword, ...payload } = parsed.data;

  try {
    const tokens = await api.post<AuthTokens>("/auth/register", payload);
    await setAuthCookies(tokens);
  } catch (error) {
    return {
      ok: false,
      error: error instanceof ApiError ? error.message : "Registration failed",
    };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  try {
    await api.post("/auth/logout");
  } catch {
    // best-effort server-side revoke; clear local cookies regardless
  }
  await clearAuthCookies();
  redirect("/login");
}
