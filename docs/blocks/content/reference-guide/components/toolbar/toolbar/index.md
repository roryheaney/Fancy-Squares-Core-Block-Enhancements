---
title: "Toolbar"
slug: "toolbar-3"
source: "https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/toolbar/"
generatedAt: 2025-12-30T18:19:12.256Z
---

Toolbar can be used to group related options. To emphasize groups of related icon buttons, a toolbar should share a common container.

![Toolbar component above an image block](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/s_96EC471FE9C9D91A996770229947AAB54A03351BDE98F444FD3C1BF0CED365EA_1541782974545_ButtonGroup.png?ssl=1)

## [Design guidelines](#design-guidelines)

### [Usage](#usage)

### [Best practices](#best-practices)

Toolbars should:

*   **Clearly communicate that clicking or tapping will trigger an action.**
*   **Use established colors appropriately.** For example, only use red for actions that are difficult or impossible to undo.
*   When used with a block, have a consistent location above the block. **Otherwise, have a consistent location in the interface.**

![A toolbar attached to the top left side of a block. (1. Toolbar, 2. Block)](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/s_D8D19E5A314C2D056B8CCC92B2DB5E27164936A0C5ED98A4C2DFDA650BE2A771_1542388042335_toolbar-block.png?ssl=1)

### [States](#states)

#### [Active and available toolbars](#active-and-available-toolbars)

A toolbar’s state makes it clear which icon button is active. Hover and focus states express the available selection options for icon buttons in a toolbar.

![Toolbar component](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/s_96EC471FE9C9D91A996770229947AAB54A03351BDE98F444FD3C1BF0CED365EA_1541784539545_ButtonGroup.png?ssl=1)

#### [Disabled toolbars](#disabled-toolbars)

Toolbars that cannot be selected can either be given a disabled state, or be hidden.

## [Development guidelines](#development-guidelines)

### [Usage](#usage-2)

```jsx
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { formatBold, formatItalic, link } from '@wordpress/icons';

function MyToolbar() {
    return (
        <Toolbar label="Options">
            <ToolbarButton icon={ formatBold } label="Bold" />
            <ToolbarButton icon={ formatItalic } label="Italic" />
            <ToolbarButton icon={ link } label="Link" />
        </Toolbar>
    );
}
```

### [Props](#props)

Toolbar will pass all HTML props to the underlying element. Additionally, you can pass the custom props specified below.

#### [className: string](#classname-string)

Class to set on the container div.

*   Required: No

#### [label: string](#label-string)

An accessible label for the toolbar.

*   Required: Yes

#### [variant: ‘unstyled’ | undefined](#variant-unstyled-undefined)

Specifies the toolbar’s style.

Leave undefined for the default style. Or `'unstyled'` which removes the border from the toolbar, but keeps the default popover style.

*   Required: No
*   Default: `undefined`

#### [orientation: ‘horizontal’ | ‘vertical’](#orientation-horizontal-vertical)

Specifies the toolbar’s orientation.

Leave undefined or ‘horizontal’ for horizontal orientation keyboard interactions, choose ‘vertical’ for the alternative.

*   Required: No
*   Default: `horizontal`

## [Related components](#related-components)

*   Toolbar may contain [ToolbarGroup](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-group/), [ToolbarButton](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-button/) and [ToolbarItem](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-Item/) as children.
