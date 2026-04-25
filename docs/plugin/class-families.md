# Class Families Registry

`data/class-families.json` is the canonical class-family inventory for frontend style detection and class-coverage validation work.

## What It Defines

- class family key
- target CSS bundle (`frontend-styles` or `utilities`)
- token regex pattern
- emitter sources (where classes originate)
- style sources (where CSS selectors are emitted)
- runtime matcher function responsible for detection

## Runtime Usage

- `inc/assets.php` loads this manifest through `fs_core_enhancements_get_class_families_manifest()`.
- Runtime matchers (`fs_core_enhancements_is_frontend_style_token()` and `fs_core_enhancements_is_utility_token()`) resolve patterns via the manifest helper path.
- There is no separate hardcoded regex fallback list in runtime matcher code.

## Companion Baseline

`data/class-family-baseline.snapshot.json` stores representative token fixtures and expected bundle routing for parity checks.

`scripts/audit-class-coverage.mjs` uses this baseline to verify manifest parity and matcher synchronization.

## Scope

- This registry documents current behavior.
- It does not change class API, bundle routing policy, or runtime behavior by itself.
