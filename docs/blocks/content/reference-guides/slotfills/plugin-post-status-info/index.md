---
title: "PluginPostStatusInfo"
slug: "plugin-post-status-info"
source: "https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-post-status-info/"
generatedAt: 2025-12-30T18:18:56.141Z
---

This slots allows for the insertion of items in the Summary panel of the document sidebar.

## [Example](#example)

```js
import { registerPlugin } from '@wordpress/plugins';
import { PluginPostStatusInfo } from '@wordpress/editor';

const PluginPostStatusInfoTest = () => (
    <PluginPostStatusInfo>
        <p>Post Status Info SlotFill</p>
    </PluginPostStatusInfo>
);

registerPlugin( 'post-status-info-test', { render: PluginPostStatusInfoTest } );
```

## [Location](#location)

![Location in the Summary panel](https://i0.wp.com/raw.githubusercontent.com/WordPress/gutenberg/HEAD/docs/assets/plugin-post-status-info-location.png?ssl=1)
