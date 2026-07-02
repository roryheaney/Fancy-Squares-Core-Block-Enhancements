# Release Notes

## 1.2.0 - 2026-06-30

### Added

- Columns Layout Presets panel on parent `core/columns` inspector.
- Responsive layout presets:
  - `1 mobile / 2 md+`
  - `1 mobile / 3 md+`
  - `1 mobile / 4 md+`
  - `1 mobile / 2 md / 4 lg+`
- One-time apply helper that writes existing child `core/column` Width Settings.
- Reset columns action that clears all child width attributes and reverts to default equal-width behavior.
- Admin help text, summaries, and confirmation/warning notices.
- Source-level regression checks for preset mappings, UI, and docs.
- User and developer documentation for presets and reset behavior.

### Fixed

- Editor broken states where the active tab item content was hidden due to parent/child active-tab state desync.
- Styles not loading.
- Modal audit fixes.

### Changed

- Generalized preset data model from single `mdColumns` field to per-preset `widths` maps with a derived breakpoint clear list.
- Extracted shared no-child-columns warning constant.
- Removed the unused `settings.custom.framework.halfGap` token field from generated framework tokens after columns moved to `--wp--style--block-gap` based sizing.
- General audit and code quality improvements across editor and render paths.

### Validation

- `npm run lint:all` passed.
- `npm run build` passed.
- `npm run regression:gate` passed.

## 1.1.8 - 2026-03-30

### Changed

- Frontend class-family detection now uses shared manifest entries from `data/class-families.json`.
- Added `data/class-family-baseline.snapshot.json` fixtures for parity checks.
- Updated `scripts/audit-class-coverage.mjs` to validate:
  - manifest schema/parity
  - runtime matcher synchronization
  - CSS selector coverage by family routing
- Updated `scripts/check-regression-quality.mjs` duplicate normalization to ignore block comments/docblocks before snippet matching.
- Removed repeated class-sync logic in multiple block `edit.js` files via `src/utils/use-sync-generated-classes.js`.
- Removed repeated render class/block-id logic via `inc/render-helpers.php` and usage updates in dynamic block renderers.
- Reduced complexity hotspots by splitting large source files into focused modules:
  - `inc/assets-token-detection.php`
  - `scripts/lib/regression-quality-source-checks.mjs`
  - `scripts/lib/style-token-formatters.mjs`
  - `scripts/lib/style-token-spacing.mjs`
  - block/formats helper modules under `src/blocks/**` and `src/formats/**`
- Updated plugin docs to document manifest-backed matching and troubleshooting flow.

### Behavior

- No intentional class routing or frontend enqueue behavior changes for supported class families.
- Utilities default remains `both` (Editor + front end).

### Validation

- `npm run lint:all` passed.
- `npm run build` passed.
- `npm run audit:class-coverage` passed (`331` tokens validated).

## Prior Releases

- Earlier release entries are not yet backfilled in this file.
