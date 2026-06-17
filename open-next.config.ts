import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext → Cloudflare adapter config.
 * Defaults are good for a stateless BFF. Add incrementalCache (KV/R2) here later
 * if you adopt ISR/data-cache.
 */
export default defineCloudflareConfig({});
