# Class/Token Pipeline

How framework tokens flow from theme.json through generation scripts into editor controls and CSS output. This is the backbone of the token-driven class system.

## Token generation flow

**Source resolution** (in `scripts/generate-style-tokens.mjs`):
```
--theme-json-path (CLI arg) → FS_THEME_JSON_PATH (env) → local plugin theme.json → data/style-tokens.default.json
```

**Generated outputs** (run via `npm run tokens:site` or as part of `npm run build`):
1. `src/config/generated/framework-tokens.js` — JS export of `{ frameworkBreakpointKeys, frameworkTokens: { gridBreakpoints, spacing... } }`. Consumed by `src/config/breakpoints.js`.
2. `src/styles/generated/_framework-tokens.scss` — SCSS variables for the same tokens. Consumed by SCSS entry points.
3. `data/bootstrap-classes/generated-spacing-options.js` — spacing option arrays (GENERATED, excluded from Serena).
4. `data/bootstrap-classes/index.js` — aggregated class option arrays (display, margin, padding, position, zindex, etc.).

**Rule**: UI options must stay aligned with generated artifacts. Never hardcode extra options in controls. If a token is missing, regenerate via `npm run tokens:site`.

## Breakpoint system (`src/config/breakpoints.js`)

Breakpoint keys are **derived from generated tokens**, not hardcoded:
- Merges `frameworkBreakpointKeys` + `Object.keys(frameworkTokens.gridBreakpoints)`.
- Orders against `DEFAULT_BREAKPOINT_KEYS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']`.
- Falls back to `DEFAULT_BREAKPOINT_KEYS` if tokens are empty.

**Key exports**:
- `BREAKPOINT_KEYS` — ordered list (e.g. `['sm', 'md', 'lg', 'xl', 'xxl']`).
- `RESPONSIVE_BREAKPOINT_KEYS` — excludes `xs` (smallest is base).
- `SPACING_BREAKPOINT_KEYS` = `['', ...RESPONSIVE_BREAKPOINT_KEYS]` — empty string = base/no suffix.
- `WIDTH_BREAKPOINT_KEYS` — same shape as spacing.

**Attribute suffix convention** (via `getBreakpointAttributeSuffix(key)`):
- Empty key → `'Base'` (e.g. `paddingAllBase`).
- Known legacy key → map lookup: `sm→'Sm'`, `md→'Md'`, `lg→'Lg'`, `xl→'Xl'`, `xxl→'XXl'`.
- Unknown key → `toPascalCase(key)`.

## Side-type constants (`src/config/constants.js`)

Three arrays define spacing sides. Each entry: `{ key, prefix, sides }`.

**PADDING_SIDE_TYPES** (7 entries):
- `paddingAll` → prefix `p`
- `paddingHorizontal` → prefixes `['ps', 'pe']` (logical: start/end)
- `paddingVertical` → prefixes `['pt', 'pb']`
- `paddingTop/Right/Bottom/Left` → `pt`/`pe`/`pb`/`ps`

**MARGIN_SIDE_TYPES** — same structure, prefixes `m`/`ms`/`me`/`mt`/`mb`.

**NEGATIVE_MARGIN_SIDE_TYPES** — same structure, but output uses `n` prefix encoding.

**Note**: This uses Bootstrap 5 logical properties (`ps`/`pe` = padding-start/padding-end), NOT physical `pl`/`pr`.

## generateClassName() algorithm (`src/utils/helpers.js`)

Produces a space-separated class string. Emission order:
1. **Constrain** → `wp-block-columns--constrained` (if `config.hasConstrainToggle && isConstrained`).
2. **Class options** → each `classType` in `config.classOptions`, reads `${classType}Classes` array, flattens.
3. **Dropdown** → single value if not `'none'`/`''`.
4. **Width** → per breakpoint, value if not `'auto'`/`''`.
5. **Padding** → per side type × breakpoint. Prefix from `PADDING_SIDE_TYPES`. Format: `${prefix}${breakpointSuffix}-${value}` (e.g. `p-3`, `pt-md-4`). Array prefixes emit multiple tokens.
6. **Margin** → same pattern with `MARGIN_SIDE_TYPES`.
7. **Negative margin** → same pattern, but value goes through `getNegativeSpacingSlug()` and emits `${prefix}${suffix}-n${slug}` (e.g. `mt-n3`).

**`getNegativeSpacingSlug(value)`**: strips leading `-` or `n` prefix from value, returns raw slug. Handles `-5` → `5`, `n3` → `3`, `0`/`-0` → `''` (no output).

## Lazy-loaded option maps

