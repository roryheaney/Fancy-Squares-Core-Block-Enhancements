---
title: "@wordpress/asset-loader"
slug: "packages-asset-loader"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-asset-loader/"
generatedAt: 2025-12-30T18:17:41.574Z
---

Utility to dynamically load WordPress scripts and styles with dependency resolution.

## [Overview](#overview)

This package provides a function to dynamically inject WordPress assets (scripts and styles) into the DOM with:

*   **Dependency resolution** – Respects WordPress dependency graphs via topological sort
*   **Parallel loading** – External scripts load in parallel for performance
*   **Sequential execution** – Inline scripts execute in the correct order
*   **Inline scripts/styles** – Supports before/after inline content per handle
*   **WordPress compatibility** – Mimics `wp_enqueue_script`/`wp_enqueue_style` behavior

## [Installation](#installation)

Install the module:

```bash
npm install @wordpress/asset-loader --save
```

## [Usage](#usage)

### [Basic Usage](#basic-usage)

```typescript
import loadAssets from '@wordpress/asset-loader';

const assets = {
    scripts: {
        'wp-blocks': {
            src: 'https://example.com/wp-includes/js/dist/blocks.min.js',
            deps: [ 'wp-element', 'wp-data' ],
            version: '1.0.0',
            in_footer: true,
        },
    },
    styles: {
        'wp-block-library': {
            src: 'https://example.com/wp-includes/css/dist/block-library/style.min.css',
            deps: [],
            version: '1.0.0',
            media: 'all',
        },
    },
    inline_scripts: {
        before: {},
        after: {
            'wp-blocks': 'wp.blocks.registerBlockType(...)',
        },
    },
    inline_styles: {
        before: {},
        after: {},
    },
};

await loadAssets(
    assets.scripts,
    assets.inline_scripts,
    assets.styles,
    assets.inline_styles
);
```

### [With @wordpress/core-data](#with-wordpress-core-data)

```typescript
import { resolveSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { unlock } from './lock-unlock';
import loadAssets from '@wordpress/asset-loader';

async function loadEditorAssets() {
    // Get assets from the REST API endpoint
    const assets = await unlock(
        resolveSelect( coreDataStore )
    ).getEditorAssets();

    // Load them into the DOM
    await loadAssets(
        assets.scripts || {},
        assets.inline_scripts || { before: {}, after: {} },
        assets.styles || {},
        assets.inline_styles || { before: {}, after: {} }
    );
}
```

## [API](#api)

### [loadAssets(scriptsData, inlineScripts, stylesData, inlineStyles)](#loadassetsscriptsdata-inlinescripts-stylesdata-inlinestyles)

Loads WordPress assets with dependency resolution.

#### [Parameters](#parameters)

*   **scriptsData** `Record<string, Script>` – Map of script handles to script data
*   **inlineScripts** `Record<'before' | 'after', Record<string, string | string[]>>` – Inline scripts
*   **stylesData** `Record<string, Style>` – Map of style handles to style data
*   **inlineStyles** `Record<'before' | 'after', Record<string, string | string[]>>` – Inline styles

#### [Returns](#returns)

`Promise<void>` – Resolves when all assets are loaded and executed

#### [Types](#types)

```typescript
type Script = {
    src: string;
    deps?: string[];
    version?: string;
    in_footer?: boolean;
};

type Style = {
    src: string;
    deps?: string[];
    version?: string;
    media?: string;
};
```

## [How It Works](#how-it-works)

1.  **Topological Sort** – Orders assets based on dependencies using depth-first search
2.  **Stylesheet Loading** – Loads CSS files in dependency order with inline styles
3.  **Script Loading** – Separates head/body scripts based on `in_footer` flag
4.  **Parallel Execution** – External scripts load in parallel (with `async=false` for order)
5.  **Inline Scripts** – Execute after their corresponding external scripts load

## [Contributing](#contributing)

See [CONTRIBUTING.md](../../CONTRIBUTING.md).

## [License](#license)

GPL-2.0-or-later
