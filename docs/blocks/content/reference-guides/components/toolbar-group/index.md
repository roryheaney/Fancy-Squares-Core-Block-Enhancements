---
title: "ToolbarGroup"
slug: "toolbar-group-2"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/toolbar-group/"
generatedAt: 2025-12-30T18:17:03.408Z
---

A ToolbarGroup can be used to create subgroups of controls inside a [Toolbar](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/toolbar/).

## [Usage](#usage)

```jsx
import { Toolbar, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { paragraph, formatBold, formatItalic, link } from '@wordpress/icons';

function MyToolbar() {
    return (
        <Toolbar label="Options">
            <ToolbarGroup>
                <ToolbarButton icon={ paragraph } label="Paragraph" />
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarButton icon={ formatBold } label="Bold" />
                <ToolbarButton icon={ formatItalic } label="Italic" />
                <ToolbarButton icon={ link } label="Link" />
            </ToolbarGroup>
        </Toolbar>
    );
}
```

### [Props](#props)

ToolbarGroup will pass all HTML props to the underlying element.

## [Related components](#related-components)

*   ToolbarGroup may contain [ToolbarButton](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/toolbar-button/) and [ToolbarItem](https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/toolbar-item/) as children.
