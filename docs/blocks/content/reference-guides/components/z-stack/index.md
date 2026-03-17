---
title: "ZStack"
slug: "z-stack"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/z-stack/"
generatedAt: 2025-12-30T18:17:16.325Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

## [Usage](#usage)

`ZStack` allows you to stack things along the Z-axis.

```jsx
import { __experimentalZStack as ZStack } from '@wordpress/components';

function Example() {
    return (
        <ZStack offset={ 20 } isLayered>
            <ExampleImage />
            <ExampleImage />
            <ExampleImage />
        </ZStack>
    );
}
```

## [Props](#props)

### [isLayered: boolean](#islayered-boolean)

Layers children elements on top of each other (first: highest z-index, last: lowest z-index).

*   Required: No
*   Default: `true`

### [isReversed: boolean](#isreversed-boolean)

Reverse the layer ordering (first: lowest z-index, last: highest z-index).

*   Required: No
*   Default: `false`

### [offset: number](#offset-number)

The amount of space between each child element. Its value is automatically inverted (i.e. from positive to negative, and viceversa) when switching from LTR to RTL.

*   Required: No
*   Default: `0`

### [children: ReactNode](#children-reactnode)

The children to stack.

*   Required: Yes
