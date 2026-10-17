# Project: Fancy Squares Core Block Enhancements

WordPress plugin that extends core blocks with token-driven classes and responsive controls, plus ships custom interactive blocks (Interactivity API). Built with `@wordpress/scripts` 30.x (`--experimental-modules`), Node 20.x. Dependencies: `@10up/block-components`, `@wordpress/icons`, `@wordpress/interactivity`.

## Source of truth (read first)
- `AGENTS.md` — agent guide, invariants, QA checklist, mandatory closeout rules.
- `README.md` — architecture overview, documentation map, supported blocks list.
- `src/config/blockConfig.js` — block metadata + inspector config for every extended block.
- `src/config/class-options-map.js` — lazy-loaded class options map.
- `inc/assets.php` — conditional frontend enqueue logic (`render_block` checks).

## Directory tree
```
src/
  blocks/          # 15 custom blocks (accordion, tabs, carousel, modal, alert, ...)
  components/      # BlockEdit, TokenFields, SpacingControls, WidthControls
  config/          # blockConfig, breakpoints, constants, framework-option-sets, option-coverage.mjs
    generated/     # GENERATED — never hand-edit
  entries/         # editor/index.js, frontend/index.js, styles/*.scss
  extensions/      # core/ block-enhancements.js, register-extensions.js
  formats/         # span-format.js (RichText token editing)
  inspector-controls/  # columns-list, media, modal-button controls
  styles/          # SCSS (generated/ excluded from Serena)
    generated/     # GENERATED — never hand-edit
  utils/           # helpers.js (attr/class generation), block-id.js, use-sync-generated-classes.js
inc/
  render-filters/  # auto-loaded per-block PHP render filters
  assets.php, blocks.php, assets-token-detection.php, render-helpers.php, admin.php
scripts/           # generate-style-tokens.mjs, check-regression-quality.mjs, audit-class-coverage.mjs
data/              # token sources, bootstrap-classes/, class-families.json
build/             # GENERATED — gitignored
```

## Subsystem memories (load on demand)
- `mem:block-extensions-system` — two-mechanism architecture (registerBlockExtension + withCustomAttributes), BLOCK_CONFIG shape, attribute↔class round-trip, inspector panel rendering.
- `mem:interactivity-api-blocks` — store namespaces, server context seeding, event contracts, transition pattern, keyboard nav, cross-block modal trigger.
- `mem:render-filters-system` — auto-loader, WP_HTML_Tag_Processor usage, anchor→button trick, per-filter inventory.
- `mem:class-token-pipeline` — token generation flow, breakpoint system, side types, generateClassName algorithm, negative margins, span format.
- `mem:asset-enqueue-system` — registration vs conditional enqueue split, handle registry, maybe_enqueue_frontend_runtime decision tree, utilities setting, token detection.

## Serena scope note
Languages `typescript` + `php` + `scss` (typescript first = default/fallback). `read_only: true`. Generated paths excluded: `src/config/generated/**`, `src/styles/generated/**`, `data/bootstrap-classes/generated-spacing-options.js`.

**Intelephense (php) caveat**: no WordPress stubs bundled; WP core functions may be reported "undefined". Own-code symbol resolution still works. If php floods errors with no usable symbols, fallback = remove `php` from `.serena/project.yml` `languages:` and re-run `serena project index`.

## Token source flow
`--theme-json-path` → `FS_THEME_JSON_PATH` → local plugin `theme.json` → `data/style-tokens.default.json` fallback. UI options must stay aligned with generated token artifacts; never hardcode extra options. Regenerate via `npm run tokens:site` / `npm run build`. See `mem:class-token-pipeline` for the full generation chain.

## Generated file guardrails (never hand-edit)
`build/**`, `src/config/generated/**`, `src/styles/generated/**`, `data/bootstrap-classes/generated-spacing-options.js`.

## Validation / closeout (mandatory)
- `npm run lint:all` and `npm run build` during work.
- `npm run regression:gate` is REQUIRED for every feature/fix/refactor/docs update before finalizing. Do not finalize if it fails. Report warnings (especially complexity/duplicate-code) even when status passes.
