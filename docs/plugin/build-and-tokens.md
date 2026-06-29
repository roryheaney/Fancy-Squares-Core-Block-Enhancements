# Build and Tokens

## Main Scripts

- `npm run tokens`: generate token artifacts using source fallback order.
- `npm run tokens:site`: generate tokens from `../../themes/full-site-editing-build/theme.json`.
- `npm run tokens:ci`: site-token generation with CI failure if missing source.
- `npm run build`: run `tokens:site`, compile assets, remove style-entry JS stubs, run class coverage audit.
- `npm run build:ci`: CI-safe build/token pipeline.
- `npm run start`: watch mode (runs `tokens:site` first).
- `npm run prune:style-stubs`: remove `frontend-styles.js` and `utilities.js` build stubs.
- `npm run audit:class-coverage`: fail if selectable/supported classes lack CSS coverage or enqueue-family detection.
- `npm run lint:all`: full lint pass.

## Token Source Order

Token generation resolves `theme.json` from:

1. `--theme-json-path`
2. `FS_THEME_JSON_PATH`
3. local plugin `theme.json`
4. `data/style-tokens.default.json` fallback

## Theme Fields Consumed

- `settings.spacing.spacingSizes`
- `settings.spacing.spacingScale`
- `settings.custom.framework.optionSets`
- `settings.custom.framework.breakpoints`
- `settings.custom.framework.containerMaxWidths`
- `settings.custom.framework.halfGap`
- `settings.custom.framework.containerPaddingX`

## Spacing Rules

- If `spacingSizes` exists and has values, only those slugs are generated.
- If `spacingSizes` is missing/empty, fallback order is:
  - `settings.spacing.spacingScale`
  - `settings.custom.framework.spacingScale` (legacy)
  - `data/style-tokens.default.json`
- Include slug `0` if you need explicit zero utility classes (for example `p-0`, `m-0`).

## Key Files

- Token generator: `scripts/generate-style-tokens.mjs`
- Fallback tokens: `data/style-tokens.default.json`
- Build config: `webpack.config.js`
- Generated artifacts:
  - `src/config/generated/**`
  - `src/styles/generated/**`
  - `data/bootstrap-classes/generated-spacing-options.js`
  - `build/**`
