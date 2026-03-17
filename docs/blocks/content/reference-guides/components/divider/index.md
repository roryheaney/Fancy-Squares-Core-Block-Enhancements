---
title: "Divider"
slug: "divider-2"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/divider/"
generatedAt: 2025-12-30T18:16:19.431Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`Divider` is a layout component that separates groups of related content.

## [Usage](#usage)

```jsx
import {
    __experimentalDivider as Divider,
    __experimentalText as Text,
    __experimentalVStack as VStack,
} from `@wordpress/components`;

function Example() {
    return (
        <VStack spacing={4}>
            <Text>Some text here</Text>
            <Divider />
            <Text>Some more text here</Text>
        </VStack>
    );
}
```

## [Props](#props)

### [margin: number](#margin-number)

Adjusts all margins on the inline dimension.

*   Required: No

### [marginEnd: number](#marginend-number)

Adjusts the inline-end margin.

*   Required: No

### [marginStart: number](#marginstart-number)

Adjusts the inline-start margin.

*   Required: No

### [orientation: horizontal | vertical](#orientation-horizontal-vertical)

Divider’s orientation. When using inside a flex container, you may need to make sure the divider is `stretch` aligned in order for it to be visible.

*   Required: No
*   Default: `horizontal`

### [Inherited props](#inherited-props)

`Divider` also inherits all of the [`Separator` props](https://ariakit.org/reference/separator#optional-props).
