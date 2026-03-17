---
title: "ToolbarButton"
slug: "toolbar-button"
source: "https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-button/"
generatedAt: 2025-12-30T18:15:33.705Z
---

ToolbarButton can be used to add actions to a toolbar, usually inside a [Toolbar](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/) or [ToolbarGroup](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-group/) when used to create general interfaces. If you’re using it to add controls to your custom block, you should consider using [BlockControls](https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-in-the-editor/).

It has similar features to the [Button](https://developer.wordpress.org/block-editor/reference-guide/components/button/) component. Using `ToolbarButton` will ensure the correct styling for a button in a toolbar, and also that keyboard interactions in a toolbar are consistent with the [WAI-ARIA toolbar pattern](https://www.w3.org/TR/wai-aria-practices/#toolbar).

## [Usage](#usage)

To create general interfaces, you’ll want to render ToolbarButton in a [Toolbar](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/) component.

```jsx
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { pencil } from '@wordpress/icons';

function MyToolbar() {
    return (
        <Toolbar label="Options">
            <ToolbarButton
                icon={ pencil }
                label="Edit"
                onClick={ () => alert( 'Editing' ) }
            />
        </Toolbar>
    );
}
```

### [Inside BlockControls](#inside-blockcontrols)

If you’re working on a custom block and you want to add controls to the block toolbar, you should use [BlockControls](https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-in-the-editor/) instead. Optionally wrapping it with [ToolbarGroup](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-group/).

```jsx
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { pencil } from '@wordpress/icons';

function Edit() {
    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    icon={ pencil }
                    label="Edit"
                    onClick={ () => alert( 'Editing' ) }
                />
            </ToolbarGroup>
        </BlockControls>
    );
}
```

## [Props](#props)

This component accepts [the same API of the Button](https://developer.wordpress.org/block-editor/reference-guide/components/button/#props) component in addition to:

#### [containerClassName: string](#containerclassname-string)

An optional additional class name to apply to the button container.

*   Required: No

#### [subscript: string](#subscript-string)

An optional subscript for the button.

*   Required: No

## [Related components](#related-components)

*   If you wish to implement a control to select options grouped as icon buttons you can use the [Toolbar](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/) component, which already handles this strategy.
*   The ToolbarButton may be used with other elements such as [Dropdown](https://developer.wordpress.org/block-editor/reference-guide/components/dropdown/) to display options in a popover.
