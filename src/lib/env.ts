import "server-only";
import { z } from "zod";

/**
 * Server-only, validated environment. Importing this in a Client Component is a
 * build error (via "server-only"), which keeps secrets off the browser.
 *
 * On Cloudflare these come from Worker/Pages bindings & secrets — never commit
 * real values. See .dev.vars (git-ignored) for local development.
 */
const schema = z.object({
  /** Base URL of the NestJS API the BFF proxies to (server-side only). */
  NEST_API_URL: z.string().url(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export const env = schema.parse({
  NEST_API_URL: process.env.NEST_API_URL,
  NODE_ENV: process.env.NODE_ENV,
});

export const isProd = env.NODE_ENV === "production";
