# AGENTS.md

## Project

Antagonista voting site — Astro 6 + Vue 3 + Tailwind CSS v4, deployed on Vercel. Spanish language, manga character theme.

## Commands

- `bun run dev` — start dev server
- `bun run build` — production build (output: `dist/`)
- `bun run preview` — preview production build locally

**No lint, typecheck, or test scripts exist.** Run `bun run build` to verify correctness — Vite will catch type and syntax errors.

## Package manager

**Use bun, not npm or pnpm.** The repo has `bun.lock`. If a `pnpm-lock.yaml` appears, delete it — it causes Vercel build failures.

## Tech stack specifics

- **Tailwind v4** via `@tailwindcss/vite` plugin (not PostCSS). All theme tokens live in `src/styles/global.css` inside `@theme {}`. No `tailwind.config.js`.
- **Vue components** are used inside Astro pages with `client:load`. They can use Tailwind classes directly but need `@reference "../../styles/global.css"` in scoped `<style>` blocks to access custom tokens.
- **TypeScript path aliases**: `@components/*`, `@layouts/*`, `@pages/*`, `@data/*`, `@lib/*`, `@icons/*`, `@db/*` — defined in `tsconfig.json`.

## Code style (Prettier)

Tabs, no semicolons, single quotes, no trailing commas, 124 print width. See `.prettierrc`.

## Architecture

```
src/
  layouts/Layout.astro    — root HTML shell (nav, canvas bg, footer)
  pages/                  — file-based routing (index, personajes, encuesta-resultados, 404)
  components/
    astrojs/              — Nav.astro, Hero.astro, Titles.astro
    vuejs/                — AllCards.vue, CharacterCard.vue, SearchBar.vue, FilterToggle.vue, etc.
  data/                   — characters.ts, survey-results.ts, votesinterface.ts
  icons/                  — SVG icon components (Astro)
  styles/global.css       — Tailwind import + @theme tokens + global utilities
```

## Design tokens

Crimson accent (`#DC2626`) on neutral dark (`#0a0a0a`). Fonts: Permanent Marker (display), DM Sans (body). All in `global.css` `@theme` block.

## Gotchas

- Canvas background animation runs on page load and re-inits on `astro:page-load` for ClientRouter transitions.
- The `<body>` has `uppercase` class — all text renders uppercase by default.
- Grain overlay on `body::before` has `z-index: 1`. Don't raise it or it covers content.
- `vercel.json` forces `bun install` for Vercel builds.
- No `pnpm-lock.yaml` — delete if it appears (causes `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`).
