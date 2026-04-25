# Release Notes

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
