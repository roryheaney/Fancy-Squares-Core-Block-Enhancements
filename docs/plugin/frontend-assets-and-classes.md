# Frontend Assets and Classes

## Bundles

- `build/frontend.js`: runtime for interactive frontend behaviors
- `build/frontend-styles.css`: frontend style bundle for specific class families/features
- `build/utilities.css`: generated utility classes (spacing/display/flex/gap/position/z-index/blend)

## Enqueue Model

Assets are registered on `wp_enqueue_scripts`, and conditionally enqueued during block rendering.

Relevant code:

- Registration: `inc/assets.php` (`fs_core_enhancements_register_frontend_assets`)
- Conditional detection: `inc/assets.php` (`fs_core_enhancements_maybe_enqueue_frontend_runtime`)
- Frontend style token matcher: `fs_core_enhancements_is_frontend_style_token()`
- Utility token matcher: `fs_core_enhancements_is_utility_token()`

`core/cover` embed mode (`useEmbedBackground`) is rendered server-side in `inc/render-filters/cover.php` and does not require frontend runtime JS.

Canonical registry for these families:

- `data/class-families.json`
- `data/class-family-baseline.snapshot.json`
- Runtime matchers read manifest entries directly (no separate hardcoded regex fallback list).

## Utility Mode Default

Utilities mode now defaults to `both` (Editor + front end).

- Setting key: `fs_core_enhancements_utilities_css`
- Allowed values: `off`, `editor`, `both`
- Admin UI: **Settings > Fancy Squares Blocks**

## Framework Compatibility Layer

`src/styles/components/_framework-compat.scss` is an internal compatibility layer compiled into plugin CSS bundles. It provides required class families used by plugin output without requiring full Bootstrap to be present:

- `alert-*`
- `border-*`
- `rounded-*`

## Class Support Matrix

| Family | Source Control | CSS Bundle | Enqueue Trigger |
| --- | --- | --- | --- |
| `wp-block-column--column*` | `core/column` Width Settings (`src/components/WidthControl.js`) | `build/frontend-styles.css` (`src/styles/components/_columns.scss`) | Manifest-backed detection via `fs_core_enhancements_is_frontend_style_token()` |
| `wp-block-columns--constrained`, `is-style-bootstrap` | `core/columns` Constrain toggle + parent class updates | `build/frontend-styles.css` (`src/styles/components/_columns.scss`) | Manifest-backed detection via `fs_core_enhancements_is_frontend_style_token()` |
| `cover-negative-margin-left/right` | `core/cover` Bleed dropdown | `build/frontend-styles.css` (`src/assets/scss/cover-block.scss`) | Manifest-backed detection via `fs_core_enhancements_is_frontend_style_token()` |
| `fs-cover-embed-background` | `core/cover` embed mode | Inline style on injected iframe (`inc/render-filters/cover.php`) | Render filter injects iframe when `useEmbedBackground` and valid YouTube/Vimeo URL are present |
| `alert-*` | `fs-blocks/alert` style selector | `build/frontend-styles.css` (`src/styles/components/_framework-compat.scss`) | Explicit `fs-blocks/alert` route + manifest-backed token detection |
| `border-*`, `rounded-*` | `fs-blocks/dynamic-picture-block` controls | `build/frontend-styles.css` (`src/styles/components/_framework-compat.scss`) | Manifest-backed detection via `fs_core_enhancements_is_frontend_style_token()` |
| Spacing/display/flex/gap/position/z-index/blend | Token fields + spacing controls | `build/utilities.css` | Manifest-backed detection via `fs_core_enhancements_is_utility_token()` |

## Quick Troubleshooting

If a class appears in the editor but not on frontend:

1. Confirm the class family exists in `data/class-families.json` and is mapped to the expected matcher function.
2. Confirm utilities mode is not `off` when using utility-style classes.
3. Confirm rendered markup contains the expected class token.
4. Confirm the page theme calls `wp_footer()` (late style printing still depends on core hooks).