**`src/config/class-options-map.js`** — `loadClassOptionsMap()`:
- Dynamic `import('../../data/bootstrap-classes/index.js')`.
- Maps raw module exports to `{ display, margin, padding, position, zindex, blendMode, alignItems, selfAlignment, justifyContent, order, gapSpacing, bleedCoverOptions }` shape, each with `{ options: [] }`.
- Note: 11 of 12 keys read from the dynamically imported module (`optionsModule.*Options`). `bleedCoverOptions` is the exception — it's imported statically from `./framework-option-sets` (which resolves against generated `frameworkOptionSets` with fallback to `data/bootstrap-classes/bleed-cover-options.js`).
- **Breakpoint filtering**: every option array passes through `filterTokenOptions( options, RESPONSIVE_BREAKPOINT_KEYS )` before caching — entries lacking non-empty-string `label`/`value` are dropped, and responsive variants whose suffix isn't in the theme's breakpoints are dropped (silent no-ops prevented). Base tokens and theme-available variants pass through unchanged, order preserved.
- Cached via promise singleton (`classOptionsMapPromise`).

**`src/formats/span-format.js`** — `loadSpanClassOptions()`:
- Same dynamic import pattern + same `filterTokenOptions` filtering.
- Extracts subset: `{ displayOptions, marginOptions, paddingOptions, positionOptions }`.

## Option coverage rule module (`src/config/option-coverage.mjs`)

Pure, zero-import ESM module so both editor bundles and Node scripts (`.mjs`) can use it. **Do not import `src/**/*.js` from Node scripts** — the package has no `"type": "module"`, so Node parses `.js` as CJS; use explicit `.mjs` extensions.

**Exports**:
- `DEFAULT_RESPONSIVE_SUFFIXES = ['sm', 'md', 'lg', 'xl', 'xxl']`
- `getTokenBreakpointSuffix( token, allowedKeys )` — returns the token's breakpoint suffix or `null`. Checks BOTH positions: segment 1 (prefix-style: `d-xl-none`, `p-lg-4`, `order-xl-*`, `d-xxl-table-row`) and the second-to-last segment (property-style: `align-items-xl-start`, `justify-content-md-between`, `align-self-sm-center`). Returns null for base tokens (`d-inline-grid`, `p-3`, `shadow-lg`, `mt-n3`).
- `filterTokenOptions( options, allowedKeys )` — drops entries lacking non-empty-string `label` and `value`; drops responsive variants whose suffix ∉ `allowedKeys`; preserves order. Legacy saved content is safe: `getDisplayValues`/`getValuesFromDisplay` (src/utils/helpers.js) pass values missing from `options` through unchanged.

## Breakpoint-aware coverage audit (`scripts/audit-class-coverage.mjs`)

- Reads `frameworkBreakpointKeys` from `src/config/generated/framework-tokens.js` **as text** (regex + `JSON.parse`); missing/malformed artifact → hard fail `invalid-generated-tokens` with an actionable message (run `npm run tokens:site`).
- Responsive keys = artifact keys minus `xs` (generator never emits xs media queries).
- Token loop: suffix non-null and ∉ theme responsive keys → counted and **skipped** (static superset entries the editor no longer offers for this theme — cannot reach rendered HTML); one summary line printed (`[coverage] Skipped N unavailable-breakpoint token(s) — not exposed for this theme.`). Base tokens and available variants must still have CSS (unchanged hard-fail behavior).
- This is why the audit can pass on a theme with fewer breakpoints than the built-in Bootstrap-style supersets (e.g. this site: xs/sm/md/lg → 265 validated, 66 skipped).

## Span format system (`src/formats/span-format.js`)

RichText inline token editing — lets users apply framework classes to `<span>` elements within paragraph/heading text.

**Key functions**:
- `classifySpanTokens(classAttr, loadedClassOptions)` — parses existing span className, groups tokens by category (display/margin/padding/position/other). Uses option value lists to classify.
- `parseSpanStyleDeclarations(styleAttr)` — extracts `color`, `background-color` from inline styles; preserves unknown declarations as `otherStyleDeclarations`.
- `EditSpan` component — modal UI with token fields per category + color pickers. Palette-first color controls (CSS custom property names) with custom value entry.
- Registered via `registerFormatType` from `@wordpress/rich-text`.

**Invariants** (from AGENTS.md):
- Preserve unknown existing classes and inline style declarations when updating a span.
- Maintain structured selectors for token classes (no regression to raw free-form editing).
- Color controls are palette-first with optional custom value entry.

## Cross-references
- `mem:block-extensions-system` — how `BLOCK_CONFIG` drives attribute generation which this system reverses in `generateClassName`.
- `mem:asset-enqueue-system` — `class-families.json` + `assets-token-detection.php` detect generated tokens in rendered HTML to trigger conditional CSS.
