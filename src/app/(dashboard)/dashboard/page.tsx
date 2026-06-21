import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { requireSession } from "@/lib/auth/session";
import { CityLog } from "./city-log";

/**
 * PLACEHOLDER — build the real dashboard from XD here.
 *
 * Kept as a route because `loginAction` redirects to /dashboard. The protected
 * (dashboard) layout already runs the authoritative `requireSession()` gate;
 * the call below makes the user available for this page.
 */
export default async function DashboardPage() {
  await requireSession();

  // Cloudflare edge geolocation. Two sources, in order of preference:
  //   1. request.cf (via getCloudflareContext) — the rich geo object.
  //   2. Visitor-location headers (cf-ipcity / cf-ipcountry) — only present if
  //      the "Add visitor location headers" Managed Transform is enabled in the
  //      Cloudflare dashboard. cf-ipcountry is always sent; cf-ipcity is not.
  // Decoded because Cloudflare URL-encodes these header values.
  const { cf } = await getCloudflareContext({ async: true });
  const h = await headers();
  const dec = (v: string | null) => (v ? decodeURIComponent(v) : undefined);
  const city = cf?.city ?? dec(h.get("cf-ipcity"));
  const country = cf?.country ?? dec(h.get("cf-ipcountry"));
  console.log(
    "User city:",
    city ?? "unknown",
    "| country:",
    country ?? "unknown",
    "| cf present:",
    Boolean(cf),
  );

  return (
    <div className="flex flex-col gap-20">
      {/* Logs the city to the browser console (server reads cf, client logs it) */}
      <CityLog city={city} country={country} />
      {/* TODO: build dashboard from XD */}
    </div>
  );
}
