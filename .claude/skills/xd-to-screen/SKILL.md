---
name: xd-to-screen
description: Build a screen/feature in the RDB Management frontend from an XD design image. Use whenever the user provides an XD frame/screenshot (or asks to build a page, form, dashboard, or feature) and wants it implemented the project's "one way" — XD-pixel scaling, the BFF/Server-Action data flow, i18n (en/ar/tr) with automatic direction, shared UI primitives, and motion presets. Also use to answer "what do you need from me for this design?".
---

# XD → Screen (RDB Management)

This project has **one way** to do each thing. When turning an XD design into a
screen, extend the existing patterns — never introduce a second one. The full
rules live in `AGENTS.md` (§1–9); this skill is the working playbook plus the
**intake checklist** of what to get from the user for every design.

## 0. Before writing code

1. Read `AGENTS.md` and the relevant guide under `node_modules/next/dist/docs/`
   (this is a customized Next.js 16 — APIs may differ from training data).
2. Confirm you have the **intake details** below. If anything critical is
   missing (route, data endpoints, exact pixel values, strings), ask first.
3. Start a new domain area with `npm run gen` — never hand-roll a feature slice.

## 1. The design "way" (how it must be built)

- **XD pixels scale 1:1.** `--spacing = 0.0625rem`, so **1 Tailwind unit = 1 XD
  pixel**: XD `300×60` → `w-300 h-60`; padding 24 → `p-24`; gap 16 → `gap-16`;
  font 18 → `fz-18`; radius 12 → `rad-12`. **Never** raw px (`w-[300px]`) — it
  won't scale and lint bans it.
- **Canvases:** laptop 1366 / tablet 834 / mobile 430 (locks at 400px). Each
  scales 1:1 in its band. Build to the canvas the frame was designed at.
- **One wrapper per page:** `<Screen variant="centered" maxW={…}>` for
  forms/text, `<Screen variant="bleed">` for dashboards/tables.
- **Data flow (BFF only):** browser never calls NestJS. Server Components read
  via a feature `api.ts` (response parsed with the zod schema). Browser
  mutations call **Server Actions** in `features/*/actions.ts`. UI `fetch` is a
  lint error.
- **i18n + direction:** no hardcoded strings — every string is a key in
  `messages/{en,ar,tr}.json` (`en.json` is canonical & type-checked). Read with
  `getTranslations` (server) / `useTranslations` (client). Direction is set
  **once** on `<html dir>`; author **direction-agnostic** UI with logical
  utilities (`ps/pe`, `ms/me`, `start/end`, `text-start/end`, `justify-*`,
  `gap`) — never `left/right`, `pl/pr`. See `AGENTS.md §9`.
- **Icons:** `<Icon name="folder/file" />` only (from `/public/icons/*.svg`).
  No inline `<svg>`. `mask` recolors monochrome glyphs.
- **Animation:** import presets from `components/motion/presets.ts`; cards via
  `<AnimatedCard>`; page transitions via `template.tsx`. Honor reduced-motion.
- **Uniformity:** reuse `Button`, `TextField`, `Icon`, `Screen`,
  `LocaleSwitcher`. Need a new look? Add a **variant** to the existing
  primitive — don't fork a second component.

## 2. Folder & file structure

