# Fancy Squares - Core Block Enhancements

Extend core blocks with Bootstrap-style utility classes, breakpoint width controls, and media enhancements. This plugin adds inspector controls and server-side render filters for a curated set of core blocks.

## Current Version

-   `1.1.5`

## Release Highlights (1.1.5)

-   Updated editor controls to WP 6.7+ / 6.8+ component props (`__nextHasNoMarginBottom`, `__next40pxDefaultSize`) to remove deprecation warnings from plugin controls.
-   Migrated interactive directives to current Interactivity API event patterns (`data-wp-on--*` with synced handlers).
-   Moved span format modal styling to dedicated SCSS structure and simplified color selection to swatches-only for stable editor behavior.
-   Moved editor canvas stylesheet enqueue to iframe-safe loading via block asset hooks.

## Requirements

-   WordPress 6.9+
-   Node 20.x and npm 10+ to build assets (see `.nvmrc` and `package.json` `engines`)

## Quick Start

1. Use Node 20 (`nvm use` if applicable).
2. Install dependencies: `npm install`
3. Build assets: `npm run build` (or `npm run start` for watch mode)
4. Activate the plugin in WordPress.
5. (Optional) Enable custom blocks under Settings > Fancy Squares Blocks.
6. In the editor, select a supported block and open the inspector to apply classes.

## Editor Usage

### Content Showcase (Accordion + Gallery)

The Content Showcase block provides a two-column layout where an interactive
source (accordion) drives a synced media gallery. It uses the Interactivity API
to keep the gallery in sync when the active item changes.

Quick steps:

1. Insert `FS Content Showcase`.
2. In the left column, insert `FS Accordion (Interactive)` and add items.
3. On each accordion item, open "Showcase Media" and select an image or video.
4. In the right column, insert `FS Showcase Gallery` (restricted to the wrapper).

Notes:

-   The gallery is hidden on mobile by default (toggle in Showcase Layout).
-   The wrapper listens for `shown.fs.accordion` events. You can override the
    event name in Showcase Events if you later swap the source block.
-   The contract is extendable: any interactive source that emits the configured
    event with a stable `itemId` (and supports the showcase media field) can
    drive the gallery.
-   Tabs lifecycle events now include `detail.itemId` (alongside `detail.from` and
    `detail.to`), so tabs can be used as a showcase source without custom event mapping.
-   Each showcase instance is scoped to its wrapper, so multiple showcases on
    a page operate independently.

Extensibility contract:

-   Source block must emit a bubbling CustomEvent with `detail.itemId`.
-   The wrapper listens on its root element for `sourceEventName` (default:
    `shown.fs.accordion`).
-   Each source item must have a stable `itemId` attribute.
-   The item block must expose the showcase media field (`showcaseMediaId`).

### Advanced Dropdown settings

The `FS Advanced Dropdown` block includes block-level settings for default panel
behavior and top-level layout:

-   **Default first item visible**: when enabled, the first dropdown-enabled
    item becomes the fallback visible panel whenever no item is actively open.
-   **Top-level layout**:
    -   `Horizontal` keeps dropdown behavior under top items.
    -   `Left` renders top items in a left column with a single shared panel on
        the side (tabs-like) on desktop, and rehomes each panel back inside its
        parent list item on mobile.
-   **Left layout mobile behavior** (only when Top-level layout is `Left`):
    -   `Inline panels` (default): mobile rehomes each panel under its parent item.
    -   `List only (no panels)`: mobile hides dropdown panels and toggles so the
        top-level list is rendered as links/labels only.

### Token class selectors

The "Visibility / Position Classes" panel exposes curated Bootstrap-style tokens. Use "Show Values" to toggle between labels and the raw class values.

### Block-specific dropdowns

Some blocks include a dropdown for single-choice options (for example, columns layout or cover bleed). Selecting a value stores a single attribute and emits the chosen class.

### Width Settings (core/column)

