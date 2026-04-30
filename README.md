# Fancy Squares - Core Block Enhancements

Extend core blocks with token-driven classes, responsive width controls, and interactive block behavior.

## Current Version

- `1.1.8`

## Requirements

- WordPress 6.9+
- Node 20.x and npm 10+ for local builds

## Quick Start

1. Use Node 20 (`nvm use` if applicable).
2. Install dependencies: `npm install`
3. Build assets: `npm run build`
4. Activate the plugin.
5. (Optional) Enable custom blocks in **Settings > Fancy Squares Blocks**.
6. In the editor, use the inspector panels on supported blocks.

## Release Artifact

- Build and package each release as a distributable zip:
    - `npm run build`
    - `npm run plugin-zip`
- Source checkouts are for development; production installs should use release zips.

## Key Default Behavior

- Frontend runtime (`build/frontend.js`) is loaded only when required by rendered blocks.
- Frontend style bundle (`build/frontend-styles.css`) is loaded only when required by rendered classes/features.
- Utilities CSS mode now defaults to `Editor + front end` (`both`).
- `npm run regression:gate` enforces first-paint parity and interaction performance guard invariants for interactive blocks.

## Documentation Map

- User usage and block behavior: [docs/plugin/user-guide.md](docs/plugin/user-guide.md)
- Frontend bundles, enqueue triggers, class matrix, and troubleshooting: [docs/plugin/frontend-assets-and-classes.md](docs/plugin/frontend-assets-and-classes.md)
- Block extension architecture and implementation workflows: [docs/plugin/developer-guide.md](docs/plugin/developer-guide.md)
- Build scripts and token source pipeline: [docs/plugin/build-and-tokens.md](docs/plugin/build-and-tokens.md)
- Class-family registry and baseline fixtures: [docs/plugin/class-families.md](docs/plugin/class-families.md)
- Maintenance and regression policy: [docs/plugin/maintenance-regression-policy.md](docs/plugin/maintenance-regression-policy.md)
- Release notes: [docs/plugin/release-notes.md](docs/plugin/release-notes.md)
- Planned simplification of frontend class detection: [docs/plugin/plans/frontend-style-detection-refactor-plan.md](docs/plugin/plans/frontend-style-detection-refactor-plan.md)
- README completeness review: [docs/plugin/readme-completeness-review.md](docs/plugin/readme-completeness-review.md)

## Supported Blocks (Grouped)

- Core extension blocks: `core/heading`, `core/paragraph`, `core/list`, `core/list-item`, `core/buttons`, `core/columns`, `core/column`, `core/cover`, `core/group`
- Core filter-enhanced blocks: `core/video`, `core/button`, `core/image`
- Custom FS blocks: `fs-blocks/*` family (for example accordion, tabs, content showcase, carousel, modal, alert, content wrapper)

For full per-block behavior and control details, use [docs/plugin/user-guide.md](docs/plugin/user-guide.md).

## Quick Examples

### Custom Block Extension Pattern

This is the pattern used in `src/extensions/register-extensions.js`:

```js
import { registerBlockExtension } from '@10up/block-components';
import BlockEdit from '../components/BlockEdit';
import { generateClassName, generateAttributes } from '../utils/helpers';
import { BLOCK_CONFIG } from '../config/blockConfig';

registerBlockExtension( 'core/heading', {
	extensionName: 'custom-heading',
	attributes: generateAttributes( BLOCK_CONFIG[ 'core/heading' ] || {} ),
	Edit: BlockEdit,
	classNameGenerator: ( attrs ) =>
		generateClassName( attrs, 'core/heading', BLOCK_CONFIG ),
} );
```

### `theme.json` Token Source Pattern

Token generation reads spacing/framework values from `theme.json` and then `npm run tokens` builds plugin artifacts:

```json
{
	"version": 3,
	"settings": {
		"spacing": {
			"spacingSizes": [
				{ "slug": "0", "size": "0" },
				{ "slug": "40", "size": "1rem" }
			]
		},
		"custom": {
			"framework": {
				"breakpoints": { "sm": "576px", "md": "768px", "lg": "992px" },
				"containerMaxWidths": { "sm": "540px", "md": "720px", "lg": "960px" }
			}
		}
	}
}
```

For full token-source precedence and consumed fields, use [docs/plugin/build-and-tokens.md](docs/plugin/build-and-tokens.md).

## Release Notes

- Current and historical release notes: [docs/plugin/release-notes.md](docs/plugin/release-notes.md)

## Troubleshooting: Class In Editor, Not On Frontend

1. Confirm whether the class family belongs to `frontend-styles` or `utilities`.
2. Confirm rendered markup includes the expected class token.
3. Confirm Utilities mode is not `off` when using utility-style classes.
4. Confirm your theme outputs `wp_footer()`.

Use the full checklist in [docs/plugin/frontend-assets-and-classes.md](docs/plugin/frontend-assets-and-classes.md#quick-troubleshooting).

## Notes

- `core/button` and `core/image` are enhanced through filters and inspector controls but are not part of the token-based extension list.
- If docs ever conflict with code, trust code and update docs.
