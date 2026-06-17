import type { ReactNode } from "react";
import { requireSession } from "@/lib/auth/session";
import { logoutAction } from "@/features/auth/actions";
import { ROLE_LABEL } from "@/lib/auth/rbac";
import { Screen } from "@/components/ui/Screen";

/**
 * Authoritative auth gate for the whole protected area: `requireSession()` hits
 * NestJS `/auth/me`. If it fails, it redirects to /login before any child
 * renders. (The edge proxy only does silent refresh + headers.)
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireSession();

  return (
    <Screen variant="bleed">
      <header className="border-foreground/10 flex h-64 items-center justify-between border-b px-24">
        <span className="fz-18 font-semibold">RDB Management</span>
        <div className="flex items-center gap-16">
          <span className="fz-14 opacity-70">
            {user.name} · {ROLE_LABEL[user.role]}
          </span>
          <form action={logoutAction}>
            <button type="submit" className="fz-14 underline">
              Logout
            </button>
          </form>
        </div>
      </header>
      <div className="px-24 py-24">{children}</div>
    </Screen>
  );
}
