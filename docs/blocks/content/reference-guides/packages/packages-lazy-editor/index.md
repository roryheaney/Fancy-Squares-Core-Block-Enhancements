---
title: "@wordpress/lazy-editor"
slug: "packages-lazy-editor"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-lazy-editor/"
generatedAt: 2025-12-30T18:18:23.797Z
---

Lazy-loading editor component with automatic asset and settings management.

## [Overview](#overview)

This package provides a single `<Editor>` component that handles all the complexity of loading and initializing the WordPress block editor. It automatically:

*   **Loads editor assets** – Fetches and injects scripts and styles with proper dependency resolution
*   **Loads editor settings** – Retrieves editor configuration from the REST API
*   **Resolves global styles** – Applies theme.json styles based on the current template
*   **Manages template contexts** – Automatically determines the correct template for the post being edited
*   **Shows loading states** – Displays a spinner while assets and settings are being loaded

## [Installation](#installation)

Install the module:

```bash
npm install @wordpress/lazy-editor --save
```

## [Usage](#usage)

### [Basic Usage](#basic-usage)

```tsx
import { Editor } from '@wordpress/lazy-editor';

function App() {
    return <Editor postType="page" postId="123" />;
}
```

That’s it! The component handles everything internally:  
1\. Resolves the template ID from the post type and ID  
2\. Resolves the styles ID from the template  
3\. Loads editor settings from `/wp-block-editor/v1/settings`  
4\. Loads editor assets from `/wp-block-editor/v1/assets`  
5\. Injects scripts and styles into the DOM  
6\. Renders the editor when ready

### [With Different Post Types](#with-different-post-types)

```tsx
// Edit a post
<Editor postType="post" postId="42" />

// Edit a page
<Editor postType="page" postId="123" />

// Edit a template
<Editor postType="wp_template" postId="index" />

// Edit a custom post type
<Editor postType="product" postId="789" />
```

## [Contributing](#contributing)

See [CONTRIBUTING.md](../../CONTRIBUTING.md).

## [License](#license)

GPL-2.0-or-later
