---
title: "PluginPrePublishPanel"
slug: "plugin-pre-publish-panel"
source: "https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-pre-publish-panel/"
generatedAt: 2025-12-30T18:18:56.990Z
---

This slot allows for injecting items into the bottom of the pre-publish panel that appears to confirm publishing after the user clicks “Publish”.

## [Example](#example)

```js
import { registerPlugin } from '@wordpress/plugins';
import { PluginPrePublishPanel } from '@wordpress/editor';

const PluginPrePublishPanelTest = () => (
    <PluginPrePublishPanel>
        <p>Pre Publish Panel</p>
    </PluginPrePublishPanel>
);

registerPlugin( 'pre-publish-panel-test', {
    render: PluginPrePublishPanelTest,
} );
```

## [Location](#location)

![Prepublish panel](https://i0.wp.com/raw.githubusercontent.com/WordPress/gutenberg/HEAD/docs/assets/plugin-pre-publish-panel.png?ssl=1)
