# Fancy Squares Core Block Enhancements - Agent Guide

## Purpose

- This plugin extends core blocks and ships custom interactive blocks.
- Optimize for stable editor UX, clean frontend rendering, and accessible interactivity.

## Quick Start

- Use Node 20.x (`.nvmrc` and `package.json` engines).
- Install deps: `npm install`
- Dev build: `npm run start`
- Prod build: `npm run build`
- Output: compiled assets land in `build/`

## Project Map

- `src/blocks/`: block source (edit, render, view, styles)
- `src/components/`: shared editor components
- `src/config/blockConfig.js`: block metadata + inspector config
- `src/inspector-controls/`: block-specific inspector toggles
- `inc/`: PHP registration and server-side logic
- `docs/`: local references for block and plugin docs
- `docs/interactivity-api/`: Interactivity API reference set

## Current Runtime Rules

- Frontend runtime is conditionally enqueued in `inc/assets.php` via `render_block` checks.
- Frontend-only stylesheet is built from `src/frontend-styles.scss`.
- `core/image` and `core/cover` image backgrounds are forced lazy/async by default.
- Per-block opt-out for forced lazy image loading uses `disableForcedLazyLoading`.
- `core/video` lazy-load and custom play button behavior run through render filters + `src/frontend.js`.
- Modal trigger conversion for `core/button` uses Interactivity API attributes and `aria-haspopup="dialog"`.
- CDN Bootstrap/Swiper registrations include SRI + `crossorigin` data.

## Block Conventions

- Each block lives under `src/blocks/<block-name>/`.
- Typical files are `block.json`, `edit.js`, `render.php`, `view.js`, `editor.scss`, and `style.scss`.
- Dynamic output should sanitize classes and keep render callbacks deterministic.

## Interactivity API Guidance

- Keep store keys consistent and scoped per feature.
- Prefer derived state for computed values.
- Accordion emits: `show.fs.accordion`, `shown.fs.accordion`, `hide.fs.accordion`, `hidden.fs.accordion`.
- Tabs emit: `show.fs.tabs`, `shown.fs.tabs`, `hide.fs.tabs`, `hidden.fs.tabs`.
- Modal emits: `show.fs.modal`, `shown.fs.modal`, `hide.fs.modal`, `hidden.fs.modal`.

## Styling Rules

- Maintain editor and frontend parity where practical.
- Use `fs-` class prefixes and avoid global leakage.
- Keep responsive behavior explicit and test mobile + desktop.
- Spacing controls now include Base/Sm/Md/Lg/Xl/Xxl.

## Docs Workflow

- Put feature ideas and implementation notes in `docs/`.
- Use `docs/interactivity-api/` for directive/store behavior references.
- Update docs when behavior or public APIs change.

## QA Checklist

- Editor: block inserts, attribute controls, InnerBlocks behavior.
- Frontend: dynamic render, interactivity, responsive behavior.
- Media: forced lazy defaults and opt-out toggle behavior for cover/image.
- Modal: keyboard navigation, focus restoration, ARIA attributes.
- A11y: keyboard navigation, aria attributes, focus order.

## Guardrails

- Do not delete or overwrite user changes.
- Avoid destructive commands unless explicitly requested.
