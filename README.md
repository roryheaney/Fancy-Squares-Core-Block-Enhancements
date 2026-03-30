# Fancy Squares - Core Block Enhancements

Extend core blocks with token-driven classes, responsive width controls, and interactive block behavior.

## Current Version

- `1.1.7`

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

## Key Default Behavior

- Frontend runtime (`build/frontend.js`) is loaded only when required by rendered blocks.
- Frontend style bundle (`build/frontend-styles.css`) is loaded only when required by rendered classes/features.
- Utilities CSS mode now defaults to `Editor + front end` (`both`).

## Documentation Map

- User usage and block behavior:
  - [docs/plugin/user-guide.md](docs/plugin/user-guide.md)
- Frontend bundles, enqueue triggers, class matrix, and troubleshooting:
  - [docs/plugin/frontend-assets-and-classes.md](docs/plugin/frontend-assets-and-classes.md)
- Block extension architecture and implementation workflows:
  - [docs/plugin/developer-guide.md](docs/plugin/developer-guide.md)
- Build scripts and token source pipeline:
  - [docs/plugin/build-and-tokens.md](docs/plugin/build-and-tokens.md)
- Planned simplification of frontend class detection:
  - [docs/plugin/plans/frontend-style-detection-refactor-plan.md](docs/plugin/plans/frontend-style-detection-refactor-plan.md)

## Notes

- `core/button` and `core/image` are enhanced through filters and inspector controls but are not part of the token-based extension list.
- If docs ever conflict with code, trust code and update docs.