The Width Settings panel exposes Base plus responsive breakpoints from generated framework tokens (default: Sm/Md/Lg/Xl/Xxl). Setting a width emits classes like `wp-block-column--column-6` or `wp-block-column--column-md-4`. "Auto" emits the `auto` token, and "Inherit" clears the attribute.

Breakpoints:

-   Base: All
-   Sm: >=576px
-   Md: >=768px
-   Lg: >=992px
-   Xl: >=1200px
-   Xxl: >=1400px

When any child column has custom width values, the parent `core/columns` block is auto-updated with the `is-style-bootstrap` class. When no widths are set, the class is removed.

### Spacing controls

Padding, Margin, and Negative Margin panels appear only on blocks configured in `BLOCK_CONFIG`. These controls generate Bootstrap-style spacing classes for Base/Sm/Md/Lg/Xl/Xxl. Negative margins use the `-n` convention, and a value of `0` is treated as "no class".

### Block-specific toggles

-   List Settings: adds list semantics to `core/columns` and `core/column`.
-   Media Settings: lazy video loading (cover/video), custom play overlay (video only), and forced image lazy-loading opt-out (cover/image).
-   Modal Settings: converts `core/button` into a modal trigger.

### RichText span format

Use the "Span" toolbar button to apply inline utility classes and optional text/background colors. The modal uses grouped selectors with add/remove chips, supports palette + custom color values, and preserves unknown existing classes/styles while editing. The format adds a `fs-span-base` class and stores selected tokens and inline styles on the span.

## Architecture: How Block Extensions Work

This plugin uses two different approaches for extending blocks, depending on whether they are core WordPress blocks or custom blocks:

### Core Blocks (Extended via registerBlockExtension)

Core blocks like `core/heading`, `core/paragraph`, `core/columns`, etc. are extended using `@10up/block-components`'s `registerBlockExtension()` function:

1. **Configuration**: Core blocks are listed in `ALLOWED_BLOCKS` in `src/config/blockConfig.js`
2. **Extension Registration**: `src/extensions/register-extensions.js` loops through `ALLOWED_BLOCKS` and calls `registerBlockExtension()` for each one
3. **Attributes Added**: The extension system dynamically adds attributes (padding, margin, class arrays, etc.) to the core block
4. **Inspector Controls**: The `BlockEdit` component is injected via the extension, adding inspector panels
5. **Class Generation**: A `classNameGenerator` function creates CSS classes from the attributes
6. **Frontend Output**: Core blocks use WordPress's built-in rendering, so classes are applied via the block's `className` attribute

### Custom Blocks (Direct BlockEdit Usage)

Custom blocks (`fs-blocks/*`) are registered separately and render `<BlockEdit />` directly in their edit components:

1. **Block Registration**: Each custom block has its own `index.js` that calls `registerBlockType()`
2. **Attributes**: Attributes are defined in the block's registration (including padding, margin, `additionalClasses`, etc.)
3. **Configuration**: Custom blocks have entries in `BLOCK_CONFIG` (but are NOT in `ALLOWED_BLOCKS`)
4. **Edit Component**: The block's edit component imports and renders `<BlockEdit {...props} />`
5. **BlockEdit Component**: Reads `BLOCK_CONFIG[props.name]` to determine which controls to show
6. **Class Generation**: Edit component uses `generateClassName()` to create CSS classes from attributes
7. **Sync to Attributes**: A `useEffect` hook syncs generated classes to the `additionalClasses` attribute array
8. **Frontend Output**: The block's PHP `render.php` file reads `$attributes['additionalClasses']` and outputs them

### Example: Custom Block Pattern

