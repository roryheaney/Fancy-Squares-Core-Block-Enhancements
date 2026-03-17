---
title: "@wordpress/global-styles-ui"
slug: "packages-global-styles-ui"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-global-styles-ui/"
generatedAt: 2025-12-30T18:18:13.335Z
---

UI components for managing WordPress Global Styles.

## [Installation](#installation)

Install the module:

```bash
npm install @wordpress/global-styles-ui --save
```

## [Usage](#usage)

```js
import { GlobalStylesUI } from '@wordpress/global-styles-ui';

function MyComponent() {
    return (
        <GlobalStylesUI
            value={ userStyles }
            baseValue={ themeStyles }
            onChange={ handleChange }
        />
    );
}
```

## [API](#api)

### [GlobalStylesUI](#globalstylesui)

Main component for the Global Styles editor interface.

**Props:**

*   `value` (GlobalStylesConfig): User’s custom global styles
*   `baseValue` (GlobalStylesConfig): Theme’s default global styles
*   `onChange` (Function): Callback when styles change
*   `path` (string, optional): Current navigation path
*   `onPathChange` (Function, optional): Callback when path changes
*   `fontLibraryEnabled` (boolean, optional): Enable font library features
*   `serverCSS` (array, optional): Server CSS styles
*   `serverSettings` (object, optional): Server settings

## [Contributing](#contributing)

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for details.
