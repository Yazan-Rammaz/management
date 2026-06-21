import { getCloudflareContext } from "@opennextjs/cloudflare";
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

  // Cloudflare edge geolocation — only populated on real Workers requests
  // (use `npm run preview` or production). Logs server-side: terminal in dev,
  // `wrangler tail` / Workers logs in prod.
  const { cf } = await getCloudflareContext({ async: true });
  console.log("User city:", cf?.city ?? "unknown", "| country:", cf?.country);

  return (
    <div className="flex flex-col gap-20">
      {/* TODO: build dashboard from XD */}
    </div>
  );
}
