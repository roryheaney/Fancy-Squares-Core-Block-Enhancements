# Block Extensions System

How core blocks get token-driven inspector controls and className generation. This is the primary mechanism for extending core/heading, core/paragraph, core/columns, etc. with framework-aware class controls.

## Two parallel mechanisms (do not conflate)

### Mechanism 1: registerBlockExtension (token-class blocks)
- **File**: `src/extensions/register-extensions.js`
- **Library**: `registerBlockExtension()` from `@10up/block-components`
- **Scope**: Iterates `ALLOWED_BLOCKS` from `src/config/blockConfig.js` and registers one extension per core block.
- **What it does**: Adds custom attributes via `generateAttributes(config)`, renders inspector panels via `BlockEdit` component, generates className via `generateClassName(attrs, blockName, BLOCK_CONFIG)`.
- **Extension naming**: `custom-${blockName.replace('core/', '')}` (e.g. `custom-heading`, `custom-paragraph`).

### Mechanism 2: withCustomAttributes filter (special blocks)
- **File**: `src/extensions/core/block-enhancements.js`
- **Library**: `addFilter()` from `@wordpress/hooks`
- **Scope**: Hooks `blocks.registerBlockType` to add per-block attributes (NOT class tokens), and hooks `editor.BlockEdit` via HOC to inject specialized inspector controls.
- **What it does**: Adds attributes like `lazyLoadVideo`, `disableForcedLazyLoading`, `triggerModal`, `modalId`, `isList`, `useEmbedBackground`, `useCustomPlayButton`. Renders `ColumnsListControl`, `MediaControls`, or `ModalButtonControl` inspector components.

**Key distinction**: Mechanism 1 is for token-based classes (spacing, display, position, etc.). Mechanism 2 is for boolean/string feature toggles that PHP render filters read at output time.

## BLOCK_CONFIG shape (`src/config/blockConfig.js`)

Each entry keyed by block name (e.g. `'core/heading'`):
- `classOptions`: `string[]` — token categories to expose (e.g. `['display', 'position', 'zindex', 'blendMode']`). Each maps to option arrays in `data/bootstrap-classes/index.js` via `mem:class-token-pipeline`.
- `allowedPaddingControls` / `allowedPositiveMarginControls` / `allowedNegativeMarginControls`: `string[]` — which spacing sides to allow (`'all'`, `'horizontal'`, `'vertical'`, `'top'`, `'right'`, `'bottom'`, `'left'`). Absent = no controls.
- `dropdown`: `{ attributeKey, label, default, options }` — single-select dropdown rendered in a separate panel.
- `hasWidthControls`: `boolean` — enables responsive width inputs per breakpoint.
- `hasConstrainToggle`: `boolean` — enables the "Constrain width" toggle (columns).

FS custom blocks use `createFsSharedConfig(overrides)` — defaults to `classOptions: ['display', 'position', 'zindex']` plus padding + positive margin controls (all sides). Negative margin controls are NOT included by default (only overridden per-block in `index-block` and `content-wrapper`).

## Attribute ↔ Class round-trip

**generateAttributes(config)** in `src/utils/helpers.js`:
```
config.classOptions → ${classType}Classes: { type: 'array', default: [] }
config.dropdown     → ${attributeKey}: { type: 'string', default: 'none' }
config.hasWidthControls → width${Suffix} per breakpoint
config.hasConstrainToggle → isConstrained: { type: 'boolean', default: false }
spacing controls    → padding${Side}${Suffix} / margin${Side}${Suffix} / negativeMargin${Side}${Suffix}
```

**generateClassName(attrs, blockName, BLOCK_CONFIG)** reverses this: reads attribute values, produces token strings. Order of class emission:
1. constrain toggle → `wp-block-columns--constrained`
2. classOptions arrays → flattened token values
3. dropdown value (if not `'none'`/`''`)
4. width attributes (if not `'auto'`/`''`)
5. padding per side+breakpoint → `p-3`, `pt-md-4`, `pe-sm-2`, etc.
6. margin per side+breakpoint → `m-2`, `mt-lg-5`, etc.
7. negative margin per side+breakpoint → `m-n5`, `mt-n3` (see `mem:class-token-pipeline` for `getNegativeSpacingSlug`)

## Inspector UI (`src/components/BlockEdit.js`)

The single `BlockEdit` component renders ALL inspector panels for every token-class block, conditional on config:
- `hasClassOptions` → "Visibility / Position Classes" panel with `TokenFields` + "Show Values" toggle.
- `dropdownConfig.attributeKey` → "Block Specific Classes" panel with `SelectControl`.
- `hasConstrainToggle` → "Layout" panel with constrain toggle.
- `WidthControls` always rendered (internally gates on `config.hasWidthControls` + parent bootstrap context).
- `SpacingControls` for padding/margin/negativeMargin (each gated on `allowed*Controls` array presence).

Reads parent block context via `useSelect('core/block-editor')` to detect `is-style-bootstrap` className — gates width controls.

## Columns auto-bootstrap-style detection

In `src/extensions/core/block-enhancements.js`, the `withInspectorControls` HOC has special logic for `core/columns`:
- Uses `useSelect` to check if any child column has custom width attributes (non-`'auto'`).
- If yes → adds `is-style-bootstrap` className to parent columns block (via `updateBlockAttributes`).
- If no → removes `is-style-bootstrap`.
- `useEffect` dependency array: `[isColumnsBlock, hasCustomChildWidths, className, clientId, updateBlockAttributes]`.

## Cross-references
- `mem:class-token-pipeline` — how token values are generated from theme.json, breakpoint system, side-type constants.
- `mem:asset-enqueue-system` — where generated classes end up triggering conditional CSS enqueues.
- `mem:render-filters-system` — the filter-based attributes added by Mechanism 2 are read by PHP render filters.
