<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# RDB Management — Conventions (the only way)

This project deliberately has **one way** to do each thing. Don't introduce a
second pattern; extend the existing one. These conventions are also meant to be
extracted into a reusable Claude Code skill.

Stack: **Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript ·
Motion · OpenNext on Cloudflare**. Backend is **NestJS** (separate repo).

## 1. Responsive scaling — XD pixels that scale

The root `font-size` is driven by the viewport (`src/app/globals.css`), so every
`rem`-based value scales together → identical shape at every size ("the sample").

`--spacing` is `0.0625rem`, so **1 Tailwind unit = 1 XD pixel**:

| XD says    | You write    |
| ---------- | ------------ |
| 300 × 60   | `w-300 h-60` |
| padding 24 | `p-24`       |
| gap 16     | `gap-16`     |
| font 18    | `fz-18`      |
| radius 12  | `rad-12`     |

- **Never** write raw px in a className (`w-[300px]`) — it won't scale and lint bans it.
- Three canvases (reference widths): **laptop 1366 / tablet 834 / mobile 430**.
  Each scales 1:1 inside its band, caps at the reference (side whitespace above),
  mobile **locks at 400px** (scrolls below).
- Every page renders inside exactly one `<Screen variant="centered" | "bleed">`.
  `centered` (forms/text) gets a max-width column; `bleed` (dashboards) is full.

## 2. Talking to the API — BFF only

- The browser **never** calls NestJS and **never** holds a token.
- Server-only `src/lib/api/server.ts` (`api.get/post/...`) is the single client.
- Mutations from the browser → **Server Actions** (`features/*/actions.ts`).
- Data for Server Components → a feature **api module** (`features/*/api.ts`).
- UI components calling `fetch` directly is a lint error.

## 3. Auth & roles

- httpOnly cookies (`rdb_at`/`rdb_rt`), set only in actions/route-handlers/proxy.
- `src/proxy.ts` (Next 16 edge proxy) does silent refresh + security headers (CSP/HSTS).
- The authoritative gate is `requireSession()` / `requireRole()` in protected
  layouts/pages — they call NestJS `/auth/me`. **Frontend RBAC is for rendering
  only; NestJS enforces every real rule.**
- Registration is identical for all roles; the backend assigns the role.

## 4. Validation

- One zod schema per concern in `features/*/schema.ts`, shared by client + server.
- API responses are parsed with the schema in `api.ts` so backend drift fails loud.

## 5. Icons & animation

- Icons: `<Icon name="user" />` only. XD `.svg` files live in `/public/icons`.
  **No inline `<svg>` in pages.** `mask` mode recolors monochrome glyphs.
- Animation: import presets from `src/components/motion/presets.ts`. Page
  transitions via `template.tsx`; cards via `<AnimatedCard>`. Honor reduced-motion.

## 6. Folder layering (lint-enforced)

```
app        → features, components, lib   (routes only; thin)
features   → components, lib             (vertical slices: schema/api/actions/components)
components → lib                         (ui primitives + motion)
lib        → lib                         (api client, auth, env, utils)
```

Start a new feature with `npm run gen` — never hand-roll the structure.

## 7. Commands

| Command             | What                                         |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Local dev (Cloudflare bindings via OpenNext) |
| `npm run lint`      | ESLint (layering + fetch ban)                |
| `npm run typecheck` | `tsc --noEmit`                               |
| `npm run test`      | Vitest unit/component                        |
| `npm run e2e`       | Playwright (scaling + flows)                 |
| `npm run gen`       | Scaffold a new feature slice                 |
| `npm run preview`   | Build + run on Cloudflare Workers locally    |
| `npm run deploy`    | Build + deploy to Cloudflare                 |

## 8. Deploy

Cloudflare **Workers Builds** is connected to the git repo → push to `main`
auto-builds (`opennextjs-cloudflare build`) and deploys. Secrets (`NEST_API_URL`)
are Cloudflare secrets; local dev uses `.dev.vars` (git-ignored).