```javascript
// In edit.js for a custom block
import BlockEdit from '../../components/BlockEdit';
import { generateClassName } from '../../utils/helpers';
import { BLOCK_CONFIG } from '../../config/blockConfig';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';

export default function Edit( props ) {
	const { attributes, setAttributes, name } = props;
	const { additionalClasses } = attributes;

	// Generate classes from all attributes
	const generatedClassName = useMemo(
		() => generateClassName( attributes, name, BLOCK_CONFIG ),
		[ attributes, name ]
	);

	// Sync to additionalClasses for PHP rendering
	useEffect( () => {
		const currentClasses = Array.isArray( additionalClasses )
			? additionalClasses
			: [];
		const nextClasses = generatedClassName.split( ' ' ).filter( Boolean );
		if (
			JSON.stringify( currentClasses ) !== JSON.stringify( nextClasses )
		) {
			setAttributes( { additionalClasses: nextClasses } );
		}
	}, [ additionalClasses, generatedClassName, setAttributes ] );

	const blockProps = useBlockProps( {
		className: generatedClassName, // Show in editor
	} );

	return (
		<>
			<BlockEdit { ...props } /> { /* Renders inspector controls */ }
			<InspectorControls>
				{ /* Block-specific settings */ }
			</InspectorControls>
			<div { ...blockProps }>{ /* Block content */ }</div>
		</>
	);
}
```

```php
// In render.php for a custom block
$classes = [];
if ( ! empty( $attributes['additionalClasses'] ) && is_array( $attributes['additionalClasses'] ) ) {
    $classes = $attributes['additionalClasses'];
}
$classes = array_map( 'sanitize_html_class', $classes );
$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => implode( ' ', $classes ),
] );
// Output: <div <?php echo $wrapper_attributes; ?>>...</div>
```

### Configuration Files

-   **`ALLOWED_BLOCKS`**: Only contains core WordPress blocks that should be extended via `registerBlockExtension()`
-   **`BLOCK_CONFIG`**: Contains configuration for BOTH core and custom blocks, defining which controls appear in the inspector

Custom blocks under `src/blocks/` are disabled by default. Use Settings > Fancy Squares Blocks to enable them globally.

## How to Add or Update Settings

### Add a new CORE block to the extension UI

1. Add the block name (e.g., `core/quote`) to `ALLOWED_BLOCKS` in `src/config/blockConfig.js`.
2. Add a matching entry in `BLOCK_CONFIG` describing which controls should appear.
3. If you need new token groups, add options in `data/bootstrap-classes/` and wire them into the async class options map loader (`src/config/class-options-map.js`).
4. Run `npm run build` and verify the inspector panels in the editor.

### Add a new CUSTOM block with extension controls

1. Create the block in `src/blocks/your-block/` with `index.js`, `edit.js`, `block.json`, and `render.php`.
2. In `index.js`, register all needed attributes (including those from `generateAttributes()` and `additionalClasses`).
3. In `edit.js`:
    - Import `BlockEdit`, `generateClassName`, and `BLOCK_CONFIG`
    - Render `<BlockEdit {...props} />` in the component
    - Use `useMemo` to generate classes: `generateClassName(attributes, name, BLOCK_CONFIG)`
    - Use `useEffect` to sync generated classes to `additionalClasses` attribute
    - Apply `generatedClassName` to `blockProps`
4. In `render.php`, read `$attributes['additionalClasses']` and output to the wrapper element.
5. Add an entry in `BLOCK_CONFIG` (but NOT in `ALLOWED_BLOCKS`) describing which controls should appear.
6. Run `npm run build` and verify the inspector panels in the editor.

### Add or adjust token options

1. For spacing token options (`paddingOptions`, `marginOptions`, `gapOptions`), prefer updating your site `theme.json` (`settings.spacing.spacingSizes` or `settings.spacing.spacingScale`) and run `npm run tokens:site` (or `npm run tokens -- --theme-json-path=...` for custom paths). Use `data/style-tokens.default.json` only as a plugin fallback.
2. For non-spacing token groups, update the relevant file in `data/bootstrap-classes/` (for example `display-options.js`, `position-options.js`).
3. Ensure `data/bootstrap-classes/index.js` exports the token group.
4. If it is a new token group, add it to the map in `src/config/class-options-map.js`.

### Add or adjust spacing controls

1. Edit the `allowedPaddingControls`, `allowedPositiveMarginControls`, or `allowedNegativeMarginControls` arrays in `BLOCK_CONFIG`.
2. If you add new breakpoint attributes, update `generateAttributes()` in `src/utils/helpers.js` and the related control components.

