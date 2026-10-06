# Render Filters System

PHP server-side HTML modification pipeline for core blocks and FS blocks. Filters hook `render_block` (or `render_block_core/{block}`) to modify block HTML before it's sent to the browser.

## Auto-loader

**File**: `inc/render-filters.php`
```php
foreach ( glob( __DIR__ . '/render-filters/*.php' ) as $file ) {
    require_once $file;
}
```
Every `.php` file in `inc/render-filters/` is auto-loaded. To add a new filter: create a file in that directory. No registration needed.

## Hook conventions

- **Targeted hooks**: `add_filter('render_block_core/{block}', callback, 10, 2)` — fires only for that specific core block. Used by: `modal-button.php` (`render_block_core/button`), `image.php` (`render_block_core/image`), `cover.php` (`render_block_core/cover`), `lazy-video.php` (`render_block_core/video`), `custom-play-button.php` (`render_block_core/video`), `columns.php` (`render_block_core/columns`).
- **Generic hook**: `add_filter('render_block', callback, 10, 2)` — fires for ALL blocks. Must check `$block['blockName']` early. Used by: `accordion-interactive.php` (checks `fs-blocks/accordion-interactive`), `content-showcase-context.php` (uses `pre_render_block` + `render_block` pair — see below).
- **Callback signature**: `function($block_content, $block)` where `$block_content` is rendered HTML string, `$block` is parsed block array with `blockName` and `attrs`.
- **Return**: Always return `$block_content` (modified or unmodified). Never return null/empty unless intentionally suppressing output.

## WP_HTML_Tag_Processor usage

The plugin uses `WP_HTML_Tag_Processor` extensively. Key capabilities and limitations:
- **CAN**: set/remove attributes, add/remove classes, get attribute values, set bookmarks, seek to bookmarks.
- **CANNOT**: rename tags, insert new elements, delete elements, modify text content.

When the processor is insufficient, the plugin falls back to bounded string manipulation (see modal-button trick below).

## Per-filter inventory

| File | Block | Trigger attribute | What it does |
|---|---|---|---|
| `image.php` | `core/image` | always (unless `disableForcedLazyLoading`) | Sets `loading="lazy"` + `decoding="async"` on `<img>` |
| `cover.php` | `core/cover` | `useEmbedBackground` / `lazyLoadVideo` / always for img | Embed background iframe (YouTube/Vimeo), lazy video src swap, lazy img |
| `lazy-video.php` | `core/video` | `lazyLoadVideo` | Swaps `src` → `data-src`, adds `data-fs-lazy-video="true"` |
| `custom-play-button.php` | `core/video` | `useCustomPlayButton` | Inserts overlay div with poster background + play button before `<video>` |
| `modal-button.php` | `core/button` | `triggerModal` + `modalId` | Converts `<a>` to `<button>`, injects Interactivity API attrs |
| `accordion-interactive.php` | `fs-blocks/accordion-interactive` | `openFirstItem` | Sets first item active, adds `show` class, updates aria-expanded |
| `columns.php` | `core/columns` | `isList` attribute | Adds `role="list"` to container + `role="listitem"` to each column, plus `wp-block-fancysquares-columns`/`-column` classes |
| `content-showcase-context.php` | `fs-blocks/content-showcase` | — | Uses `pre_render_block` to collect accordion item data onto a GLOBALS context stack; `render_block` pops it. Enables content-showcase children to access parent accordion media state during rendering |

## The anchor→button bounded-replacement trick

`modal-button.php` needs to convert a core/button `<a>` element to a `<button>`. `WP_HTML_Tag_Processor` cannot rename tags, so this is done in two passes:

**Pass 1** (Tag_Processor): Tags the anchor with `data-fs-modal-trigger="1"`, sets all Interactivity API + aria attributes.

**Pass 2** (`fs_core_enhancements_convert_modal_trigger_anchor_to_button`): Bounded string replacement.
1. Find `data-fs-modal-trigger="1"` offset in HTML.
2. Backtrack with `strripos` to the `<a` opening tag start.
3. Find the `>` closing the opening tag.
4. Extract the full opening tag, strip the trigger marker, replace `<a` with `<button`.
5. Find the matching `</a>` and replace with `</button>`.

This is safe because the trigger marker uniquely identifies the tagged element and the search is bounded.

## Cover embed background (YouTube/Vimeo)

`cover.php` has extensive URL normalization for embed backgrounds:
- `fs_core_enhancements_cover_get_embed_background_url($raw_url)` — validates scheme, normalizes host, extracts video ID from YouTube (`/watch?v=`, `/embed/`, `/shorts/`, `/live/`, `youtu.be`) or Vimeo paths.
- Builds privacy-friendly embed URLs: `youtube-nocookie.com/embed/`, `player.vimeo.com/video/`.
- `fs_core_enhancements_cover_render_embed_background()` — hides native video/img elements (`hidden`, `src=""`), inserts iframe before inner container using a temporary anchor token + cleanup pass.

## Render helpers (`inc/render-helpers.php`)

- `fs_core_enhancements_get_prefixed_block_id($attributes, $prefix, $attribute_key)` — extracts `blockId` from attributes, sanitizes, prefixes. Falls back to `wp_unique_id($prefix)` if empty.
- `fs_core_enhancements_get_sanitized_classes($base_classes, $attributes)` — merges `additionalClasses` array from attributes into base classes, runs `sanitize_html_class` on each, filters empties.

## Content-showcase context stack (`inc/render-filters/content-showcase-context.php`)

This filter is architecturally different from the others. It uses a **GLOBALS-based render context stack** to pass accordion media data from parent content-showcase to its child blocks during rendering:
1. `pre_render_block` (priority 10, 3 args): When a `fs-blocks/content-showcase` block is about to render, collects accordion item data (`fs_showcase_collect_accordion_data`) — iterates inner blocks, extracts `showcaseMediaId` per item, determines active item. Pushes `{ itemsData, activeItemId }` onto `$GLOBALS['fs_showcase_context_stack']`.
2. Child blocks render normally and can call `fs_showcase_context_stack_peek()` to read the parent showcase context.
3. `render_block` (priority 10, 2 args): After content-showcase finishes rendering, pops the stack.

This is the ONLY filter using `pre_render_block`. It does NOT modify HTML — it manages render-time context propagation.

## Cross-references
- `mem:interactivity-api-blocks` — how modal-button output connects to the `fancySquaresModal` store; accordion openFirstItem connects to `fancySquaresAccordionInteractive` store.
- `mem:asset-enqueue-system` — both this system and the enqueue system hook `render_block`, but at different layers (enqueue modifies asset loading, filters modify HTML content).
