"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { setLocale } from "@/lib/i18n/locale";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";

/**
 * The one language switcher. Writes the locale cookie via the `setLocale` Server
 * Action, then refreshes so the page re-renders with new messages and the root
 * <html dir> flips automatically. No reload, no URL change.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const active = useLocale() as Locale;
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onChange(next: Locale) {
    if (next === active) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <select
      aria-label={localeNames[active]}
      value={active}
      disabled={pending}
      onChange={(e) => onChange(e.target.value as Locale)}
      className={cn(
        "h-32 border px-12 rad-8 fz-14",
        "border-foreground/15 bg-transparent hover:bg-foreground/5",
        "outline-none focus:border-foreground/40 disabled:opacity-50",
        className,
      )}
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {localeNames[l]}
        </option>
      ))}
    </select>
  );
}