### Add a block-specific toggle (inspector control)

1. Add block attributes in `src/extensions/core/block-enhancements.js` under the `blocks.registerBlockType` filter.
2. Add the inspector control UI in `src/inspector-controls/` and wire it in `src/extensions/core/block-enhancements.js` under the `editor.BlockEdit` filter.
3. If the feature needs server-side markup changes, add a render filter under `inc/render-filters/` and load it from `inc/render-filters.php`.

### Update width settings

1. Width UI and classes live in `src/components/WidthControl.js` and `src/components/WidthControls.js`.
2. Class composition is in `generateClassName()` in `src/utils/helpers.js`.
3. Parent class auto-update (`is-style-bootstrap`) is handled in `src/extensions/core/block-enhancements.js`.

## Supported Blocks and Controls

-   `core/heading`: tokens (display, position, zindex, blend mode); dropdown (Heading Option).
-   `core/paragraph`: tokens (display, position, zindex); padding (top, bottom); positive margin (all, vertical); negative margin (top, bottom, left, right); dropdown (Paragraph Option).
-   `core/list`: tokens (display, position, zindex); dropdown (List Option).
-   `core/list-item`: tokens (display, position, zindex); dropdown (List Item Option).
-   `core/buttons`: tokens (display, margin, position, zindex); dropdown (Button Option).
-   `core/columns`: tokens (display, position, zindex, alignItems, justifyContent); dropdown (Columns Layout); Layout toggle (Constrain width); List Settings toggle.
-   `core/column`: tokens (display, position, zindex, selfAlignment, order); dropdown (Column Layout Override); Width Settings (Base + responsive token breakpoints).
-   `core/cover`: tokens (display, position, zindex, bleed options); dropdown (Bleed Options); Media Settings (lazy video for cover video backgrounds + disable forced image lazy loading).
-   `core/video`: Video Settings (lazy load + custom play button overlay).
-   `core/group`: tokens (display, position, zindex, gap spacing).
-   `core/button`: Modal Settings (trigger modal + modal ID).
-   `core/image`: render filter forces `loading="lazy"` and `decoding="async"` by default, with per-block opt-out via `disableForcedLazyLoading`.
-   `fs-blocks/index-block`: tokens (position, zindex); padding, margin, negative margin (top/right/bottom/left); auto index display inside columns.
-   `fs-blocks/content-wrapper`: tokens (display, order, selfAlignment, position, zindex); padding/margin/negative margin; wrapper element (div/section). Note: layout dropdown is currently disabled in config.
-   `fs-blocks/dynamic-picture-block`: responsive picture element with optional aspect ratio, border, and radius utilities.
-   `fs-blocks/alert`: alert variant selector; display tokens; padding and positive margin controls; RichText message content.
-   `fs-blocks/accordion-interactive`: accordion container using WordPress Interactivity API; display/position/zindex tokens; padding and positive margin controls; optional "Open First Item" toggle; CustomEvents API (hide, hidden, show, shown).
-   `fs-blocks/accordion-item-interactive`: child accordion item with title and content; uses Interactivity API for state management; optional showcase media picker when inside Content Showcase.
-   `fs-blocks/content-showcase`: wrapper block that provides local context for a synced gallery; layout + mobile hide toggles; Interactivity API store for syncing active media.
-   `fs-blocks/showcase-gallery`: gallery block that renders media from the showcase context; transition controls (fade/slide/zoom).
-   `fs-blocks/tabs-interactive`: tabbed container using WordPress Interactivity API; display/position/zindex tokens; padding and positive margin controls; CustomEvents API (hide, hidden, show, shown).
-   `fs-blocks/tab-item-interactive`: child tab item with title and content; uses Interactivity API for state management.
-   `fs-blocks/advanced-dropdown`: list-based dropdown container using WordPress Interactivity API; desktop opens on hover/focus with click fallback and keyboard support; supports "default first item visible" fallback and top-level layout modes (`horizontal` and tabs-like `left`); display/position/zindex tokens; padding and positive margin controls; tab-like editor workflow for managing many items.
-   `fs-blocks/advanced-dropdown-item`: child dropdown item with title, link URL, target/rel options, and optional nested dropdown panel content.
-   `fs-blocks/modal`: modal dialog using WordPress Interactivity API with Bootstrap 5 animations; size options (small/default/large/xl/fullscreen); centered positioning; scrollable content; static backdrop; keyboard navigation (Tab/Shift+Tab focus trap, Escape to close); focus management; CustomEvents API (show, shown, hide, hidden); ARIA compliant with always-visible close button.
-   `fs-blocks/carousel`: carousel container with Swiper-powered navigation, autoplay, and responsive breakpoints; display/position/zindex tokens; padding and positive margin controls.
-   `fs-blocks/carousel-slide`: child slide block with vertical alignment and core block content.

