# Columns Layout Presets Design

## Context

The plugin previously had column layout option data such as `row-cols-*` and later a `columnsLayout` dropdown that emitted `cols-mobile-*`, `cols-tablet-*`, and `cols-desktop-*` classes. Current behavior no longer uses those parent layout classes. Instead, `core/column` exposes Width Settings that emit `wp-block-column--column-*` classes, and `core/columns` automatically receives `is-style-bootstrap` when any child column has custom widths.

Current relevant files:

- `src/config/blockConfig.js` configures `core/columns` and `core/column` controls.
- `src/components/WidthControls.js` and `src/components/WidthControl.js` implement per-column Width Settings.
- `src/utils/helpers.js` emits width classes from child column attributes.
- `src/extensions/core/block-enhancements.js` applies/removes `is-style-bootstrap` on parent columns.
- `src/styles/components/_columns.scss` renders the width class CSS.
- `docs/plugin/user-guide.md` documents current Width Settings behavior.
- `data/class-families.json` maps current column classes to frontend style detection.

## Goal

Add an admin-side convenience control on parent `core/columns` that lets users apply common responsive layouts to the current child columns without reintroducing a second frontend layout class system.

The first version includes three presets:

- `1 mobile / 2 md+`
- `1 mobile / 3 md+`
- `1 mobile / 4 md+`

## Non-Goals

- Do not re-add raw `row-cols-*` classes.
- Do not restore `cols-mobile-*`, `cols-tablet-*`, or `cols-desktop-*` parent classes.
- Do not add persistent parent layout sync.
- Do not prevent users from editing individual child column Width Settings after applying a preset.
- Do not add frontend runtime behavior.

## Selected Approach

Use a one-time parent preset apply helper.

The parent `core/columns` inspector will let a user choose a preset and click an explicit apply button. Applying a preset updates the existing width attributes on each direct child `core/column`. After that, the child columns remain independently editable through the existing Width Settings.

This approach is preferred because it reuses the current `wp-block-column--column-*` class family, avoids obsolete parent layout classes, and keeps the parent control honest about what it does.

## Alternatives Considered

### Restore a parent layout dropdown

This would reintroduce a `columnsLayout` parent attribute and parent layout tokens. It is closer to historical behavior but creates a second layout system alongside the current child width controls. It would also require CSS, frontend class-family detection, docs, and regression coverage for the restored class family.

### Persistent parent layout state

This would store a parent preset and keep child columns synced as blocks are added, removed, or changed. It adds hidden behavior and overwrite risk, especially when users customize individual child widths. It is more complex than the requested convenience workflow.

## Admin UI Design

Add a `Columns Layout Presets` panel to the parent `core/columns` inspector.

The panel contains:

- Help text: `Apply a responsive layout preset to the current child columns. This sets each child column's Width Settings once; you can adjust individual columns afterward.`
- A preset selector with the three supported presets.
- A compact summary of the selected preset before applying.
- An `Apply layout preset` button.
- A post-apply confirmation or warning.

Example summary text:

- `This will set Base to 12 columns and Md+ to 6 columns on each current child column.`
- `This will set Base to 12 columns and Md+ to 4 columns on each current child column.`
- `This will set Base to 12 columns and Md+ to 3 columns on each current child column.`

Example success notice:

- `Layout preset applied to 4 child columns. Individual Width Settings remain editable.`

Example warning notice:

- `No child columns were found. Add columns before applying a layout preset.`

## Data Flow

The parent control reads direct child block IDs from the block editor store. On apply, it updates only direct children whose block name is `core/column`.

Preset mapping:

| Preset | Base width | Md width | Other breakpoint widths |
| --- | --- | --- | --- |
| `1 mobile / 2 md+` | `wp-block-column--column-12` | `wp-block-column--column-md-6` | clear `sm`, `lg`, `xl`, and `xxl` |
| `1 mobile / 3 md+` | `wp-block-column--column-12` | `wp-block-column--column-md-4` | clear `sm`, `lg`, `xl`, and `xxl` |
| `1 mobile / 4 md+` | `wp-block-column--column-12` | `wp-block-column--column-md-3` | clear `sm`, `lg`, `xl`, and `xxl` |

Apply must clear non-base, non-`md` width attributes so stale `sm`, `lg`, `xl`, or `xxl` values cannot override the selected preset.

## Edge Cases

- If there are no direct child columns, do not apply and show a warning.
- If existing custom widths are present, overwrite them only after the explicit Apply click.
- If a new child column is added after applying a preset, do not auto-sync it; the user can apply the preset again.
- If a user manually changes child Width Settings after applying a preset, preserve that manual change.
- If the parent already has `is-style-bootstrap`, leave current behavior in place.
- If no child widths remain custom after later edits, existing parent class cleanup should continue to remove `is-style-bootstrap`.

## Documentation

Update user-facing docs to explain:

- Parent presets are a one-time helper.
- Applying a preset updates child Width Settings.
- Individual child columns remain editable afterward.
- Presets use Base plus `md` breakpoint widths.

Update developer docs to identify the new parent preset control and its relationship to existing Width Settings files.

## Testing And Verification

Source-level tests or checks should verify preset-to-width mappings.

Manual editor QA should verify:

- Applying each 2/3/4 preset to columns with multiple children.
- Applying over existing custom widths.
- No-child warning behavior.
- Adding a new column after applying a preset does not auto-sync.
- Individual child Width Settings can override the applied preset.
- Parent `is-style-bootstrap` behavior still follows existing child width detection.

Required final verification for implementation:

- `npm run regression:gate`

## Acceptance Criteria

- A parent `core/columns` admin control exists for the three approved responsive presets.
- Selecting a preset does not apply it until the user clicks an explicit Apply button.
- Applying a preset writes existing child column width attributes and does not introduce new frontend layout classes.
- Admin copy explains that the preset updates child Width Settings once and that individual columns remain editable.
- A confirmation or warning informs the user what happened after Apply.
- Documentation reflects the new preset behavior.
- The implementation passes the project regression gate.
