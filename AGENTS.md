# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Commands

Package manager is **bun** (`bun.lock`, `bunfig.toml`). Use `bun run <script>`, not npm/yarn.

- `bun run dev` — Next.js dev server with Turbopack (http://localhost:3000)
- `bun run build` / `bun run start` — production build / serve
- `bun run lint` — ESLint (`next lint`)
- `bun run test` — Vitest once; `bun run test:watch` for watch mode; `bun run test:coverage` for coverage
- Single test file: `bun run test src/lib/string.test.ts`
- Single test by name: `bun run test -t "adds a word and shows its card"`
- `bun run prettier:check` / `bun run prettier:write`

Pre-commit runs `lint-staged` via Husky: ESLint `--fix` + Prettier on JS/TS, Prettier on everything else. Prettier config: no semicolons, single quotes, ES5 trailing commas.

## Architecture

**Client-only, no backend.** All user data (the vocabulary list) lives in browser `localStorage` under the key `wortschatz`, read/written through `usehooks-ts`'s `useLocalStorage`. There is no database, API, or auth.

**Why the pages are thin wrappers:** `src/app/page.tsx` and `src/app/quiz/page.tsx` do nothing but `next/dynamic` import their real component with `ssr: false`. State depends on `localStorage`, which does not exist during SSR, so the actual UI must be client-only. When adding a new page, follow this pattern.

**Feature components** (`src/components/`):

- `Wortilizer.tsx` — home screen. Owns the vocab list. On add: looks up the noun's gender via `german-words` + the bundled `german-words-dict/dist/words.json`, maps `M/F/N` to `der/die/das`, throws a German-language error if the word is not in the dictionary, and moves an already-present word to the front instead of duplicating it (`moveIndexToFirst`).
- `WortilizerQuiz.tsx` — quiz screen. Shuffles indices once (`getRandomIndices`, Fisher–Yates) and walks through them, scoring `richtig`/`falsch`.
- `WordForm` / `WordList` / `WordCard` — input form (uses React form `action`), grid, and single card.

**`src/components/ui/`** is shadcn/ui (new-york style, `components.json`). Note: `components.json` aliases point at `@/app/components/*`, but components actually live at `@/components/*` — if you run `shadcn add`, move the output and fix imports.

**`src/lib/`** — pure helpers, each with a colocated `.test.ts`: `string.ts` (`sanitizeWord` normalizes input: trim + capitalize first letter, lowercase rest), `array.ts` (list ops), `tailwind.ts` (`cn`).

**Domain language:** identifiers and UI copy are German (`Wortschatz` = vocabulary, `WortschatzEntry`, `richtig`/`falsch` = right/wrong). User-facing strings and error messages are all German. Keep new code consistent.

## Conventions & gotchas

- `@/*` maps to `src/*` (tsconfig + a separate alias in `vitest.config.mts`).
- **Tailwind v4**, configured entirely in `src/app/globals.css` (`@import 'tailwindcss'` + `@theme`) — there is no `tailwind.config`. Custom utilities like `animate-wiggle` are defined there.
- Tailwind cannot see dynamically-built class strings. Article-dependent styling in `WordCard.tsx` uses a literal `Record<article, string>` map on purpose; do the same for any class name that varies at runtime.
- Test env: `vitest.setup.ts` re-wires jsdom's `localStorage`/`sessionStorage` onto `globalThis` because Node 22's built-in inert globals otherwise shadow them. Don't remove it.
- `NEXT_PUBLIC_BASE_URL` (used by `sitemap.ts`) and `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` are the only env vars; copy `.env.example` to `.env` for builds.