Note: `core/button` and `core/image` are enhanced via filters and inspector controls but are not part of the token-based block extension list.

## Output Behavior

-   `generateClassName()` composes token classes, spacing classes, and width classes into the block `className`.
-   Spacing classes follow Bootstrap patterns (for example `pt-3`, `mt-md-2`, `ms-lg-4`). Negative margins use `-n` (for example `mt-n2`).
-   Column widths use `wp-block-column--column-*` classes with optional breakpoints (for example `wp-block-column--column-lg-4`).
-   List Settings adds `role="list"` to columns and `role="listitem"` to child columns, plus `wp-block-fancysquares-*` classes.
-   Lazy video adds `data-fs-lazy-video` and `data-src` while clearing `src`; `src/entries/frontend/index.js` swaps the source in when visible.
-   Custom play button inserts a `.fs-video-overlay` when a poster is present and starts playback on click.
-   `core/image` and cover background images are forced to `loading="lazy"` + `decoding="async"` unless `disableForcedLazyLoading` is enabled on that block.
-   Modal Settings converts `core/button` markup into a `<button>` with Interactivity API directives (`data-wp-interactive`, `data-wp-on--click`, `data-wp-bind--aria-expanded`), plus `aria-controls` and `aria-haspopup="dialog"`.
-   Carousel outputs Swiper markup with `data-swiper` configuration; Swiper assets are loaded only when a carousel block is rendered.
-   Frontend runtime (`build/frontend.js`) is enqueued only when needed by rendered blocks (carousel, lazy video/custom play button scenarios, cover lazy video, and showcase/accordion integrations).
-   Frontend style bundle (`build/frontend-styles.css`) is conditionally enqueued only when style-dependent blocks/features are rendered (columns custom-width classes, cover bleed classes, custom video play overlay, dynamic picture block, carousel).
-   Utility style bundle (`build/utilities.css`) is conditionally enqueued when rendered blocks include generated utility classes (spacing, gap, display, flex, position, z-index, blend) and the Utilities CSS mode is set to `Editor + front end`.
-   Content Showcase collects accordion item media data on the server and emits it as local context; the showcase wrapper updates `activeItemId` on the `shown.fs.accordion` event.
-   A render filter maintains a per-render context stack so the showcase gallery can SSR before the wrapper outputs its context.

## Development

Scripts:

-   `npm run tokens` - regenerate token artifacts using fallback source resolution (`--theme-json-path` -> `FS_THEME_JSON_PATH` -> local plugin `theme.json` -> `data/style-tokens.default.json`).
-   `npm run tokens:site` - regenerate tokens from `../../themes/full-site-editing-build/theme.json`.
-   `npm run tokens:ci` - regenerate tokens from `../../themes/full-site-editing-build/theme.json` and fail if no theme source is resolved.
-   `npm run build` - run `tokens:site`, build editor + frontend assets to `build/`, then remove style-entry JS stubs (`build/frontend-styles.js`, `build/utilities.js`).
-   `npm run build:ci` - run `tokens:ci`, build assets, then remove style-entry JS stubs (CI-safe guard).
-   `npm run start` - watch mode for development (runs `tokens:site` first).
-   `npm run prune:style-stubs` - remove style-entry JavaScript stubs generated by webpack for CSS-only entries.
-   `npm run format` - format with WordPress Prettier rules.
-   `npm run lint:js` - lint JavaScript.
-   `npm run lint:css` - lint styles.
-   `npm run lint:php` - lint PHP syntax via `php -l` (`scripts/lint-php.mjs`).
-   `npm run lint:pkg-json` - validate `package.json`.
-   `npm run lint:md` - lint Markdown docs.
-   `npm run lint:all` - run all lint checks.
-   `npm run plugin-zip` - remove style-entry stubs, then generate a release zip.

