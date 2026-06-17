import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework.
  poweredByHeader: false,
  // Pin the workspace root (a stray lockfile exists in the home dir).
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;

// Makes Cloudflare bindings (env vars, KV, R2, …) available during `next dev`.
initOpenNextCloudflareForDev();
