# Fancy Squares - Core Block Enhancements

Extend core blocks with Bootstrap-style utility classes, breakpoint width controls, and media enhancements. This plugin adds inspector controls and server-side render filters for a curated set of core blocks.

## Requirements

- WordPress 6.3+
- Node/npm to build assets (via `@wordpress/scripts`)

## Quick Start

1. Install dependencies: `npm install`
2. Build assets: `npm run build` (or `npm run start` for watch mode)
3. Activate the plugin in WordPress.
4. In the editor, select a supported block and open the inspector to apply classes.

## Editor Usage

### Token class selectors
The "Visibility / Position Classes" panel exposes curated Bootstrap-style tokens. Use "Show Values" to toggle between labels and the raw class values.

### Block-specific dropdowns
Some blocks include a dropdown for single-choice options (for example, columns layout or cover bleed). Selecting a value stores a single attribute and emits the chosen class.

### Width Settings (core/column)
The Width Settings panel exposes Base/Sm/Md/Lg/Xl/Xxl breakpoints. Setting a width emits classes like `wp-block-column--column-6` or `wp-block-column--column-md-4`. "Auto" emits the `auto` token, and "Inherit" clears the attribute.

Breakpoints:
- Base: All
- Sm: >=576px
- Md: >=768px
- Lg: >=992px
- Xl: >=1200px
- Xxl: >=1400px

When any child column has custom width values, the parent `core/columns` block is auto-updated with the `is-style-bootstrap` class. When no widths are set, the class is removed.

### Spacing controls
Padding, Margin, and Negative Margin panels appear only on blocks configured in `BLOCK_CONFIG`. These controls generate Bootstrap-style spacing classes for Base/Sm/Md/Lg/Xl. Negative margins use the `-n` convention, and a value of `0` is treated as "no class".

### Block-specific toggles
- List Settings: adds list semantics to `core/columns` and `core/column`.
- Video Settings: adds lazy video loading (cover/video) and a custom play overlay (video only).
- Modal Settings: converts `core/button` into a modal trigger.

### RichText span format
Use the "Span" toolbar button to apply inline utility classes and optional text/background colors. The format adds a `fs-span-base` class and stores selected tokens and inline styles on the span.

## Allowed Blocks (Configuration)

Allowed blocks are defined in `src/config/blockConfig.js` under `ALLOWED_BLOCKS`. Each block entry in `BLOCK_CONFIG` controls which panels appear (token groups, dropdowns, spacing controls, width controls, and layout toggles).

## How to Add or Update Settings

### Add a new block to the extension UI
1. Add the block name to `ALLOWED_BLOCKS` in `src/config/blockConfig.js`.
2. Add a matching entry in `BLOCK_CONFIG` describing which controls should appear.
3. If you need new token groups, add options in `data/bootstrap-classes/` and wire them into `CLASS_OPTIONS_MAP`.
4. Run `npm run build` and verify the inspector panels in the editor.

### Add or adjust token options
1. Update the relevant file in `data/bootstrap-classes/` (for example `margin-options.js`).
2. Ensure `data/bootstrap-classes/index.js` exports it.
3. If it is a new token group, add it to `CLASS_OPTIONS_MAP` in `src/config/blockConfig.js`.

### Add or adjust spacing controls
1. Edit the `allowedPaddingControls`, `allowedPositiveMarginControls`, or `allowedNegativeMarginControls` arrays in `BLOCK_CONFIG`.
2. If you add new breakpoint attributes, update `generateAttributes()` in `src/utils/helpers.js` and the related control components.

### Add a block-specific toggle (inspector control)
1. Add block attributes in `src/block-enhancements.js` under the `blocks.registerBlockType` filter.
2. Add the inspector control UI in `src/inspector-controls/` and wire it in `src/block-enhancements.js` under the `editor.BlockEdit` filter.
3. If the feature needs server-side markup changes, add a render filter under `inc/render-filters/` and load it from `inc/render-filters.php`.

### Update width settings
1. Width UI and classes live in `src/components/WidthControl.js` and `src/components/WidthControls.js`.
2. Class composition is in `generateClassName()` in `src/utils/helpers.js`.
3. Parent class auto-update (`is-style-bootstrap`) is handled in `src/block-enhancements.js`.

## Supported Blocks and Controls

