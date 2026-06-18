import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

// next-intl: cookie-based locale (no URL routing). Points at our request config.
const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Don't advertise the framework.
    poweredByHeader: false,
    // Pin the workspace root (a stray lockfile exists in the home dir).
    turbopack: {
        root: import.meta.dirname,
    },
};

export default withNextIntl(nextConfig);

// Makes Cloudflare bindings (env vars, KV, R2, …) available during `next dev`.
initOpenNextCloudflareForDev();