```
rdb/management/
├─ messages/                 # i18n dictionaries — en.json (canonical), ar.json, tr.json
├─ public/icons/             # XD-exported .svg (subfolders ok, e.g. auth/)
├─ src/
│  ├─ app/                   # ROUTES ONLY (thin). Layering: app → features, components, lib
│  │  ├─ (auth)/             # public area: centered shell + LocaleSwitcher
│  │  │  ├─ layout.tsx
│  │  │  └─ <route>/page.tsx
│  │  ├─ (dashboard)/        # protected area: requireSession() gate + app chrome
│  │  │  ├─ layout.tsx
│  │  │  └─ <route>/page.tsx
│  │  ├─ forbidden/page.tsx  # 403 (target of requireRole)
│  │  ├─ layout.tsx          # root: <html lang dir> + NextIntlClientProvider
│  │  ├─ template.tsx        # page transition wrapper
│  │  ├─ globals.css         # design system + scaling engine (edit tokens here)
│  │  └─ page.tsx            # "/" entry (redirect)
│  ├─ components/            # layering: components → lib
│  │  ├─ motion/             # AnimatedCard, PageTransition, presets.ts
│  │  └─ ui/                 # Button, TextField, Icon, Screen, LocaleSwitcher
│  ├─ features/              # VERTICAL SLICES (made by `npm run gen`)
│  │  └─ <feature>/          # layering: features → components, lib
│  │     ├─ schema.ts        # zod (shared client+server)
│  │     ├─ api.ts           # Server-Component data fetch, parsed with schema
│  │     ├─ actions.ts       # "use server" mutations
│  │     └─ components/      # the feature's client/presentational components
│  ├─ lib/                   # layering: lib → lib only
│  │  ├─ api/server.ts       # the single BFF client (server-only)
│  │  ├─ auth/               # cookies.ts, session.ts (requireSession/requireRole), rbac.ts
│  │  ├─ i18n/               # config.ts (locales+direction), request.ts, locale.ts (setLocale)
│  │  ├─ env.ts              # validated server env
│  │  └─ utils/cn.ts
│  └─ middleware.ts          # edge: CSP + locale auto-detect + silent token refresh
└─ AGENTS.md                 # the conventions (source of truth)
```

**Where new work goes:** a screen = a `page.tsx` (thin) under the right route
group, delegating to a feature slice. Reusable visuals → `components/ui` (as a
variant). Cross-cutting helpers → `lib`. Respect the lint-enforced layering.

## 3. Build steps for a screen

1. `npm run gen` (if it's a new feature) → creates `features/<name>/{schema,api,actions,components}`.
2. Put the route `page.tsx` under `(auth)` or `(dashboard)`; add the role gate
   (`requireSession()` / `requireRole([...])`) for protected/role-limited pages.
3. Translate the frame to XD-pixel utilities inside one `<Screen>`.
4. Add strings to `messages/en.json` (then `ar.json`/`tr.json`, same shape).
5. Drop exported icons into `/public/icons` and render with `<Icon>`.
6. Wire data (`api.ts` + zod) and mutations (`actions.ts`); never `fetch` in UI.
7. Run `npm run typecheck && npm run lint && npm run test` before declaring done.

## 4. INTAKE CHECKLIST — what to ask the user for each XD image

Send the image **plus** these details. Anything omitted, ask before building.

### A. Design / visual
- **Canvas** of the frame: laptop 1366 / tablet 834 / mobile 430 (ideally all 3,
  else "scale the sample from this one").
- **Exact XD pixel values** for key elements: width/height, padding, gap,
  font-size, radius. (Numbers beat eyeballing.)
- **Colors** as hex; say which map to tokens (`background`/`foreground`) and
  whether any new token should be added in `globals.css`.
- **Fonts & weights.**
- **Icons:** export each as `.svg` into `/public/icons` (give the names);
  note which are monochrome (use `mask`) vs multicolor brand icons.
- **States:** hover / focus / active / disabled / loading / empty / error.
- **Per-canvas differences** if the layout changes between breakpoints.

### B. Structure
- **Route / URL** and area: public **(auth)** or protected **(dashboard)**.
- **Required role(s)** if gated (`super_admin`, `country_manager`, `agent`).
- **Screen variant:** `centered` (give `maxW` in XD px) or `bleed`.
- **Feature slice** it belongs to (existing name, or name a new one).

### C. Functionality
- **Data shown** → backend endpoint(s) + response shape (drives `api.ts` + zod).
- **Actions/mutations** → endpoint(s), request payload, and success behavior
  (redirect target / toast / refresh).
- **Validation rules** per field.
- **Navigation:** where each link/button goes.
- **Loading / empty / error** behavior.

### D. Content / i18n
- **All strings in English** (and Arabic/Turkish if available — otherwise I'll
  draft ar/tr for review).
- **Dynamic values / plurals** (counts, names, dates) for ICU.
- **RTL exceptions** (rare — e.g. a logo or number that must not mirror).

### E. Uniformity
- Confirm reuse of existing primitives; flag anything that needs a **new shared
  variant** (added to the primitive, not a one-off component).
- Which **motion preset** / `AnimatedCard` usage, if any.

## 5. Definition of done
`npm run typecheck`, `npm run lint`, `npm run test` pass; strings in all three
locales; layout holds shape across the three canvases; RTL verified by switching
to Arabic (whole layout mirrors via logical utilities, no per-element `dir`).