### Token Source (Example)

Framework tokens are generated from `theme.json` in this order:

1. `--theme-json-path` CLI option (highest priority)
2. `FS_THEME_JSON_PATH` env var
3. local plugin `theme.json` (if present)
4. `data/style-tokens.default.json` fallback

The plugin consumes theme values as follows:

- `settings.spacing.spacingSizes` -> spacing scale used for spacing/gap classes and spacing control options.
- `settings.spacing.spacingScale` -> used when `spacingSizes` is absent; spacing presets are generated using WordPress theme.json scale rules.
- `settings.custom.framework.optionSets` -> optional UI option overrides for `columnsLayouts`, `bleedCoverOptions`, `alertOptions`, `borderOptions`, and `borderRadiusOptions`.
- `settings.custom.framework.breakpoints` -> responsive breakpoints used by plugin width/spacing behavior.
- `settings.custom.framework.containerMaxWidths` -> constrained columns max-width values.
- `settings.custom.framework.halfGap` and `containerPaddingX` -> framework scalar values.

Spacing behavior rules:

- If `settings.spacing.spacingSizes` exists and has values, only those slugs are generated (no extra fallback sizes are appended).
- If `settings.spacing.spacingSizes` is missing/empty, generation falls back to `settings.spacing.spacingScale`, then `settings.custom.framework.spacingScale` (legacy), then `data/style-tokens.default.json`.
- Include slug `0` in `spacingSizes` when you want explicit zero utility classes (for example `p-0`, `m-0`).

Example `theme.json`:

```json
{
  "version": 3,
  "settings": {
    "spacing": {
      "defaultSpacingSizes": false,
      "spacingSizes": [
        { "slug": "0", "name": "0", "size": "0" },
        { "slug": "10", "name": "2XS", "size": "0.25rem" },
        { "slug": "20", "name": "XS", "size": "0.5rem" },
        { "slug": "30", "name": "S", "size": "0.75rem" },
        { "slug": "40", "name": "M", "size": "1rem" }
      ]
    },
    "custom": {
      "framework": {
        "breakpoints": {
          "xs": "0",
          "sm": "576px",
          "md": "768px",
          "lg": "992px",
          "xl": "1200px"
        },
        "containerMaxWidths": {
          "sm": "540px",
          "md": "720px",
          "lg": "960px",
          "xl": "1140px"
        },
        "halfGap": "12px",
        "containerPaddingX": "0"
      }
    }
  }
}
```

Build usage:

```bash
npm run build
npm run build:ci
```

Resulting behavior from the example above:

- Spacing options/classes are generated for slugs `0`, `10`, `20`, `30`, `40` only.
- Spacing controls are discrete selects (no interpolated slider values).
- Responsive spacing classes are generated for `sm`, `md`, `lg`, `xl` (no `xxl`).
- Width tabs/classes follow the same breakpoint set (Base + `sm/md/lg/xl`).

## Key Files (What They Do)