- `core/heading`: tokens (display, position, zindex, blend mode); dropdown (Heading Option).
- `core/paragraph`: tokens (display, position, zindex); padding (top, bottom); positive margin (all, vertical); negative margin (top, bottom, left, right); dropdown (Paragraph Option).
- `core/list`: tokens (display, position, zindex); dropdown (List Option).
- `core/list-item`: tokens (display, position, zindex); dropdown (List Item Option).
- `core/buttons`: tokens (display, margin, position, zindex); dropdown (Button Option).
- `core/columns`: tokens (display, position, zindex, alignItems, justifyContent); dropdown (Columns Layout); Layout toggle (Constrain width); List Settings toggle.
- `core/column`: tokens (display, position, zindex, selfAlignment, order); dropdown (Column Layout Override); Width Settings (Base/Sm/Md/Lg/Xl/Xxl).
- `core/cover`: tokens (display, position, zindex, bleed options); dropdown (Bleed Options); Video Settings (lazy load for video backgrounds).
- `core/video`: Video Settings (lazy load + custom play button overlay).
- `core/group`: tokens (display, position, zindex, gap spacing).
- `core/button`: Modal Settings (trigger modal + modal ID).
- `core/image`: render filter adds `loading="lazy"` and `decoding="async"`.

Note: `core/button` and `core/image` are enhanced via filters and inspector controls but are not part of the token-based block extension list.

## Output Behavior

- `generateClassName()` composes token classes, spacing classes, and width classes into the block `className`.
- Spacing classes follow Bootstrap patterns (for example `pt-3`, `mt-md-2`, `ms-lg-4`). Negative margins use `-n` (for example `mt-n2`).
- Column widths use `wp-block-column--column-*` classes with optional breakpoints (for example `wp-block-column--column-lg-4`).
- List Settings adds `role="list"` to columns and `role="listitem"` to child columns, plus `wp-block-fancysquares-*` classes.
- Lazy video adds `data-fs-lazy-video` and `data-src` while clearing `src`; `src/frontend.js` swaps the source in when visible.
- Custom play button inserts a `.fs-video-overlay` when a poster is present and starts playback on click.
- Modal Settings converts `core/button` markup into a `<button>` with `data-bs-toggle="modal"` and `data-bs-target="#modal-id"`.

## Development

Scripts:
- `npm run build` - build editor + frontend assets to `build/`
- `npm run start` - watch mode for development
- `npm run format` - format with WordPress Prettier rules
- `npm run lint:js` - lint JavaScript
- `npm run lint:css` - lint styles
- `npm run plugin-zip` - generate a release zip

## Key Files (What They Do)

- `fancy-squares-core-enhancements.php` - plugin bootstrap and hooks setup.
- `inc/assets.php` - enqueues editor and frontend bundles from `build/`.
- `inc/render-filters.php` - loads all render filter files in `inc/render-filters/`.
- `inc/render-filters/*` - server-side output tweaks for lists, cover/video lazy loading, modal buttons, and play overlays.
- `build/` - compiled assets from `npm run build` (do not edit by hand).
- `data/bootstrap-classes/` - curated token lists for class pickers (display, spacing, alignment, etc.).
- `docs/` - local reference docs for block editor APIs (not loaded by the plugin).
- `src/index.js` - editor entry point; registers extensions and formats.
- `src/frontend.js` - frontend entry point; boots lazy video and play button behavior.
- `src/registerExtensions.js` - registers block extensions using `@10up/block-components`.
- `src/block-enhancements.js` - editor filters and parent class auto-update for columns.
- `src/utils/helpers.js` - attribute generation, token utilities, and class name composition.
- `src/config/blockConfig.js` - allowed blocks, per-block configuration, and dropdown options.
- `src/config/constants.js` - spacing side/type constants used by helpers and controls.
- `src/components/BlockEdit.js` - inspector UI wiring based on `BLOCK_CONFIG`.
- `src/components/TokenFields.js` - token field UI for class groups and suggestions.
- `src/components/WidthControl.js` / `src/components/WidthControls.js` - breakpoint width UI and tabs.
- `src/components/PaddingControl.js` / `src/components/PaddingControls.js` - padding UI and tabs.
- `src/components/PositiveMarginControl.js` / `src/components/PositiveMarginControls.js` - margin UI and tabs.
- `src/components/NegativeMarginControl.js` / `src/components/NegativeMarginControls.js` - negative margin UI and tabs.
- `src/inspector-controls/` - block-specific toggles (list semantics, lazy video, modal trigger).
- `src/formats/span-format.js` - RichText span format with inline colors and utility tokens.
- `src/assets/scss/` - editor/front-end styles for block UI and custom enhancements.
- `src/assets/js/lazyVideos.js` - lazy video loader.
- `src/assets/js/customPlayButtons.js` - custom play overlay behavior.

## Notes

- The editor UI uses Bootstrap-like utilities, but width classes are plugin-specific (`wp-block-column--column-*`).
- Negative margins treat `0` as a no-op, so no class is emitted for zero values.
- Spacing controls currently surface Base/Sm/Md/Lg/Xl in the UI; attributes include Xxl for future use.

## License

GPL-2.0-or-later
