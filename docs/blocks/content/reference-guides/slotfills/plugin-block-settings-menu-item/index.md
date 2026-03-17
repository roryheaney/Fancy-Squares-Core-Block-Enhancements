---
title: "PluginBlockSettingsMenuItem"
slug: "plugin-block-settings-menu-item"
source: "https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-block-settings-menu-item/"
generatedAt: 2025-12-30T18:18:53.044Z
---

This slot allows for adding a new item into the More Options area.  
This will either appear in the controls for each block or at the Top Toolbar depending on the users setting.

## [Example](#example)

```js
import { registerPlugin } from '@wordpress/plugins';
import { PluginBlockSettingsMenuItem } from '@wordpress/editor';

const PluginBlockSettingsMenuGroupTest = () => (
    <PluginBlockSettingsMenuItem
        allowedBlocks={ [ 'core/paragraph' ] }
        icon="smiley"
        label="Menu item text"
        onClick={ () => {
            alert( 'clicked' );
        } }
    />
);

registerPlugin( 'block-settings-menu-group-test', {
    render: PluginBlockSettingsMenuGroupTest,
} );
```

## [Location](#location)

![Location](https://i0.wp.com/raw.githubusercontent.com/WordPress/gutenberg/HEAD/docs/assets/plugin-block-settings-menu-item-screenshot.png?ssl=1 "PluginBlockSettingsMenuItem Location")