-   `fancy-squares-core-enhancements.php` - plugin bootstrap, includes, and text-domain loading.
-   `inc/assets.php` - registers editor assets, registers frontend runtime/style assets, and conditionally enqueues frontend runtime per rendered block.
-   `inc/admin.php` - settings page for enabling custom blocks, Bootstrap CDN mode, and utilities CSS mode.
-   `inc/blocks.php` - custom block registration and interactivity module registration guard.
-   `inc/render-filters.php` - loads all render filter files in `inc/render-filters/`.
-   `inc/render-filters/*` - server-side output tweaks for columns list semantics, cover/image/video lazy handling, modal buttons, custom play overlays, and showcase context.
-   `build/` - compiled assets from `npm run build` (do not edit by hand).
-   `data/bootstrap-classes/` - curated token lists for class pickers (display, spacing, alignment, etc.).
-   `src/entries/editor/index.js` - editor entry point; registers extensions and formats.
-   `src/entries/frontend/index.js` - frontend entry point; boots lazy video, custom play button, and carousel behavior.
-   `src/entries/styles/frontend.scss` - frontend-only stylesheet entry.
-   `src/extensions/register-extensions.js` - registers block extensions for CORE blocks using `@10up/block-components`.
-   `src/extensions/core/block-enhancements.js` - editor filters and parent class auto-update for columns.
-   `src/utils/helpers.js` - attribute generation, token utilities, and class name composition (`generateClassName()`).
-   `src/config/blockConfig.js` - `ALLOWED_BLOCKS` (core blocks only), `BLOCK_CONFIG` (core + custom blocks), and dropdown options.
-   `src/config/constants.js` - spacing side/type constants used by helpers and controls.
-   `src/components/BlockEdit.js` - reusable inspector UI component that reads `BLOCK_CONFIG` to render controls.
-   `src/components/TokenFields.js` - token field UI for class groups and suggestions.
-   `src/config/class-options-map.js` - lazy-loaded class option map used by token selectors.
-   `src/components/SpacingControl.js` / `src/components/SpacingControls.js` - unified spacing UI and tabs for padding/margin/negative margin.
-   `src/components/WidthControl.js` / `src/components/WidthControls.js` - breakpoint width UI and tabs.
-   `src/inspector-controls/` - block-specific toggles (list semantics, media, modal trigger).
-   `src/formats/span-format.js` - RichText span format with inline colors and utility tokens.
-   `src/blocks/*/index.js` - custom block registration with attributes.
-   `src/blocks/*/edit.js` - custom block edit components that render `<BlockEdit />` and sync classes to `additionalClasses`.
-   `src/blocks/*/render.php` - custom block PHP rendering that outputs `$attributes['additionalClasses']` to frontend.
-   `src/styles/` - foundation/settings, generated SCSS tokens, utilities, and shared component SCSS.
-   `src/assets/scss/` - shared, frontend-only, and editor-only enhancement styles (including split carousel editor styles).
-   `src/assets/js/lazyVideos.js` - lazy video loader.
-   `src/assets/js/customPlayButtons.js` - custom play overlay behavior.
-   `src/assets/js/carousel.js` - Swiper carousel runtime behavior.
-   `scripts/generate-style-tokens.mjs` - generates SCSS/JS token artifacts and spacing option datasets from `theme.json` when available, with `data/style-tokens.default.json` fallback behavior.
-   `data/style-tokens.default.json` - plugin-owned fallback design tokens for breakpoints, container widths, spacing scale, and column gap.
-   `data/bootstrap-classes/generated-spacing-options.js` - auto-generated spacing option dataset consumed by class token controls.
-   `src/config/generated/framework-tokens.js` - auto-generated JS token exports used by editor controls (breakpoints, spacing scale, optional `frameworkOptionSets`).
-   `src/config/framework-option-sets.js` - resolves theme-driven option sets with plugin fallbacks for columns, cover bleed options, alerts, and picture block border controls.
-   `webpack.config.js` - custom entries for `index`, `frontend`, `frontend-styles`, and `utilities`.

## Notes

-   The editor UI uses Bootstrap-like utilities, but width classes are plugin-specific (`wp-block-column--column-*`).
-   Negative margins treat `0` as a no-op, so no class is emitted for zero values.
-   Spacing controls surface Base plus responsive breakpoints from generated framework tokens.
-   Forced lazy loading is on by default for `core/image` and cover background images, with block-level opt-out via the Media Settings toggle.

## License

GPL-2.0-or-later



