---
title: "Scrollable"
slug: "scrollable"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/scrollable/"
generatedAt: 2025-12-30T18:16:54.118Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`Scrollable` is a layout component that content in a scrollable container.

## [Usage](#usage)

```jsx
import { __experimentalScrollable as Scrollable } from '@wordpress/components';

function Example() {
    return (
        <Scrollable style={ { maxHeight: 200 } }>
            <div style={ { height: 500 } }>...</div>
        </Scrollable>
    );
}
```

## [Props](#props)

### [children: ReactNode](#children-reactnode)

The children elements.

*   Required: Yes

### [scrollDirection: string](#scrolldirection-string)

Renders a scrollbar for a specific axis when content overflows.

*   Required: No
*   Default: `y`
*   Allowed values: `x`, `y`, `auto`

### [smoothScroll: boolean](#smoothscroll-boolean)

Enables (CSS) smooth scrolling.

*   Required: No
*   Default: `false`
