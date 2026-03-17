---
title: "ToolbarItem"
slug: "toolbar-Item"
source: "https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-Item/"
generatedAt: 2025-12-30T18:15:35.375Z
---

A ToolbarItem is a generic headless component that can be used to make any custom component a [Toolbar](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/) item. It should be inside a [Toolbar](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/) or [ToolbarGroup](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-group/) when used to create general interfaces. If you’re using it to add controls to your custom block, you should consider using [BlockControls](https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-in-the-editor/).

## [Usage](#usage)

### [as prop](#as-prop)

You can use the `as` prop with a custom component or any HTML element.

```jsx
import { Toolbar, ToolbarItem, Button } from '@wordpress/components';

function MyToolbar() {
    return (
        <Toolbar label="Options">
            <ToolbarItem as={ Button }>I am a toolbar button</ToolbarItem>
            <ToolbarItem as="button">I am another toolbar button</ToolbarItem>
        </Toolbar>
    );
}
```

### [render prop](#render-prop)

You can pass children as function to get the ToolbarItem props and pass them to another component.

```jsx
import { Toolbar, ToolbarItem, DropdownMenu } from '@wordpress/components';
import { table } from '@wordpress/icons';

function MyToolbar() {
    return (
        <Toolbar label="Options">
            <ToolbarItem>
                { ( toolbarItemHTMLProps ) => (
                    <DropdownMenu
                        icon={ table }
                        toggleProps={ toolbarItemHTMLProps }
                        label={ 'Edit table' }
                        controls={ [] }
                    />
                ) }
            </ToolbarItem>
        </Toolbar>
    );
}
```

### [Inside BlockControls](#inside-blockcontrols)

If you’re working on a custom block and you want to add controls to the block toolbar, you should use [BlockControls](https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-in-the-editor/) instead. Optionally wrapping it with [ToolbarGroup](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-group/).

```jsx
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarItem, Button } from '@wordpress/components';

function Edit() {
    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarItem as={ Button }>I am a toolbar button</ToolbarItem>
            </ToolbarGroup>
        </BlockControls>
    );
}
```

## [Related components](#related-components)

*   ToolbarItem should be used inside [Toolbar](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/) or [ToolbarGroup](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-group/).
*   If you want a simple toolbar button, consider using [ToolbarButton](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-button/) instead.
