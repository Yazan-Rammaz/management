"use server";

import { cookies } from "next/headers";
import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  type Locale,
} from "./config";

/**
 * Server-side language read/write. The locale lives in a cookie (no URL prefix),
 * so these are the one way to read the active language on the server and to
 * change it from the UI.
 *
 * `setLocale` is a Server Action — the `<LocaleSwitcher>` calls it, then the
 * page re-renders with new messages and a new <html dir>.
 */

export async function getUserLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function setLocale(locale: Locale): Promise<void> {
  if (!isLocale(locale)) return;
  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}
