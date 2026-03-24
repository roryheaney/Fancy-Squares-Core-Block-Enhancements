# Fancy Squares Core Block Enhancements - Agent Guide

## Purpose

- This plugin extends core blocks and ships custom interactive blocks.
- Optimize for stable editor UX, clean frontend rendering, and accessible interactivity.

## Instruction Precedence

- Direct user instruction.
- This `AGENTS.md`.
- `README.md` in this plugin for detailed architecture and usage.
- Inferred behavior.
- If docs conflict with code, trust code and note documentation drift.

## First 5 Minutes (Every Task)

1. Confirm Node 20.x (`.nvmrc`, `package.json` engines).
2. Ensure dependencies are installed (`npm install` if needed).
3. Read:
   - `README.md`
   - `src/config/blockConfig.js`
   - `src/config/class-options-map.js`
   - `inc/assets.php`
4. Run validation:
   - `npm run lint:all`
   - `npm run build`

## Source of Truth Rules

- Theme-driven framework tokens are the default source for spacing/breakpoints/options.
- Token generation flow:
  - `--theme-json-path`
  - `FS_THEME_JSON_PATH`
  - local plugin `theme.json` (if present)
  - `data/style-tokens.default.json` fallback
- Keep UI options aligned with generated token artifacts; do not hardcode extra options in controls when generated values exist.

## Project Map

- `src/blocks/`: block source (edit, render, view, styles)
- `src/components/`: shared editor components
- `src/config/blockConfig.js`: block metadata + inspector config
- `src/config/class-options-map.js`: lazy-loaded class options map
- `src/config/generated/`: generated framework token exports
- `src/inspector-controls/`: block-specific inspector toggles
- `src/formats/span-format.js`: RichText span editor UI/format behavior
- `inc/`: PHP registration and server-side logic
- `docs/`: local references for block and plugin docs
- `docs/interactivity-api/`: Interactivity API reference set

## Generated File Guardrails

- Do not hand-edit generated outputs:
  - `build/**`
  - `src/config/generated/**`
  - `src/styles/generated/**`
  - `data/bootstrap-classes/generated-spacing-options.js`
- Regenerate via scripts (`npm run tokens:site`, `npm run build`).

## Runtime Invariants

- Frontend runtime is conditionally enqueued in `inc/assets.php` via `render_block` checks.
- Frontend-only stylesheet is built from `src/entries/styles/frontend.scss`.
- Utilities stylesheet is enqueued on frontend only when setting is `both`.
- `core/image` and `core/cover` image backgrounds are forced lazy/async by default.
- Per-block opt-out for forced lazy image loading uses `disableForcedLazyLoading`.
- `core/video` lazy-load and custom play button behavior run through render filters + `src/entries/frontend/index.js`.
- Modal trigger conversion for `core/button` uses Interactivity API attributes and `aria-haspopup="dialog"`.
- CDN Bootstrap/Swiper registrations include SRI + `crossorigin`.

## Block Conventions

- Each block lives under `src/blocks/<block-name>/`.
- Typical files are `block.json`, `edit.js`, `render.php`, `view.js`, `editor.scss`, and `style.scss`.
- Keep `block.json` at `apiVersion: 3`.
- Dynamic output should sanitize classes and keep render callbacks deterministic.

## Interactivity API Guidance

- Keep store keys consistent and scoped per feature.
- Prefer derived state for computed values.
- Accordion emits: `show.fs.accordion`, `shown.fs.accordion`, `hide.fs.accordion`, `hidden.fs.accordion`.
- Tabs emit: `show.fs.tabs`, `shown.fs.tabs`, `hide.fs.tabs`, `hidden.fs.tabs`.
- Modal emits: `show.fs.modal`, `shown.fs.modal`, `hide.fs.modal`, `hidden.fs.modal`.

## Span Format Rules

- Maintain structured selectors for token classes (no regression to raw free-form token editing UI).
- Preserve unknown existing classes and inline style declarations when updating a span.
- Keep color controls palette-first with optional custom value entry.

## Docs Workflow

- Update `README.md` when behavior, architecture, or public options change.
- Put feature ideas and implementation notes in `docs/`.
- Use `docs/interactivity-api/` for directive/store behavior references.
- Use `docs/blocks/` for block development best practices.

## QA Checklist

- Editor: block inserts, attribute controls, block toolbar controls, and InnerBlocks behavior.
- Frontend: dynamic render, interactivity, and responsive behavior.
- Media: forced lazy defaults and opt-out toggle behavior for cover/image.
- Modal: keyboard navigation, focus restoration, and ARIA attributes.
- A11y: keyboard navigation, aria attributes, and focus order.
- Regression: run `npm run lint:all` and `npm run build` before finalizing.

## Guardrails

- Do not delete or overwrite user changes.
- Avoid destructive commands unless explicitly requested.

