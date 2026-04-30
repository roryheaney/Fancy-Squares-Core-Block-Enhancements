# User Guide

## Editor Usage

### Token class selectors

The **Visibility / Position Classes** panel exposes curated utility-style tokens. Use **Show Values** to toggle between labels and raw class values.

### Width Settings (`core/column`)

- Width classes emit tokens like `wp-block-column--column-6` or `wp-block-column--column-md-4`.
- `Auto` emits the `auto` token.
- `Inherit` clears the width attribute.

Breakpoints:

- Base: All
- Sm: `>=576px`
- Md: `>=768px`
- Lg: `>=992px`
- Xl: `>=1200px`
- Xxl: `>=1400px`

When any child column has custom width values, parent `core/columns` is auto-updated with `is-style-bootstrap`. When no widths are set, that class is removed.

### Spacing controls

Padding, margin, and negative margin panels appear only for blocks configured in `BLOCK_CONFIG`.

- Positive spacing examples: `pt-3`, `ms-lg-4`
- Negative spacing uses `-n`: `mt-n2`

### Block-specific toggles

- List Settings: adds list semantics to `core/columns` and `core/column`
- Media Settings: lazy video loading, custom play overlay, forced image lazy-loading opt-out
- Cover embed background: for `core/cover`, enable **Use embed background** and paste a YouTube/Vimeo URL to replace native cover media
- Modal Settings: converts `core/button` into a modal trigger

### RichText span format

Use the **Span** toolbar button to apply inline utility classes and optional text/background colors. Unknown existing classes/styles are preserved.

## Supported Blocks

Core blocks:

- `core/heading`
- `core/paragraph`
- `core/list`
- `core/list-item`
- `core/buttons`
- `core/columns`
- `core/column`
- `core/cover`
- `core/group`
- `core/video` (filter/toggle features)
- `core/button` (modal trigger conversion)
- `core/image` (lazy loading behavior + opt-out)

Custom blocks (`fs-blocks/*`) are disabled by default and can be enabled in settings.

## Output Behavior

- `generateClassName()` composes token, spacing, and width classes.
- `core/image` and cover background images are forced to `loading="lazy"` + `decoding="async"` unless `disableForcedLazyLoading` is set.
- `core/cover` embed mode (`useEmbedBackground`) supports YouTube and Vimeo only, normalizes YouTube to `youtube-nocookie.com`, and enforces autoplay/loop/muted non-interactive iframe background behavior.
- Carousel uses Swiper assets only when carousel blocks render.
- Frontend style/runtime bundles load conditionally based on rendered content.

For full asset-loading details, use [frontend-assets-and-classes.md](frontend-assets-and-classes.md).
