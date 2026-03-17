---
title: "PluginMoreMenuItem"
slug: "plugin-more-menu-item"
source: "https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-more-menu-item/"
generatedAt: 2025-12-30T18:18:54.713Z
---

This slot will add a new item to the More Tools & Options section.

## [Example](#example)

```js
import { registerPlugin } from '@wordpress/plugins';
import { PluginMoreMenuItem } from '@wordpress/editor';
import { image } from '@wordpress/icons';

const MyButtonMoreMenuItemTest = () => (
    <PluginMoreMenuItem
        icon={ image }
        onClick={ () => {
            alert( 'Button Clicked' );
        } }
    >
        More Menu Item
    </PluginMoreMenuItem>
);

registerPlugin( 'more-menu-item-test', { render: MyButtonMoreMenuItemTest } );
```

## [Location](#location)

![Location](https://i0.wp.com/raw.githubusercontent.com/WordPress/gutenberg/HEAD/docs/assets/plugin-more-menu-item.png?ssl=1)
