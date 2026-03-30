# Developer Guide

## Architecture Overview

This plugin extends blocks in two ways.

### 1) Core blocks via extension registration

Core blocks are extended through `registerBlockExtension()`.

- Block list: `src/config/blockConfig.js` (`ALLOWED_BLOCKS`)
- Extension registration: `src/extensions/register-extensions.js`
- Dynamic attributes: `generateAttributes()` in `src/utils/helpers.js`
- Class generation: `generateClassName()` in `src/utils/helpers.js`
- Inspector panels: `src/components/BlockEdit.js`

### 2) Custom blocks (`fs-blocks/*`) via direct block edit wiring

Custom block edit files render `<BlockEdit {...props} />` directly and sync generated classes to attributes for server rendering.

Typical custom block flow:

- block registration: `index.js`
- editor: `edit.js`
- server output: `render.php`
- metadata: `block.json`

## Adding or Updating Features

### Add a core block to extension UI

1. Add block name to `ALLOWED_BLOCKS`.
2. Add matching config entry in `BLOCK_CONFIG`.
3. Add any new token groups to `data/bootstrap-classes/` and `src/config/class-options-map.js`.
4. Build and verify inspector behavior.

### Add a custom block with extension controls

1. Create `src/blocks/your-block/` with `index.js`, `edit.js`, `block.json`, and `render.php`.
2. Register attributes (including generated extension attributes and `additionalClasses`).
3. Render `<BlockEdit {...props} />` in `edit.js`.
4. Use `generateClassName()` and sync to `additionalClasses`.
5. Output sanitized classes in `render.php`.
6. Add `BLOCK_CONFIG` entry.

### Add block-specific toggle/behavior

1. Add attributes in `src/extensions/core/block-enhancements.js` (`blocks.registerBlockType` filter).
2. Add inspector UI in `src/inspector-controls/`.
3. Add server render filters in `inc/render-filters/` when needed.

## Width Settings

- UI: `src/components/WidthControl.js`, `src/components/WidthControls.js`
- Class generation: `src/utils/helpers.js`
- Parent class update (`is-style-bootstrap`): `src/extensions/core/block-enhancements.js`

## Guardrails

- Do not hand-edit generated outputs:
  - `build/**`
  - `src/config/generated/**`
  - `src/styles/generated/**`
  - `data/bootstrap-classes/generated-spacing-options.js`
- Keep `block.json` at `apiVersion: 3`.
- Sanitize dynamic classes in server render output.
