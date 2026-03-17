---
title: "HStack"
slug: "h-stack"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/h-stack/"
generatedAt: 2025-12-30T18:16:32.777Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`HStack` (Horizontal Stack) arranges child elements in a horizontal line.

## [Usage](#usage)

`HStack` can render anything inside.

```jsx
import {
    __experimentalHStack as HStack,
    __experimentalText as Text,
} from '@wordpress/components';

function Example() {
    return (
        <HStack>
            <Text>Code</Text>
            <Text>is</Text>
            <Text>Poetry</Text>
        </HStack>
    );
}
```

## [Props](#props)

### [alignment](#alignment)

**Type**: `HStackAlignment` | `CSS[ 'alignItems' ]`

Determines how the child elements are aligned.

*   `top`: Aligns content to the top.
*   `topLeft`: Aligns content to the top/left.
*   `topRight`: Aligns content to the top/right.
*   `left`: Aligns content to the left.
*   `center`: Aligns content to the center.
*   `right`: Aligns content to the right.
*   `bottom`: Aligns content to the bottom.
*   `bottomLeft`: Aligns content to the bottom/left.
*   `bottomRight`: Aligns content to the bottom/right.
*   `edge`: Justifies content to be evenly spread out up to the main axis edges of the container.
*   `stretch`: Stretches content to the cross axis edges of the container.

### [direction](#direction)

**Type**: `FlexDirection`

The direction flow of the children content can be adjusted with `direction`. `column` will align children vertically and `row` will align children horizontally.

### [expanded](#expanded)

**Type**: `boolean`

Expands to the maximum available width (if horizontal) or height (if vertical).

### [justify](#justify)

**Type**: `CSS['justifyContent']`

Horizontally aligns content if the `direction` is `row`, or vertically aligns content if the `direction` is `column`.  
In the example below, `flex-start` will align the children content to the left.

### [spacing](#spacing)

**Type**: `CSS['width']`

The amount of space between each child element. Spacing in between each child can be adjusted by using `spacing`.  
The value of `spacing` works as a multiplier to the library’s grid system (base of `4px`).

### [wrap](#wrap)

**Type**: `boolean`

Determines if children should wrap.

## [Spacer](#spacer)

When a `Spacer` is used within an `HStack`, the `Spacer` adaptively expands to take up the remaining space.

```jsx
import {
    __experimentalHStack as HStack,
    __experimentalSpacer as Spacer,
    __experimentalText as Text,
} from '@wordpress/components';

function Example() {
    return (
        <HStack>
            <Text>Code</Text>
            <Spacer>
                <Text>is</Text>
            </Spacer>
            <Text>Poetry</Text>
        </HStack>
    );
}
```

`Spacer` also be used in-between items to push them apart.

```jsx
import {
    __experimentalHStack as HStack,
    __experimentalSpacer as Spacer,
    __experimentalText as Text,
} from '@wordpress/components';

function Example() {
    return (
        <HStack>
            <Text>Code</Text>
            <Spacer />
            <Text>is</Text>
            <Text>Poetry</Text>
        </HStack>
    );
}
```
