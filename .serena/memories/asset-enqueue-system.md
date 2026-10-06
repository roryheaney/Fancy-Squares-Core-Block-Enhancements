# Asset Enqueue System

How frontend scripts and styles are registered and conditionally loaded. The core principle: **register on `init`, conditionally enqueue on `render_block`**. This ensures assets load only when needed by rendered content.

## Registration vs conditional enqueue split

**Registration** (`fs_core_enhancements_register_frontend_assets()` on `init`):
- Registers all frontend handles but does NOT enqueue them.
- Must run on `init` (not later) so render-time conditional enqueues work before `wp_head()` in block themes.

**Conditional enqueue** (`fs_core_enhancements_maybe_enqueue_frontend_runtime()` on `render_block` priority 10):
- Fires for every block during rendering.
- Inspects block name + attributes to decide which assets to enqueue.
- Uses `wp_style_is()` / `wp_script_is()` guards to avoid duplicate enqueues.

## Handle name registry

| Handle | Loads | When enqueued |
|---|---|---|
| `fs-core-enhancements` | `build/index.js` | `enqueue_block_editor_assets` (editor only) |
| `fs-core-enhancements-editor` | `build/index.css` | `enqueue_block_assets` (admin-gated) |
| `fs-core-enhancements-frontend` | `build/frontend.js` | `render_block` — when interactive/lazy blocks are present |
| `fs-core-enhancements-frontend-style` | `build/frontend-styles.css` | `render_block` — when blocks need custom styles |
| `fs-core-enhancements-utilities` | `build/utilities.css` | `render_block` — when utility classes detected + setting is `both` |
| `fs-core-enhancements-swiper` (style) | Swiper CSS (CDN) | `render_block` — only for carousel blocks |
| `fs-core-enhancements-swiper` (script) | Swiper JS (CDN) | `render_block` — only for carousel blocks |

## Conditional enqueue decision tree

`fs_core_enhancements_maybe_enqueue_frontend_runtime($block_content, $block)`:

1. **Skip** if `is_admin()` or block data invalid.
2. **Frontend style**: enqueue if `fs_core_enhancements_block_needs_frontend_style($block_name, $attrs)` OR `fs_core_enhancements_block_content_needs_frontend_style($block_name, $block_content)`.
3. **Utilities style**: enqueue if `fs_core_enhancements_block_needs_utilities($attrs)` OR `fs_core_enhancements_block_content_needs_utilities($block_content)`.
4. **Carousel** (`fs-blocks/carousel`): enqueue frontend runtime + Swiper (CSS + JS). Early return.
5. **core/video**: enqueue frontend runtime if `lazyLoadVideo` or `useCustomPlayButton`.
6. **core/cover**: enqueue frontend runtime if `lazyLoadVideo` (and not `useEmbedBackground`).
7. **fs-blocks/accordion-item-interactive** / **fs-blocks/showcase-gallery**: enqueue frontend runtime.

## Utilities CSS setting

`fs_core_enhancements_get_utilities_setting()`:
- Option: `fs_core_enhancements_utilities_css` (or `FS_CORE_ENHANCEMENTS_OPTION_UTILITIES` constant).
- Values: `'off'`, `'editor'`, `'both'` (default).
- Frontend utilities only enqueue when setting is `'both'` (`fs_core_enhancements_should_enqueue_utilities_frontend()`).
- Editor utilities are always available (not gated by this setting).

## Token detection (`inc/assets-token-detection.php`)

Determines whether rendered blocks contain class tokens that require CSS bundles. Uses `data/class-families.json` manifest.

**Detection functions**:
- `fs_core_enhancements_get_class_families_manifest()` — loads + caches `data/class-families.json`. Each family has `runtimeMatcherFunction` and `tokenPattern`.
- `fs_core_enhancements_is_utility_token($token)` / `fs_core_enhancements_is_frontend_style_token($token)` — match tokens against manifest patterns (regex).
- `fs_core_enhancements_extract_tokens_from_attrs($attrs)` — scans all attribute values (strings + arrays) for class tokens.
- `fs_core_enhancements_extract_tokens_from_block_content($block_content)` — regex-extracts `class="..."` values from rendered HTML.

**Decision functions**:
- `fs_core_enhancements_block_needs_utilities($attrs)` — checks if any spacing attribute (padding/margin/negativeMargin prefix) has a value, OR if any token matches a utility pattern.
- `fs_core_enhancements_block_needs_frontend_style($block_name, $attrs)` — checks token patterns + hardcoded block list (alert, dynamic-picture-block, carousel always need frontend style; video needs it if custom play button).
- Content-based variants scan the rendered HTML for class attributes matching patterns.

## Swiper CDN registration

Registered in `fs_core_enhancements_register_frontend_assets()` with SRI integrity:
- CSS: `https://cdn.jsdelivr.net/npm/swiper@11.1.1/swiper-bundle.min.css` (sha384 integrity + `crossorigin="anonymous"`).
- JS: `https://cdn.jsdelivr.net/npm/swiper@11.1.1/swiper-bundle.min.js` (sha384 integrity + `crossorigin="anonymous"`).

Both set via `wp_style_add_data()` / `wp_script_add_data()` with `'integrity'` and `'crossorigin'` keys.

## Frontend runtime entry (`src/entries/frontend/index.js`)

Three init functions run on DOMContentLoaded (or immediately if already loaded):
1. `lazyLoadVideos()` — from `src/assets/js/lazyVideos`. Handles `data-fs-lazy-video="true"` elements.
2. `initCustomPlayButtons()` — from `src/assets/js/customPlayButtons`. Handles video overlay play buttons.
3. `initCarousel()` — from `src/assets/js/carousel`. Initializes Swiper carousels.

## Cross-references
- `mem:render-filters-system` — render filters add `data-fs-lazy-video` attributes that this system's runtime consumes.
- `mem:class-token-pipeline` — the `class-families.json` manifest + token patterns that drive conditional CSS detection.
