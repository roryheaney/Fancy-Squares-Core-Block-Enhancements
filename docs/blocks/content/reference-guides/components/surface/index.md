---
title: "Surface"
slug: "surface-2"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/surface/"
generatedAt: 2025-12-30T18:16:58.095Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`Surface` is a core component that renders a primary background color.

## [Usage](#usage)

In the example below, notice how the `Surface` renders in white (or dark gray if in dark mode).

```jsx
import {
    __experimentalSurface as Surface,
    __experimentalText as Text,
} from '@wordpress/components';

function Example() {
    return (
        <Surface>
            <Text>Code is Poetry</Text>
        </Surface>
    );
}
```

## [Props](#props)

### [backgroundSize: number](#backgroundsize-number)

*   Required: No
*   Default: `12`

Determines the grid size for “dotted” and “grid” variants.

### [borderBottom: boolean](#borderbottom-boolean)

*   Required: No
*   Default: `false`

Renders a bottom border.

### [borderLeft: boolean](#borderleft-boolean)

*   Required: No
*   Default: `false`

Renders a left border.

### [borderRight: boolean](#borderright-boolean)

*   Required: No
*   Default: `false`

Renders a right border.

### [borderTop: boolean](#bordertop-boolean)

*   Required: No
*   Default: `false`

Renders a top border.

### [variant: string](#variant-string)

*   Required: No
*   Default: `false`
*   Allowed values: `primary`, `secondary`, `tertiary`, `dotted`, `grid`

Modifies the background color of `Surface`.

*   `primary`: Used for almost all cases.
*   `secondary`: Used as a secondary background for inner `Surface` components.
*   `tertiary`: Used as the app/site wide background. Visible in **dark mode** only. Use case is rare.
*   `grid`: Used to show a grid.
*   `dotted`: Used to show a dots grid.
