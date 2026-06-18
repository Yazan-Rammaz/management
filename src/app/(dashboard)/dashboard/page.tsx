import { requireSession } from "@/lib/auth/session";

/**
 * PLACEHOLDER — build the real dashboard from XD here.
 *
 * Kept as a route because `loginAction` redirects to /dashboard. The protected
 * (dashboard) layout already runs the authoritative `requireSession()` gate;
 * the call below makes the user available for this page.
 */
export default async function DashboardPage() {
  await requireSession();

  return (
    <div className="flex flex-col gap-20">
      {/* TODO: build dashboard from XD */}
    </div>
  );
}
