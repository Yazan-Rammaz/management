"use client";

import { useEffect } from "react";

/**
 * Logs the Cloudflare-detected city to the BROWSER console. The city is read
 * server-side (only the server can see `cf`) and passed down as a prop — the
 * browser never reads geolocation itself (BFF rule). Renders nothing.
 */
export function CityLog({ city, country }: { city?: string; country?: string }) {
  useEffect(() => {
    console.log("User city:", city ?? "unknown", "| country:", country);
  }, [city, country]);

  return null;
}
