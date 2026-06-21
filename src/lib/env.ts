import "server-only";
import { z } from "zod";

/**
 * Server-only, validated environment. Importing this in a Client Component is a
 * build error (via "server-only"), which keeps secrets off the browser.
 *
 * On Cloudflare these come from Worker/Pages bindings & secrets — never commit
 * real values. See .dev.vars (git-ignored) for local development.
 *
 * Validation is LAZY and runtime-only. During `next build` the Worker
 * secrets/vars don't exist yet, and the eager top-level parse used to abort the
 * build. We still want to "fail loud" on bad config — but at runtime, on first
 * actual access, not while compiling. So we validate the first time a field is
 * read and only throw when not in the build phase.
 */
const schema = z.object({
  /** Base URL of the NestJS API the BFF proxies to (server-side only). */
  NEST_API_URL: z.string().url(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

type Env = z.infer<typeof schema>;

// Next sets this during `next build` (incl. OpenNext's internal next build).
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

let cached: Env | null = null;
function load(): Env {
  if (cached) return cached;

  const parsed = schema.safeParse({
    NEST_API_URL: process.env.NEST_API_URL,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (parsed.success) {
    cached = parsed.data;
  } else if (isBuildPhase) {
    // Don't break the build over env that only exists at runtime. Any real use
    // of this placeholder at request time would re-validate and throw.
    cached = {
      NEST_API_URL: "https://placeholder.invalid",
      NODE_ENV: "production",
    };
  } else {
    throw new Error(
      `Invalid server environment:\n${z.prettifyError(parsed.error)}`,
    );
  }

  return cached;
}

/** Validated env, resolved lazily on first property access. */
export const env = new Proxy({} as Env, {
  get: (_target, prop: string) => load()[prop as keyof Env],
});

// Read straight from process.env so importing this module never triggers
// validation; NODE_ENV always has a sane value during build and at runtime.
export const isProd = process.env.NODE_ENV === "production";
