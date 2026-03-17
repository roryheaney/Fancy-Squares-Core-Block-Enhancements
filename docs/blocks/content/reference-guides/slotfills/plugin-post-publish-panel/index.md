---
title: "PluginPostPublishPanel"
slug: "plugin-post-publish-panel"
source: "https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-post-publish-panel/"
generatedAt: 2025-12-30T18:18:55.612Z
---

This slot allows for injecting items into the bottom of the post-publish panel that appears after a post is published.

## [Example](#example)

```js
import { registerPlugin } from '@wordpress/plugins';
import { PluginPostPublishPanel } from '@wordpress/editor';

const PluginPostPublishPanelTest = () => (
    <PluginPostPublishPanel>
        <p>Post Publish Panel</p>
    </PluginPostPublishPanel>
);

registerPlugin( 'post-publish-panel-test', {
    render: PluginPostPublishPanelTest,
} );
```

## [Location](#location)

![post publish panel](https://i0.wp.com/raw.githubusercontent.com/WordPress/gutenberg/HEAD/docs/assets/plugin-post-publish-panel.png?ssl=1)
