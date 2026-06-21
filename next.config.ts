import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

// next-intl: cookie-based locale (no URL routing). Points at our request config.
const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Don't advertise the framework.
    poweredByHeader: false,
    // Let phones on the LAN hit `npm run dev:mobile` without Next blocking the
    // cross-origin dev-asset requests. Subnet wildcards survive DHCP IP changes
    // (Wi-Fi 192.168.1.* / Windows mobile-hotspot 192.168.137.*).
    allowedDevOrigins: ['192.168.1.*', '192.168.137.*'],
    // Pin the workspace root (a stray lockfile exists in the home dir).
    turbopack: {
        root: import.meta.dirname,
    },
};

export default withNextIntl(nextConfig);

// Makes Cloudflare bindings (env vars, KV, R2, …) available during `next dev`.
initOpenNextCloudflareForDev();
