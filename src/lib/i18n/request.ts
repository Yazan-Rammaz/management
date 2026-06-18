import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./locale";

/**
 * next-intl request config (referenced from next.config.ts). Runs per request on
 * the server: resolves the active locale from the cookie and loads that
 * language's message bundle. Server Components see it via `getTranslations()`,
 * Client Components via `useTranslations()` (provided in the root layout).
 */
export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  return {
    locale,
    messages: (await import(`../../../messages/${locale}.json`)).default,
  };
});
