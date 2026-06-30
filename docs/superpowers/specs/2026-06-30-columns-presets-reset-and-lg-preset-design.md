# Columns Layout Presets: Reset And Lg Preset Design

## Context

This extends the existing Columns Layout Presets feature documented in `docs/superpowers/specs/2026-06-29-columns-layout-presets-design.md` and implemented in:

- `src/inspector-controls/columns-layout-presets.js` (preset definitions and attribute-mapping helpers)
- `src/inspector-controls/columns-layout-presets-control.js` (parent `core/columns` inspector panel)
- `scripts/lib/regression-columns-preset-checks.mjs` (source-level regression checks)

The current data model uses a single `mdColumns` field per preset and a fixed `WIDTH_BREAKPOINTS_TO_CLEAR` constant. That model cannot represent a preset that splits across two responsive breakpoints (md and lg).

## Goal

Add two capabilities to the existing Columns Layout Presets panel:

1. A **Reset columns** action that clears all width attributes on every child column so they revert to core/column default equal-width behavior.
2. A fourth preset `1 mobile / 2 md / 4 lg+` that sets Base, md, and lg widths.

## Non-Goals

- Do not change the one-time apply model or add persistent parent sync.
- Do not introduce new frontend layout classes.
- Do not change the existing three presets' output.
- Do not alter frontend runtime behavior or the `is-style-bootstrap` detection logic.

## Selected Approach

Generalize the preset data model to a per-preset `widths` object mapping breakpoint key to column count. The helper iterates `WIDTH_BREAKPOINT_KEYS` (exported from `src/config/breakpoints.js`): declared breakpoints get their width class, undeclared breakpoints get cleared to empty string. The fixed `WIDTH_BREAKPOINTS_TO_CLEAR` constant is removed because the clear list is now derived automatically.

Reset is a separate action, not a preset entry. It clears every `WIDTH_BREAKPOINT_KEYS` entry to empty string.

This generalizes cleanly so future multi-breakpoint presets need no helper changes.

## Data Model

### Preset definitions

Each preset declares a `widths` object where keys are breakpoint keys (`''` for base, `md`, `lg`, etc.) and values are column counts (1-12).

```js
export const COLUMN_LAYOUT_PRESETS = [
	{
		value: 'one-mobile-two-md',
		label: '1 mobile / 2 md+',
		widths: { '': 12, md: 6 },
		summary:
			'This will set Base to 12 columns and Md+ to 6 columns on each current child column.',
	},
	{
		value: 'one-mobile-three-md',
		label: '1 mobile / 3 md+',
		widths: { '': 12, md: 4 },
		summary:
			'This will set Base to 12 columns and Md+ to 4 columns on each current child column.',
	},
	{
		value: 'one-mobile-four-md',
		label: '1 mobile / 4 md+',
		widths: { '': 12, md: 3 },
		summary:
			'This will set Base to 12 columns and Md+ to 3 columns on each current child column.',
	},
	{
		value: 'one-mobile-two-md-four-lg',
		label: '1 mobile / 2 md / 4 lg+',
		widths: { '': 12, md: 6, lg: 3 },
		summary:
			'This will set Base to 12 columns, Md to 6 columns, and Lg+ to 3 columns on each current child column.',
	},
];
```

### Attribute update helpers

`getColumnsLayoutPresetAttributeUpdates(presetValue)`:

- Returns `null` for unknown preset values.
- For each key in `WIDTH_BREAKPOINT_KEYS`:
  - If the key is declared in the preset's `widths`, emit the width class: `wp-block-column--column-<count>` for base, `wp-block-column--column-<bp>-<count>` for responsive breakpoints.
  - If the key is not declared, emit empty string.

`getColumnsLayoutResetAttributeUpdates()`:

- Iterates `WIDTH_BREAKPOINT_KEYS` and emits empty string for every key.
- Returns the plain attributes object.

### Preset mapping table

| Preset | Base | md | lg | sm / xl / xxl |
| --- | --- | --- | --- | --- |
| `1 mobile / 2 md+` | 12 | 6 | clear | clear |
| `1 mobile / 3 md+` | 12 | 4 | clear | clear |
| `1 mobile / 4 md+` | 12 | 3 | clear | clear |
| `1 mobile / 2 md / 4 lg+` | 12 | 6 | 3 | clear |

Reset mapping: all breakpoints (Base, sm, md, lg, xl, xxl) cleared to empty string.

## Admin UI Design

The existing `Columns Layout Presets` panel gains two additions:

- The preset selector includes the fourth option `1 mobile / 2 md / 4 lg+` with its summary text.
- A new **Reset columns** button appears below the **Apply layout preset** button.

Reset interaction:

- Clicking **Reset columns** calls `getColumnsLayoutResetAttributeUpdates()` and applies the result to every direct `core/column` child via `updateBlockAttributes( childId, updates )`.
- It does not require a preset to be selected first.
- Success notice: `Width settings cleared on <N> child columns. Columns reverted to default equal-width behavior.`
- No-child warning: `No child columns were found. Add columns before applying a layout preset.`
- The help text gains one line: `Reset removes applied widths so columns revert to default equal-width behavior.`

The existing Apply flow, summary text, and notices are unchanged. Both Apply and Reset use the explicit-button model: selecting a preset never applies it automatically.

## Edge Cases

- Reset with no child columns: warning, no apply.
- Reset clears widths even if no preset was ever applied (idempotent).
- After reset, existing `is-style-bootstrap` parent cleanup removes the class because no child widths remain custom.
- Existing edge cases from the prior spec remain unchanged:
  - No child columns on Apply: warning, no apply.
  - Existing custom widths overwritten only after explicit Apply click.
  - New child column added after Apply: no auto-sync.
  - Manual child width changes after Apply: preserved.
  - Parent `is-style-bootstrap` behavior follows existing child width detection.

## Documentation

Update `docs/plugin/user-guide.md`:

- Add the new preset `1 mobile / 2 md / 4 lg+` to the presets list with its Base/Md/Lg mapping.
- Add a note that **Reset columns** clears applied widths so columns revert to default.

The developer guide already references the preset files and regression checks; no structural change needed beyond confirming the mapping helper description still applies.

## Testing And Verification

Source-level regression checks must cover:

- The new fourth preset value and its `widths` map including `lg: 3`.
- The `widths`-based mapping helper building classes for declared breakpoints and clearing undeclared ones.
- `getColumnsLayoutResetAttributeUpdates()` clearing all `WIDTH_BREAKPOINT_KEYS`.
- The reset button label and success/warning copy in the UI component.

Manual editor QA should verify:

- Applying the new `1 mobile / 2 md / 4 lg+` preset sets Base 12, Md 6, Lg 3.
- Applying existing presets still produces identical output.
- Reset clears all width attributes and the parent `is-style-bootstrap` class is removed.
- Reset with no child columns shows the warning.
- Reset is idempotent when no widths were applied.

Required final verification:

- `npm run regression:gate`

## Acceptance Criteria

- The preset data model uses a per-preset `widths` object and derives the clear list automatically.
- The existing three presets produce identical attribute output to before.
- A fourth preset `1 mobile / 2 md / 4 lg+` exists and maps Base 12, Md 6, Lg 3, clearing sm/xl/xxl.
- A **Reset columns** button clears all child width attributes and reverts columns to default.
- Reset shows a success notice or the no-child warning.
- Admin help text explains reset behavior.
- No new frontend layout classes are introduced.
- Documentation reflects the new preset and reset behavior.
- The implementation passes the project regression gate.
