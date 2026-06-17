import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Layering ("only one way") is enforced with import zones — no resolver needed,
 * fully deterministic:
 *
 *   lib  ->  (lib only)
 *   components -> lib, components
 *   features   -> lib, components, features
 *   app        -> anything
 *
 * Plus: UI components may not call `fetch` directly — data goes through a
 * Server Action or a feature `api` module. Tokens stay server-side; the browser
 * only talks to our own origin (also enforced at runtime by CSP + server-only).
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
    },
  },

  {
    files: ["plopfile.mjs", "*.config.{js,mjs,ts}"],
    rules: { "import/no-anonymous-default-export": "off" },
  },

  {
    files: ["src/lib/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@/features/**"], message: "lib must not import from features." },
            { group: ["@/components/**"], message: "lib must not import from components." },
            { group: ["@/app/**"], message: "lib must not import from app." },
          ],
        },
      ],
    },
  },

  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@/features/**"], message: "components must not import from features." },
            { group: ["@/app/**"], message: "components must not import from app." },
          ],
        },
      ],
    },
  },

  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@/app/**"], message: "features must not import from app." },
          ],
        },
      ],
    },
  },

  {
    // UI components: no direct network calls.
    files: ["src/components/**/*.{ts,tsx}", "src/features/**/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "CallExpression[callee.name='fetch']",
          message:
            "Don't call fetch in UI. Use a Server Action or a feature `api` module (src/features/*/api.ts).",
        },
      ],
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    ".open-next/**",
    ".wrangler/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
