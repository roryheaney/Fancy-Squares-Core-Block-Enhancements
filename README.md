# Fancy Squares - Core Block Enhancements

Extend core blocks with token-driven classes, responsive width controls, and interactive block behavior.

## Current Version

-   `1.3.0`

## Requirements

-   WordPress 6.9+
-   Node 20.x and npm 10+ for local builds

## Quick Start

1. Use Node 20 (`nvm use` if applicable).
2. Install dependencies: `npm install`
3. Build assets: `npm run build`
4. Activate the plugin.
5. (Optional) Enable custom blocks in **Settings > Fancy Squares Blocks**.
6. In the editor, use the inspector panels on supported blocks.

## Release Artifact

-   Build and package each release as a distributable zip:
    -   `npm run build`
    -   `npm run plugin-zip`
-   Source checkouts are for development; production installs should use release zips.

## Key Default Behavior

-   Frontend runtime (`build/frontend.js`) is loaded only when required by rendered blocks.
-   Frontend style bundle (`build/frontend-styles.css`) is loaded only when required by rendered classes/features.
-   Frontend asset handles are registered on `init` so render-time conditional enqueues work before `wp_head()` in block themes.
-   Native Cover background videos automatically receive `tabindex="-1"`, `aria-hidden="true"`, and a keyboard-accessible Pause video / Play video control on the frontend. Pausing also prevents deferred autoplay for lazy-loaded videos. Image backgrounds, nested content videos, and iframe embeds are unchanged.
-   **Support reduced motion** is enabled by default for each native video Cover in the editor's **Cover Settings** panel, directly below **Lazy Load Video**. Visitors who prefer reduced motion see the existing core poster without autoplay and can explicitly choose Play video. Disable the toggle for an individual Cover to restore its previous autoplay behavior without removing pause/play controls. See [Cover video accessibility](docs/plugin/user-guide.md#cover-video-accessibility) for details and rollback steps.
-   Carousels automatically respect reduced motion: configured autoplay starts paused, slide transitions are instant, and a Play/Pause control is available even if normally hidden. Explicit Play starts the configured autoplay; switching back to normal motion does not automatically resume it. No new carousel setting is required. See [Carousel reduced motion](docs/plugin/user-guide.md#carousel-reduced-motion).
-   Accordions automatically respect reduced motion: panels open and close without height animation or the transition fallback delay, preserving keyboard behavior and show/hide events. Normal-motion visitors retain the existing animation. See [Accordion reduced motion](docs/plugin/user-guide.md#accordion-reduced-motion).
-   Utilities CSS mode now defaults to `Editor + front end` (`both`).
-   `npm run regression:gate` enforces first-paint parity and interaction performance guard invariants for interactive blocks.

## Responsive Utility Coverage (Theme Breakpoints)

Responsive utility classes (e.g. `d-lg-none`, `align-items-md-center`, `pt-lg-4`)
are only offered in the editor and only compiled into CSS for the breakpoints
your theme defines in `settings.custom.framework.breakpoints`. The plugin
derives breakpoint keys from generated tokens (`npm run tokens:site`) and
validates option entries at load and during `npm run build`
(`audit:class-coverage`).

**Verified behavior:** every class the editor offers has compiled CSS for the
active theme; classes outside the theme's breakpoints are not offered. Saved
content that already uses unavailable classes (e.g. `d-xl-none`) is preserved —
the class stays in the markup and re-renders untouched, but has no CSS until
the breakpoint is enabled.

### Preventing configuration errors

-   After changing `theme.json` framework breakpoints or spacing, always run
    `npm run tokens:site && npm run build`. Stale generated artifacts are the
    most common cause of "missing classes".
-   Do not hardcode extra options into `data/bootstrap-classes/*.js` or controls;
    add breakpoints in `theme.json` instead and regenerate.
-   Keep `build/` present and current. If the plugin falls back to registering
    blocks from `src/`, raw ES modules are served and the editor breaks with
    `Uncaught SyntaxError: import declarations may only appear at top level`.
-   If `npm run build` fails with `invalid-generated-tokens`, the theme's
    breakpoints are malformed or tokens were not regenerated — use an object of
    `key: "CSS length"` (e.g. `"xl": "1280px"`) — then rebuild.

### Enabling xl / xxl (or custom) breakpoints

1. Edit your theme's `theme.json`:

    ```json
    "custom": {
      "framework": {
        "breakpoints": {
          "xs": "0", "sm": "640px", "md": "768px", "lg": "1024px",
          "xl": "1280px", "xxl": "1536px"
        },
        "containerMaxWidths": {
          "sm": "42rem", "md": "56rem", "lg": "80rem",
          "xl": "72rem", "xxl": "84rem"
        }
      }
    }
    ```

2. Run `npm run tokens:site && npm run build`.
3. Confirm `audit:class-coverage` prints `[coverage] OK` and the skipped-token
   count drops to 0.
4. Reload the editor; xl/xxl options now appear and emit CSS.

### Troubleshooting

-   **xl/xxl options missing but wanted** → the theme does not define those
    breakpoints; follow "Enabling xl / xxl" above.
-   **Class in editor, no effect on frontend** → confirm the selector exists in
    `build/utilities.css`; if missing, regenerate tokens and rebuild.
-   **Legacy `xl`/`xxl` class in existing markup** → it is preserved but has no
    CSS. Either enable the breakpoint (above) or re-select an available class.
-   **Audit fails with `missing-css-emitter`** → a data file offers a token the
    theme can't cover; regenerate tokens and verify the token's breakpoint
    position (prefix-style tokens place it after the prefix, property-style
    tokens place it before the final value segment).

## Documentation Map

-   User usage and block behavior: [docs/plugin/user-guide.md](docs/plugin/user-guide.md)
-   Frontend bundles, enqueue triggers, class matrix, and troubleshooting: [docs/plugin/frontend-assets-and-classes.md](docs/plugin/frontend-assets-and-classes.md)
-   Block extension architecture and implementation workflows: [docs/plugin/developer-guide.md](docs/plugin/developer-guide.md)
-   Build scripts and token source pipeline: [docs/plugin/build-and-tokens.md](docs/plugin/build-and-tokens.md)
-   Class-family registry and baseline fixtures: [docs/plugin/class-families.md](docs/plugin/class-families.md)
-   Responsive utility coverage and breakpoint configuration: [Responsive Utility Coverage](#responsive-utility-coverage-theme-breakpoints)
-   Maintenance and regression policy: [docs/plugin/maintenance-regression-policy.md](docs/plugin/maintenance-regression-policy.md)
-   Release notes: [docs/plugin/release-notes.md](docs/plugin/release-notes.md)

## Supported Blocks (Grouped)

-   Core extension blocks: `core/heading`, `core/paragraph`, `core/list`, `core/list-item`, `core/buttons`, `core/columns`, `core/column`, `core/cover`, `core/group`
-   Core filter-enhanced blocks: `core/video`, `core/button`, `core/image`
-   Custom FS blocks: `fs-blocks/*` family (for example accordion, tabs, content showcase, carousel, modal, alert, content wrapper)

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
				"containerMaxWidths": {
					"sm": "540px",
					"md": "720px",
					"lg": "960px"
				}
			}
		}
	}
}
```

For full token-source precedence and consumed fields, use [docs/plugin/build-and-tokens.md](docs/plugin/build-and-tokens.md).

## Release Notes

-   Current and historical release notes: [docs/plugin/release-notes.md](docs/plugin/release-notes.md)

## Troubleshooting: Class In Editor, Not On Frontend

1. Confirm whether the class family belongs to `frontend-styles` or `utilities`.
2. Confirm rendered markup includes the expected class token.
3. Confirm Utilities mode is not `off` when using utility-style classes.
4. Confirm frontend asset handles register on `init`, not `wp_enqueue_scripts`.
5. Confirm your theme outputs `wp_footer()`.

Use the full checklist in [docs/plugin/frontend-assets-and-classes.md](docs/plugin/frontend-assets-and-classes.md#quick-troubleshooting).

## Notes

-   `core/button` and `core/image` are enhanced through filters and inspector controls but are not part of the token-based extension list.
-   If docs ever conflict with code, trust code and update docs.
