import type en from "./messages/en.json";
import type { Locale } from "./src/lib/i18n/config";

/**
 * Type-safe i18n. `en.json` is the canonical key set, so `t("auth.signIn")` is
 * autocompleted and a typo or missing key is a compile error. Keep ar.json and
 * tr.json structurally identical to en.json.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof en;
  }
}
